import type { USER_ROLE } from '@prisma/client';
import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import {
	expectJwtHashFromEnv,
	expectSessionCookieNameFromEnv
} from './envUtils';

export function setSessionCookie(
	cookies: Cookies,
	user: {
		email: string;
		role: USER_ROLE;
		id: string;
	}
): void {
	const sessionCookieName = expectSessionCookieNameFromEnv();
	setCookieWithExpTimeInSec(
		sessionCookieName,
		{
			email: user.email,
			role: user.role,
			id: user.id
		},
		60 * 60 * 24 * 7, //week
		cookies
	);
}

export function setCookieWithExpTimeInSec(
	cookieName: string,
	payload: Record<string, unknown>,
	expirationInSeconds: number,
	cookies: Cookies
) {
	const jwtHash = expectJwtHashFromEnv();
	const expDate = new Date();
	expDate.setSeconds(new Date().getSeconds() + expirationInSeconds);

	const token = jwt.sign(payload, jwtHash, {
		expiresIn: expirationInSeconds
	});

	cookies.set(cookieName, token, {
		path: '/',
		expires: expDate
	});
}
