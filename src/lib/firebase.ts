import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from '../../firebase.config.json';

initializeApp(config);

export const firebase = getApp();
export const auth = getAuth();
