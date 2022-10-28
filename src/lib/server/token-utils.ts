import { firestoreAdminAuth } from '$lib/server/firebase-admin';
import { z } from 'zod';

export const getMilisecondsUntilTokenExpires = (
	expirationTimeInSeconds: number
): number =>
	Math.round(expirationTimeInSeconds - new Date().getTime() / 1000);

export const verifyIdToken = async (
	idToken: string
): Promise<{ email: string; uid: string; exp: number }> => {
	const token = await firestoreAdminAuth.verifyIdToken(idToken);

	return z
		.object({
			email: z
				.string()
				.email('firebase_docoded_id_token_is_missing_email'),
			uid: z.string().min(1),
			exp: z.number()
		})
		.passthrough()
		.parse(token);
};
