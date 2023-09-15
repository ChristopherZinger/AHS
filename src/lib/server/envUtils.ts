export function expectSessionCookieNameFromEnv(): string {
	const sessionCookieName = process.env.SESSION_COOKIE_NAME;
	if (!sessionCookieName) {
		throw new Error('missing_session_cookie_name');
	}
	return sessionCookieName;
}

export function expectAnonymousSessionCookieNameFromEnv(): string {
	const anonymousSessionCookieName =
		process.env.ANONYMOUS_SESSION_COOKIE_NAME;
	if (!anonymousSessionCookieName) {
		throw new Error('missing_session_cookie_name');
	}
	return anonymousSessionCookieName;
}

export function expectSurveySessionCookieNameFromEnv(): string {
	const surveySessionCookieName = process.env.SURVEY_SESSION_COOKIE_NAME;
	if (!surveySessionCookieName) {
		throw new Error('missing_session_cookie_name');
	}
	return surveySessionCookieName;
}

export function expectJwtHashFromEnv(): string {
	const jwtHash = process.env.JWT_HASH;
	if (!jwtHash) {
		throw new Error('missing_env_var_jwt_hash');
	}
	return jwtHash;
}
