import { initializeApp } from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import admin from 'firebase-admin';

const initializeFirebase = () => {
	if (!getApps().length) {
		console.log('initialize_firebase_admin');
		initializeApp();
	} else {
		console.warn('firebase_admin_app_already_exist');
	}
};

initializeFirebase();

export const firestoreAdmin = admin.firestore();
export const firestoreAdminAuth = admin.auth();
