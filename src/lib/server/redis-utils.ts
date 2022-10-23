import type { DecodedIdToken } from 'firebase-admin/auth';
import { redis } from '$lib/redis';
import { z } from 'zod';

export type CachedUser = {
	email: string;
	exp: number;
};

export const parseCachedUser = (user: unknown) => {
	return z
		.object({
			email: z.string().email(),
			exp: z.number()
		})
		.passthrough()
		.parse(user);
};

enum RedisPrefix {
	USER_SESSION_TOKEN = 'user-session-token_'
}

export const getRedisUserSessionTokenKey = (token: string): string =>
	RedisPrefix.USER_SESSION_TOKEN + token;

export const saveUserSessionInCache = async (
	token: string,
	decodedToken: DecodedIdToken | CachedUser
): Promise<void> => {
	const cachedUser = parseCachedUser(decodedToken);
	await redis.SET(
		getRedisUserSessionTokenKey(token),
		JSON.stringify(cachedUser),
		{
			EXAT: cachedUser.exp
		}
	);
};

export const getCachedUserSession = async (
	token: string
): Promise<CachedUser | null> => {
	const cachedUser = await redis.GET(getRedisUserSessionTokenKey(token));
	return cachedUser ? parseCachedUser(JSON.parse(cachedUser)) : null;
};

export const clearAllUserSessions = async () => {
	const keys = (await redis.KEYS('*')).filter((k) =>
		k.startsWith(RedisPrefix.USER_SESSION_TOKEN)
	);

	await Promise.all(keys.map(async (k) => redis.DEL(k)));
};
