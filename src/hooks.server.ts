import * as dotenv from 'dotenv';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import jwt from 'jsonwebtoken';
import { expectSessionCookieNameFromEnv } from '$lib/server/envUtils';
import { parseTokenUser } from '$lib/server/TokenUserUtils';

dotenv.config();

export async function handle({
	event,
	resolve
}: {
	event: RequestEvent & { locals: Record<string, unknown> };
	resolve(
		event: RequestEvent,
		opts?: ResolveOptions
	): MaybePromise<Response>;
}) {
	const sessionCookieName = expectSessionCookieNameFromEnv();
	const sessionCookie = event.cookies.get(sessionCookieName);

	if (sessionCookie) {
		const decodedToken = jwt.decode(sessionCookie, {});
		const user = parseTokenUser(decodedToken);
		event.locals.user = user;
	}

	return await resolve(event);
}
