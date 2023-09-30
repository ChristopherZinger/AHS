import { prisma, usePrisma } from '$lib/prisma.js';
import {
	getAnonymousSessionCookiePayload,
	setAnonymousSessionCookie
} from '$lib/server/cookiesUtils/AnonymousSessionCookieUtils.js';
import {
	clearSurveyCookie,
	getSurveySessionCookiePayload,
	setSurveyCookie
} from '$lib/server/cookiesUtils/SurveyCookieUtils.js';
import type { AnonymousSession, Survey } from '@prisma/client';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import {
	EMPTY_SURVEY_BLUEPRINT,
	SurveySexOption,
	type SurveyForm,
	SurveyNumYearsExperience,
	SurveyEducation,
	SurveyAgeOption
} from '../../lib/utils/surveyTypes.js';

async function createAnonymousSessionRecord(): Promise<AnonymousSession> {
	const expDate = new Date();
	expDate.setDate(new Date().getDate() + 30); // 30 days

	return await prisma.anonymousSession.create({
		data: { expirationDate: expDate }
	});
}

export async function load({ cookies }): Promise<{ survey: SurveyForm }> {
	const anonymousSessionCookie = await getAnonymousSessionCookiePayload(
		cookies
	);

	let anonymousSession: undefined | AnonymousSession;
	if (!anonymousSessionCookie) {
		anonymousSession = await createAnonymousSessionRecord();
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
			throw error(404, 'missing_session_for_id');
		}
		anonymousSession = _anonymousSession;
	}

	const surveyCookie = await getSurveySessionCookiePayload(cookies);
	let survey: undefined | Survey;
	if (!surveyCookie) {
		survey = await prisma.survey.create({
			data: {
				data: EMPTY_SURVEY_BLUEPRINT,
				anonymousSession: {
					connect: {
						id: anonymousSession.id
					}
				}
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
			throw error(404, 'missing_survey_for_id');
		}
		survey = _survey;
	}

	prisma.$disconnect();

	// ! todo - ensure "flags" object isn't empty - otherwise error in flag form
	// ensure this on the backend
	return { survey };
}

export const actions = {
	'update-survey-office': async function ({ cookies, request }) {
		const [sessionCookie, surveyCookie, form] = await Promise.all([
			getAnonymousSessionCookiePayload(cookies),
			getSurveySessionCookiePayload(cookies),
			request.formData()
		]);

		if (!sessionCookie) {
			throw error(403, 'unknown_session');
		}

		if (!surveyCookie) {
			throw error(403, 'unknown_survey');
		}

		const shouldGoStepBackParsingResult = z
			.literal('on')
			.safeParse(form.get('should-go-back')).success;

		const rawData = form.get('data');
		const stringifiedData = z.string().min(1).parse(rawData);
		const unsafeData = JSON.parse(stringifiedData);

		const parsingResult = z
			.object({
				office: z
					.object({
						officeName: z.string().min(1),
						city: z.string().min(1)
						// numOfEmployes: z.nativeEnum(OfficeSize)
					})
					.optional(),
				flags: z.record(z.string(), z.boolean()),
				story: z
					.object({
						title: z.string().min(1),
						body: z.string().min(1)
					})
					.optional(),
				profile: z
					.object({
						sex: z.nativeEnum(SurveySexOption).optional(),
						isLicensed: z.boolean().optional(),
						numYearsExperience: z
							.nativeEnum(SurveyNumYearsExperience)
							.optional(),
						age: z.nativeEnum(SurveyAgeOption).optional(),
						education: z.nativeEnum(SurveyEducation).optional()
					})
					.optional(),
				currentStep: z.number().min(0).max(5)
			})
			.safeParse(unsafeData);

		if (!parsingResult.success) {
			console.error(parsingResult.error);
			throw error(400, 'bad_input');
		}

		const { data: safeInput } = parsingResult;

		safeInput.currentStep =
			safeInput.currentStep + (shouldGoStepBackParsingResult ? -1 : 1);
		if (safeInput.currentStep > 4) {
			clearSurveyCookie(cookies);
		}

		let surveyData: any;
		await usePrisma(async (prisma) => {
			const survey = await prisma.survey.findUnique({
				where: {
					id: surveyCookie.id
				}
			});

			if (!survey) {
				throw error(400, 'missin_survey_for_id');
			}

			surveyData = await prisma.survey.update({
				where: {
					id: surveyCookie.id
				},
				data: {
					data: safeInput
				}
			});
		});

		return { data: surveyData };
	}
};