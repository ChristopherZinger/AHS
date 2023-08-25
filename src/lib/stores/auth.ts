import type { USER_ROLE } from '@prisma/client';
import { writable } from 'svelte/store';

export type AppUser = {
	email: string;
	id: string;
	role: USER_ROLE;
};

const _appUser = writable<AppUser | null | undefined>(undefined);

export const appUser = {
	subscribe: _appUser.subscribe,
	set: (user: AppUser | null) => _appUser.set(user)
};
