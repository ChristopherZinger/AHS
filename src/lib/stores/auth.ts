import { writable } from 'svelte/store';
import {
	getAuth,
	onAuthStateChanged,
	onIdTokenChanged,
	type Auth
} from 'firebase/auth';
import { browser } from '$app/environment';
import { logout } from '$lib/auth-client-utils';

type AppUser = {
	email: string;
};

const _appUser = writable<AppUser | null | undefined>(undefined);

export const appUser = {
	subscribe: _appUser.subscribe,
	set: (user: AppUser | null) => _appUser.set(user)
};

export const initializeUser = (auth: Auth) => {
	if (browser && auth) {
		onAuthStateChanged(auth, (user) => {
			if (user && user.email === null) {
				throw new Error('user_without_email');
			}
			appUser.set(user ? { email: user.email! } : null);
		});
	} else {
		console.warn('browser_or_auth_is_missing');
		appUser.set(null);
	}
};

const _fs_token = writable<null | string>(null);
export const fs_token = {
	subscribe: _fs_token.subscribe
};

export const initFsToken = (auth: Auth) => {
	if (browser && auth) {
		onIdTokenChanged(auth, async (token) => {
			const idToken = (await token?.getIdToken()) || null;
			_fs_token.set(idToken);
			if (idToken) {
				const res = await fetch('/api/handleTokenUpdate', {
					body: idToken,
					method: 'POST'
				});

				if (res.status === 401) {
					console.error('forbidden');
					await logout(getAuth());
				}
			}
		});
	}
};
