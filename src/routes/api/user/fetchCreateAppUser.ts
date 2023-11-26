export async function fetchCreateAppUser(uid: string) {
	const url = `/api/user?uid=${uid}`;

	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
