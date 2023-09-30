import type { Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { expectAnonymousSessionCookieNameFromEnv } from '../envUtils';
import { getParsedJwtFromCookie } from './cookiesUtils';
import { setCookieWithExpTimeInSec } from '../authCookiesUtils';
import type { AppPrisma } from '$lib/prisma';
import type { AnonymousSession } from '@prisma/client';

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

export function clearAnonymousSessionCookie(cookies: Cookies) {
	cookies.set(expectAnonymousSessionCookieNameFromEnv(), '', {
		path: '/',
		expires: new Date('2000-01-01')
	});
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

export async function createAnonymousSessionRecord(
	prisma: AppPrisma
): Promise<AnonymousSession> {
	const expDate = new Date();
	expDate.setDate(new Date().getDate() + 30); // 30 days

	return await prisma.anonymousSession.create({
		data: { expirationDate: expDate }
	});
}
