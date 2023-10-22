import {
	clearAnonymousSessionCookie,
	createAnonymousSessionRecord,
	getAnonymousSessionCookiePayload,
	setAnonymousSessionCookie,
	type AnonymousSessionCookiePayload
} from '$lib/server/cookiesUtils/AnonymousSessionCookieUtils.js';
import {
	clearSurveyCookie,
	getSurveySessionCookiePayload,
	setSurveyCookie,
	type SurveyCookie as SurveyCookiePayload
} from '$lib/server/cookiesUtils/SurveyCookieUtils.js';
import type { AnonymousSession, Prisma, Survey } from '@prisma/client';
import { error, type Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import {
	EMPTY_SURVEY_BLUEPRINT,
	SurveySexOption,
	type SurveyForm,
	SurveyNumYearsExperience,
	SurveyEducation,
	SurveyAgeOption
} from '../../lib/utils/surveyTypes.js';
import { ServerErrorName } from '$lib/utils/appError.js';
import { prisma } from '$lib/server/prisma.js';
import { APP_RED_FLAG } from '$lib/utils/dbEnums.js';

export async function load({ cookies }): Promise<SurveyForm> {
	try {
		const anonymousSessionCookie = await getAnonymousSessionCookiePayload(
			cookies
		);

		let anonymousSession: undefined | AnonymousSession;
		if (!anonymousSessionCookie) {
			anonymousSession = await createAnonymousSessionRecord(prisma);
			setAnonymousSessionCookie(
				{
					id: anonymousSession.id,
					expirationDate: anonymousSession.expirationDate,
					createdAt: anonymousSession.createdAt
				},
				cookies
			);
		} else {
			const _anonymousSession = await prisma.anonymousSession.findUnique({
				where: {
					id: anonymousSessionCookie.id
				}
			});

			if (!_anonymousSession) {
				throw error(
					400,
					ServerErrorName.MISSING_OR_INVALID_ANONYMOUS_SESSION_COOKIE
				);
			}
			anonymousSession = _anonymousSession;
		}

		const surveyCookie = await getSurveySessionCookiePayload(cookies);
		let survey: undefined | Survey;
		if (!surveyCookie) {
			survey = await prisma.survey.create({
				data: {
					data: EMPTY_SURVEY_BLUEPRINT,
					anonymousSessionId: anonymousSession.id
				}
			});

			setSurveyCookie(
				{
					anonymousSessionId: anonymousSession.id,
					createdAt: survey.createdAt,
					id: survey.id
				},
				60 * 60, // 1h
				cookies
			);
		} else {
			const _survey = await prisma.survey.findUnique({
				where: {
					id: surveyCookie.id
				}
			});

			if (!_survey) {
				throw error(400, ServerErrorName.MISSING_OR_INVALID_SURVEY_COOKIE);
			}
			survey = _survey;
		}

		// ! todo - ensure "flags" object isn't empty - otherwise error in flag form
		// ensure this on the backend
		return survey;
	} catch (e) {
		prisma.$disconnect();

		if (e instanceof error) {
			throw e;
		} else {
			throw new Error(e);
		}
	}
}

async function expectAnonymousSessionCookiePayload(
	cookies: Cookies
): Promise<AnonymousSessionCookiePayload> {
	const sessionCookie = await getAnonymousSessionCookiePayload(cookies);
	if (!sessionCookie) {
		clearAnonymousSessionCookie(cookies);
		clearSurveyCookie(cookies);
		throw error(
			403,
			ServerErrorName.MISSING_OR_INVALID_ANONYMOUS_SESSION_COOKIE
		);
	}

	return sessionCookie;
}

const LAST_STEP_INDEX = 5;

async function expectSurveyCookiePayload(
	cookies: Cookies
): Promise<SurveyCookiePayload> {
	const surveyCookie = await getSurveySessionCookiePayload(cookies);

	if (!surveyCookie) {
		clearSurveyCookie(cookies);
		throw error(403, ServerErrorName.MISSING_OR_INVALID_SURVEY_COOKIE);
	}

	return surveyCookie;
}

async function expectSurveyForId(
	id: string
): Promise<Survey & { data: Prisma.JsonObject }> {
	const survey = await prisma.survey.findUnique({
		where: { id }
	});

	if (!survey) {
		throw error(404, 'missing_survey_for_id');
	}

	if (typeof survey.data === 'object' && !Array.isArray(survey.data)) {
		return survey as Survey & { data: Prisma.JsonObject };
	} else {
		throw error(500, ServerErrorName.WRONG_SURVEY_FORMAT);
	}
}

function getSurveyNextStepInfo(
	direction: 'next' | 'back',
	currentStepIndex: number
): { nextStepIndex: number; isFinalStep: boolean } {
	let nextStepIndex = currentStepIndex + (direction === 'next' ? 1 : -1);
	if (nextStepIndex < 0) {
		nextStepIndex = 0;
	} else if (nextStepIndex > LAST_STEP_INDEX) {
		nextStepIndex = LAST_STEP_INDEX;
	}

	return {
		nextStepIndex,
		isFinalStep: nextStepIndex === LAST_STEP_INDEX
	};
}

function getSurveyStateInNextStep(
	survey: {
		isCompleted: boolean;
		currentStep: number;
	},
	direction: 'next' | 'back' = 'next'
): {
	isCompleted: boolean;
	currentStep: number;
} {
	const { nextStepIndex, isFinalStep } = getSurveyNextStepInfo(
		direction,
		survey.currentStep
	);

	return {
		isCompleted: survey.isCompleted || isFinalStep,
		currentStep: isFinalStep ? survey.currentStep : nextStepIndex
	};
}

export const actions = {
	'step-back': async function ({ cookies }): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey, 'back');
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			return await prisma.survey.update({
				where: {
					id: surveyCookie.id
				},
				data: nextSurveyState
			});
		} catch (err) {
			prisma.$disconnect();
			throw err;
		} finally {
			prisma.$disconnect();
		}
	},
	'step-foreward': async function ({ cookies }): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			return await prisma.survey.update({
				where: {
					id: surveyCookie.id
				},
				data: nextSurveyState
			});
		} catch (err) {
			prisma.$disconnect();
			throw err;
		} finally {
			prisma.$disconnect();
		}
	},
	'acknowledge-info': async function ({ cookies }): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			return await prisma.survey.update({
				where: {
					id: surveyCookie.id
				},
				data: nextSurveyState
			});
		} catch (err) {
			prisma.$disconnect();
			throw err;
		} finally {
			prisma.$disconnect();
		}
	},
	'update-red-flags': async function ({
		cookies,
		request
	}): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);
			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}
			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			const rawForm = await request.formData();
			const flagsToBoolean: Record<string, boolean> = {};
			Object.values(APP_RED_FLAG).forEach((flagKey) => {
				const flagValue = z
					.literal('on')
					.safeParse(rawForm.get(flagKey)).success;
				flagsToBoolean[flagKey] = flagValue;
			});

			survey.data['flags'] = flagsToBoolean;

			return await prisma.survey.update({
				where: { id: surveyCookie.id },
				data: {
					data: survey.data,
					...nextSurveyState
				}
			});
		} catch (err) {
			prisma.$disconnect();
			throw err;
		} finally {
			prisma.$disconnect();
		}
	},
	'update-story': async function ({ request, cookies }): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			const formRaw = await request.formData();
			const parsingResult = z
				.object({
					title: z.string().optional(),
					body: z.string().optional()
				})
				.safeParse({
					body: formRaw.get('story'),
					title: formRaw.get('title')
				});

			if (!parsingResult.success) {
				throw error(400, ServerErrorName.BAD_INPUT);
			}

			survey.data['story'] = {
				title: parsingResult.data.title || '',
				body: parsingResult.data.body || ''
			};

			return await prisma.survey.update({
				where: { id: surveyCookie.id },
				data: {
					data: survey.data,
					...nextSurveyState
				}
			});
		} catch (error) {
			prisma.$disconnect();
			throw error;
		} finally {
			prisma.$disconnect();
		}
	},
	'update-survey-office-info': async function ({ request, cookies }) {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			const formRaw = await request.formData();
			const parsingResult = z
				.object({
					officeName: z.string().min(1),
					city: z.string().min(1)
				})
				.safeParse({
					officeName: formRaw.get('office-name'),
					city: formRaw.get('city')
				});
			if (!parsingResult.success) {
				throw error(400, ServerErrorName.BAD_INPUT);
			}
			const { city, officeName } = parsingResult.data;

			survey.data['office'] = {
				officeName,
				city
			};

			return await prisma.survey.update({
				where: { id: surveyCookie.id },
				data: {
					data: survey.data,
					...nextSurveyState
				}
			});
		} catch (err) {
			prisma.$disconnect();
			throw err;
		} finally {
			prisma.$disconnect();
		}
	},
	'update-user-profile': async function ({
		cookies,
		request
	}): Promise<Survey> {
		try {
			const [surveyCookie] = await Promise.all([
				await expectSurveyCookiePayload(cookies),
				await expectAnonymousSessionCookiePayload(cookies)
			]);

			const survey = await expectSurveyForId(surveyCookie.id);
			if (survey.isCompleted) {
				throw error(403, ServerErrorName.SURVEY_IS_COMPLETED);
			}

			const nextSurveyState = getSurveyStateInNextStep(survey);
			if (nextSurveyState.isCompleted) {
				clearSurveyCookie(cookies);
			}

			const form = await request.formData();
			const parsingResult = z
				.object({
					sex: z.nativeEnum(SurveySexOption).nullable(),
					isLicensed: z.boolean(),
					numYearsExperience: z
						.nativeEnum(SurveyNumYearsExperience)
						.nullable(),
					age: z.nativeEnum(SurveyAgeOption).nullable(),
					education: z.nativeEnum(SurveyEducation).nullable()
				})
				.safeParse({
					sex: form.get('sex') || null,
					isLicensed: form.get('is-licensed') === 'on',
					numYearsExperience: form.get('experience') || null,
					age: form.get('age') || null,
					education: form.get('education') || null
				});

			if (!parsingResult.success) {
				throw error(400, ServerErrorName.BAD_INPUT);
			}

			survey.data['profile'] = parsingResult.data;

			return await prisma.survey.update({
				where: { id: surveyCookie.id },
				data: {
					data: survey.data,
					...nextSurveyState
				}
			});
		} catch (error) {
			prisma.$disconnect();
			throw error;
		} finally {
			prisma.$disconnect();
		}
	}
};
