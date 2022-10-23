import { auth } from '$lib/firebase-client';
import { signOut } from 'firebase/auth';
import { fs_token } from './stores/auth';

export const logout = async () => {
	await signOut(auth);

	let token;
	const x = fs_token.subscribe((_token) => {
		token = _token;
	});

	await fetch('/api/handleTokenUpdate', {
		method: 'DELETE',
		body: token
	});
};
