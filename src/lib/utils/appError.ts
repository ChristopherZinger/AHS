// ! this is userd between client and server
export enum ServerErrorName {
	BAD_INPUT = 'bad_input',
	MISSING_OR_INVALID_ANONYMOUS_SESSION_COOKIE = 'missing_or_invalid_anonymous_session_cookie',
	MISSING_OR_INVALID_SURVEY_COOKIE = 'missing_or_invalid_survey_cookie',
	WRONG_SURVEY_FORMAT = 'wrong_survey_format',
	SURVEY_IS_COMPLETED = 'survey_is_already_completed'
}
