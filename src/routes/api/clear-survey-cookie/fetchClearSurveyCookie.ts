export async function fetchClearSurveyCookie(): Promise<void> {
	const response = await fetch('/api/clear-survey-cookie', {
		method: 'DELETE'
	});

	if (response.status !== 200) {
		throw new Error(await response.text());
	}

	return;
}
