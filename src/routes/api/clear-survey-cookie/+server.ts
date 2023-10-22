import { expectSessionCookieNameFromEnv } from '$lib/server/envUtils.js';

export async function DELETE({ cookies }): Promise<Response> {
	const surveyCookie = expectSessionCookieNameFromEnv();

	cookies.set(surveyCookie, '', {
		expires: new Date('2000-01-01'), // any past date
		path: '/'
	});

	return new Response('success');
}
