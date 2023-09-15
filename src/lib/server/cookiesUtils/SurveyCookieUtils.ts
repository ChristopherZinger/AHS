import type { Cookies } from '@sveltejs/kit';
import { z, type Schema } from 'zod';
import { expectSurveySessionCookieNameFromEnv } from '../envUtils';
import { getParsedJwtFromCookie } from './cookiesUtils';
import { setCookieWithExpTimeInSec } from '../authCookiesUtils';

type SurveyCookie = {
	id: string;
	anonymousSessionId: string;
	createdAt: Date;
};

const surveyCookieSchema = z.object({
	id: z.string().min(1),
	anonymousSessionId: z.string().min(1),
	createdAt: z.coerce.date()
});

export async function getSurveySessionCookiePayload(
	cookies: Cookies
): Promise<SurveyCookie | null> {
	return await getParsedJwtFromCookie(
		expectSurveySessionCookieNameFromEnv(),
		surveyCookieSchema,
		cookies
	);
}

export function clearSurveyCookie(cookies: Cookies) {
	cookies.set(expectSurveySessionCookieNameFromEnv(), '', {
		path: '/',
		expires: new Date('2000-01-01')
	});
}

export function setSurveyCookie(
	data: SurveyCookie,
	expInSec: number,
	cookies: Cookies
) {
	setCookieWithExpTimeInSec(
		expectSurveySessionCookieNameFromEnv(),
		data,
		expInSec,
		cookies
	);
}
