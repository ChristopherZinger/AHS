import { dev } from '$app/environment';
import { redis } from '$lib/redis';
import {
	getCachedUserSession,
	getRedisUserSessionTokenKey,
	saveUserSessionInCache
} from '$lib/server/redis-utils';
import {
	getMilisecondsUntilTokenExpires,
	verifyIdToken
} from '$lib/server/token-utils';
import type { RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE_NAME = 'sessionId';

const secure = dev ? '' : 'Secure;';

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const tokenId = await event.request.text();

	let cachedUser = await getCachedUserSession(tokenId);
	if (!cachedUser) {
		try {
			cachedUser = await verifyIdToken(tokenId);
		} catch (error) {
			console.log('could not verify user', error); //  leave this log
			return new Response(null, {
				headers: {
					'set-cookie': `session=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
				},
				status: 401
			});
		}
	}

	await saveUserSessionInCache(tokenId, cachedUser);

	const nrOfMilisecondsUntilTokenExpires = getMilisecondsUntilTokenExpires(
		cachedUser.exp
	);

	return new Response(null, {
		headers: {
			'set-cookie': `${SESSION_COOKIE_NAME}=${tokenId}; Max-Age=${nrOfMilisecondsUntilTokenExpires}; Path=/; HttpOnly; ${secure};`
		},
		status: 201
	});
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(event: RequestEvent) {
	const tokenId = await event.request.text();

	await redis.DEL(getRedisUserSessionTokenKey(tokenId));

	return new Response(null, {
		status: 200,
		headers: {
			'set-cookie': `session=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
		}
	});
}
