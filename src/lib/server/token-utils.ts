import { firestoreAdminAuth } from '$lib/server/firebase-admin';
import { parseCachedUser, type CachedUser } from '$lib/server/redis-utils';

export const getMilisecondsUntilTokenExpires = (
	expirationTimeInSeconds: number
): number =>
	Math.round(expirationTimeInSeconds - new Date().getTime() / 1000);

export const verifyIdToken = async (
	idToken: string
): Promise<CachedUser> => {
	const verifiedToken = await firestoreAdminAuth.verifyIdToken(idToken);
	return parseCachedUser(verifiedToken);
};
