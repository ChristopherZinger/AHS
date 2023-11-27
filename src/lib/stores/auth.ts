import { writable } from 'svelte/store';

export type AppUser = {
	email: string | null;
	firebaseUserUid: string;
};

const _appUser = writable<AppUser | null | undefined>(undefined);

export const appUser = {
	subscribe: _appUser.subscribe,
	set: (user: AppUser | null) => _appUser.set(user)
};
