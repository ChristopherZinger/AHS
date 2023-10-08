export function expectSessionCookieNameFromEnv(): string {
	return 'sessionId';
}

export function expectAnonymousSessionCookieNameFromEnv(): string {
	return 'tmpSessionId';
}

export function expectSurveySessionCookieNameFromEnv(): string {
	return 'surveyId';
}

export function expectJwtHashFromEnv(): string {
	const jwtHash = process.env.JWT_HASH;
	if (!jwtHash) {
		throw new Error('missing_env_var_jwt_hash');
	}
	return jwtHash;
}
