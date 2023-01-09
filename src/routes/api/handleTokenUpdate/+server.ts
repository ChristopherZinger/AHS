import { dev } from '$app/environment';
import { getRedis } from '$lib/redis';
import {
	getCachedUserSession,
	getRedisUserSessionTokenKey,
	saveUserSessionInCache
} from '$lib/server/redis-utils';
import {
	getMilisecondsUntilTokenExpires,
	verifyIdToken
} from '$lib/server/token-utils';
import type { AppDecodedIdToken } from '$lib/server/token-utils';
import { expectProfileForDecodedIdToken } from '$lib/server/models/profile';
import type { RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE_NAME = 'sessionId';

const secure = dev ? '' : 'Secure;';

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const tokenId = await event.request.text();

	let cachedUser = await getCachedUserSession(tokenId);
	if (!cachedUser) {
		let decodedIdToken: undefined | AppDecodedIdToken = undefined;
		try {
			decodedIdToken = await verifyIdToken(tokenId);
		} catch (error) {
			console.log('could_not_verify_user', error); //  leave this log
			return new Response(null, {
				headers: {
					'set-cookie': `session=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
				},
				status: 401,
				statusText: 'could_not_verify_user'
			});
		}

		const profile = await expectProfileForDecodedIdToken(decodedIdToken);

		cachedUser = {
			...profile,
			exp: decodedIdToken.exp,
			firebaseUID: decodedIdToken.uid
		};

		await saveUserSessionInCache(tokenId, cachedUser);
	}

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
	const redis = getRedis();

	await redis.DEL(getRedisUserSessionTokenKey(tokenId));

	return new Response(null, {
		status: 200,
		headers: {
			'set-cookie': `${SESSION_COOKIE_NAME}=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
		}
	});
}
