import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from '../../firebase.config.json';

enum FIREBASE_APPS {
	CLIENT = 'CLIENT',
	ADMIN = 'ADMIN'
}

initializeApp(config, FIREBASE_APPS.CLIENT);

export const firebase = getApp(FIREBASE_APPS.CLIENT);
export const auth = getAuth(firebase);
