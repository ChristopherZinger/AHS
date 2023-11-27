import * as dotenv from 'dotenv';
import { getFirebaseAdmin } from '$lib/server/cookiesUtils/firebase';
import { FIREBASE_AUTH_COOKIE_NAME as FIREBASE_AUTH_COOKIE_NAME } from '$lib/utils/firebase-utils';
import { error } from '@sveltejs/kit';

dotenv.config();

export async function handle(args) {
	const { event, resolve } = args;

	const firebaseToken = event.cookies.get(FIREBASE_AUTH_COOKIE_NAME);

	const { auth } = getFirebaseAdmin();

	if (firebaseToken) {
		try {
			const user = await auth.verifyIdToken(firebaseToken);
			event.locals.user = {
				firebaseUid: user.uid
			};
		} catch (err) {
			event.cookies.set(FIREBASE_AUTH_COOKIE_NAME, '', {
				expires: new Date('1-1-2000'),
				path: '/'
			});
			throw error(401, 'token_verification_fail');
		}
	}
	return await resolve(event);
}
