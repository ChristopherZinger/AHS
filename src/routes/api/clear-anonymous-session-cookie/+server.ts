import { expectAnonymousSessionCookieNameFromEnv } from '$lib/server/envUtils.js';

export async function DELETE({ cookies }): Promise<Response> {
	const anonymousSession = expectAnonymousSessionCookieNameFromEnv();

	cookies.set(anonymousSession, '', {
		expires: new Date('2000-01-01'), // any past date
		path: '/'
	});

	return new Response('success');
}
