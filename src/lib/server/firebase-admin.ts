import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

const app = admin.initializeApp({
	credential: admin.credential.applicationDefault()
});

const auth = getAuth(app);

export const firestoreAdmin = admin.firestore();
export const firestoreAdminAuth = auth;
