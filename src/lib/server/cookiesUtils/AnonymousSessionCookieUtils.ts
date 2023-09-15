import type { Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { expectAnonymousSessionCookieNameFromEnv } from '../envUtils';
import { getParsedJwtFromCookie } from './cookiesUtils';
import { setCookieWithExpTimeInSec } from '../authCookiesUtils';

type AnonymousSessionCookie = {
	id: string;
	createdAt: Date;
	expirationDate: Date;
};
const anonymousSessionCookieSchema = z.object({
	id: z.string().min(1),
	createdAt: z.coerce.date(),
	expirationDate: z.coerce.date()
});
export async function getAnonymousSessionCookiePayload(
	cookies: Cookies
): Promise<AnonymousSessionCookie | null> {
	return await getParsedJwtFromCookie(
		expectAnonymousSessionCookieNameFromEnv(),
		anonymousSessionCookieSchema,
		cookies
	);
}

export function setAnonymousSessionCookie(
	data: AnonymousSessionCookie,
	cookies: Cookies
) {
	setCookieWithExpTimeInSec(
		expectAnonymousSessionCookieNameFromEnv(),
		data,
		Math.round(
			(data.expirationDate.getTime() - new Date().getTime()) / 1000
		),
		cookies
	);
}
