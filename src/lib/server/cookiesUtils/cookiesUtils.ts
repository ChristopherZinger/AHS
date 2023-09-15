import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { Schema } from 'zod';
import { expectJwtHashFromEnv } from '../envUtils';

export async function getParsedJwtFromCookie<T>(
	cookieName: string,
	schema: Schema<T>,
	cookies: Cookies
): Promise<null | T> {
	const jwtHash = expectJwtHashFromEnv();
	const token = cookies.get(cookieName);
	if (!token) {
		return null;
	}
	try {
		const payload = jwt.verify(token, jwtHash);
		const parsingResult = schema.parse(payload);
		return parsingResult;
	} catch (err) {
		console.error(err);
		return null;
	}
}
