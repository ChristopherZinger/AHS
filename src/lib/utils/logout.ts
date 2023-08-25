export async function logout(clearAppUser: () => void): Promise<void> {
	await fetch('api/logout', {
		method: 'DELETE'
	});
	clearAppUser();
}
