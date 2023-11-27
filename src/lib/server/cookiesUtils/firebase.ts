import { initializeApp } from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import admin from 'firebase-admin';

export function getFirebaseAdmin() {
	if (!getApps().length) {
		initializeApp();
	}

	const app = admin.app();

	return {
		firestore: app.firestore(),
		auth: app.auth()
	};
}
