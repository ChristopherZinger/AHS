import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from '../../firebase.config.json';
import { FIREBASE_APPS } from './constants';

initializeApp(config, FIREBASE_APPS.CLIENT);

export const firebase = getApp(FIREBASE_APPS.CLIENT);
export const auth = getAuth(firebase);
