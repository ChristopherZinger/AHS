export function expectSessionCookieNameFromEnv(): string {
	const sessionCookieName = process.env.SESSION_COOKIE_NAME;
	if (!sessionCookieName) {
		throw new Error('missing_session_cookie_name');
	}
	return sessionCookieName;
}

export function expectJwtHashFromEnv(): string {
	const jwtHash = process.env.JWT_HASH;
	if (!jwtHash) {
		throw new Error('missing_env_var_jwt_hash');
	}
	return jwtHash;
}
