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
	const jwtHash = expectJwtHashFromEnv();
	const sessionCookieName = expectSessionCookieNameFromEnv();

	const token = jwt.sign(
		{
			email: user.email,
			role: user.role,
			id: user.id
		},
		jwtHash,
		{
			expiresIn: 60 * 60 * 24 * 7 // a week
		}
	);

	const expDate = new Date();
	expDate.setDate(new Date().getDate() + 7); /* a week */

	cookies.set(sessionCookieName, token, {
		path: '/',
		expires: expDate
	});
}
