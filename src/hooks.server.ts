import {
	getCachedUserSession,
	saveUserSessionInCache,
	type CachedUser
} from '$lib/server/redis-utils';
import * as dotenv from 'dotenv';
import { verifyIdToken } from '$lib/server/token-utils';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { SESSION_COOKIE_NAME } from './routes/api/handleTokenUpdate/+server';
import { expectProfileForDecodedIdToken } from '$lib/server/models/profile';

dotenv.config();

/** @type {import('@sveltejs/kit').Handle} */
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
	const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);

	let user: null | CachedUser = null;
	if (sessionCookie) {
		user = await getCachedUserSession(sessionCookie);
		if (!user) {
			const {
				exp,
				email,
				uid: firebaseUID
			} = await verifyIdToken(sessionCookie);

			let profile = await expectProfileForDecodedIdToken({
				email,
				uid: firebaseUID
			});

			await saveUserSessionInCache(sessionCookie, {
				...profile,
				exp,
				firebaseUID
			});
		}
	}

	event.locals['user'] = user;

	return await resolve(event);
}
