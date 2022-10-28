import { redis } from '$lib/redis';
import { z } from 'zod';

export type CachedUser = {
	email: string;
	exp: number;
	firebaseUID: string;
	id: string;
};

export const parseCachedUser = (user: unknown): CachedUser => {
	return z
		.object({
			id: z.string().min(1),
			firebaseUID: z.string().min(1),
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
	cachedUser: CachedUser
): Promise<void> => {
	const parsedCachedUser = parseCachedUser(cachedUser);
	await redis.SET(
		getRedisUserSessionTokenKey(token),
		JSON.stringify(parsedCachedUser),
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

export const clearAllUserSessions = async (): Promise<void> => {
	const keys = (await redis.KEYS('*')).filter((k) =>
		k.startsWith(RedisPrefix.USER_SESSION_TOKEN)
	);

	await Promise.all(keys.map(async (k) => redis.DEL(k)));
};
