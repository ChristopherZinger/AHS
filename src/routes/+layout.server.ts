import {
	parseTokenUser,
	type TokenUser
} from '$lib/server/TokenUserUtils.js';
import { expectSessionCookieNameFromEnv } from '$lib/server/envUtils';

import jwt from 'jsonwebtoken';

export async function load({
	cookies
}): Promise<{ user: TokenUser | null }> {
	const sessionCookieName = expectSessionCookieNameFromEnv();

	const token = cookies.get(sessionCookieName);
	if (!token) {
		return {
			user: null
		};
	}

	const decodedToken = jwt.decode(token);
	if (decodedToken === null) {
		return {
			user: null
		};
	}

	const user = parseTokenUser(decodedToken);

	return {
		user: {
			email: user.email,
			id: user.id,
			role: user.role
		}
	};
}
