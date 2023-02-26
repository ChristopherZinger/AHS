export type Office = {
	slug: string;
	city: { name: string; country: { alpha2: string } };
	name: string;
};

export enum OFFICE_QUERY_PARAMS {
	text = 'text',
	city = 'city',
	countryCode = 'country-code',
	startAt = 'start-at'
}

export const fetchOffice = async (
	text: string,
	options: {
		countryAlpha2?: string;
		cityName?: string;
		startAt?: number;
	} = {}
): Promise<Office[]> => {
	const params = new URLSearchParams();
	params.append(OFFICE_QUERY_PARAMS.text, text);

	if (options.countryAlpha2) {
		params.append(OFFICE_QUERY_PARAMS.countryCode, options.countryAlpha2);
	}

	if (options.cityName) {
		params.append(OFFICE_QUERY_PARAMS.city, options.cityName);
	}

	if (options.startAt) {
		params.append(OFFICE_QUERY_PARAMS.startAt, options.startAt.toString());
	}

	const url = 'api/office?' + params.toString();

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status !== 200) {
		throw new Error(await response.text());
	}

	return await response.json();
};
