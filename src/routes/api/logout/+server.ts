import { expectSessionCookieNameFromEnv } from '$lib/server/envUtils.js';
import { error } from '@sveltejs/kit';

export async function DELETE({ cookies }): Promise<Response> {
	const sessionCookieName = expectSessionCookieNameFromEnv();

	cookies.set(sessionCookieName, '', {
		expires: new Date('2000-01-01'), // any past date
		path: '/'
	});

	return new Response('');
}
