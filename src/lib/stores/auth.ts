import { readable } from 'svelte/store';
import { auth } from '$lib/firebase-client';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { browser } from '$app/environment';
import { logout } from '$lib/auth-client-utils';

type appUser = {
	email: string;
};

export const appUser = readable<appUser | null | undefined>(
	undefined,
	(set) => {
		if (browser) {
			onAuthStateChanged(auth, (user) =>
				set(user ? { email: user.email || '' } : null)
			);
		}
	}
);

export const fs_token = readable<string | null | undefined>(
	undefined,
	(set) => {
		if (browser) {
			onIdTokenChanged(auth, async (token) => {
				const tokenId = token ? await token.getIdToken() : null;
				set(tokenId);

				if (tokenId) {
					const res = await fetch('/api/handleTokenUpdate', {
						body: tokenId,
						method: 'POST'
					});

					if (res.status === 401) {
						console.error('Could not verify the user');
						await logout();
					}
				}
			});
		}
	}
);
