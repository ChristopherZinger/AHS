import { createClient } from 'redis';
import { z } from 'zod'

type Redis = ReturnType<typeof createClient>;

export const _getRedis = (): (() => Redis) => {
	let redis: undefined | Redis;

	return () => {
		if (!redis) {
			const { REDIS_HOST, REDIS_PASSWORD } = process.env;

      z.string().min(1).parse(REDIS_HOST)
      z.string().min(1).parse(REDIS_PASSWORD)

			redis = createClient({
				url: `redis://chris:${REDIS_PASSWORD}@${REDIS_HOST}:6379`
			});

			redis.on('error', (err) =>
				console.log('Redis connection error', err)
			);

			redis.connect().then(async () => {
				console.log('connected to redis');
			});
		}

		return redis;
	};
};

export const getRedis = _getRedis();
