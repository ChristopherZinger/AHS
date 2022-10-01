import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import admin from 'firebase-admin'
import config from '../../../firebase.config.json'

const app = initializeApp(config)
const auth = getAuth(app)


export const firestoreAdmin = admin.firestore()
export const firestoreAdminAuth = auth