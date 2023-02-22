import { signOut, type Auth } from 'firebase/auth';
import { get } from 'svelte/store';
import { fs_token } from './stores/auth';

export const logout = async (auth: Auth) => {
	await signOut(auth);

	const token = get(fs_token);

	await fetch('/api/handleTokenUpdate', {
		method: 'DELETE',
		body: token
	});
};
