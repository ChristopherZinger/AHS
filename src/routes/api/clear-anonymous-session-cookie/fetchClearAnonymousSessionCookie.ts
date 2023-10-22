export async function fetchClearAnonymousSessionCookie(): Promise<void> {
	const response = await fetch('/api/clear-anonymous-session-cookie', {
		method: 'DELETE'
	});

	if (response.status !== 200) {
		throw new Error(await response.text());
	}

	return;
}
