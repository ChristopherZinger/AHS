export type OfficeAutocomplete = {
	city: { name: string; country: { alpha2: string } };
	name: string;
	id: string;
};

export enum OFFICE_AUTOCOMPLETE_QUERY_PARAMS {
	text = 'text',
	city = 'city',
	countryCode = 'country-code'
}

export const ENTITY_AUTOCOMPLETE_PATH = 'api/autocomplete/office';

export const fetchOfficeAutocomplete = async (
	text: string,
	options: {
		countryAlpha2?: string;
		cityName?: string;
	} = {}
): Promise<OfficeAutocomplete[]> => {
	const params = new URLSearchParams();
	params.append(OFFICE_AUTOCOMPLETE_QUERY_PARAMS.text, text);

	if (options.countryAlpha2) {
		params.append(
			OFFICE_AUTOCOMPLETE_QUERY_PARAMS.countryCode,
			options.countryAlpha2
		);
	}

	if (options.cityName) {
		params.append(OFFICE_AUTOCOMPLETE_QUERY_PARAMS.city, options.cityName);
	}

	const url = ENTITY_AUTOCOMPLETE_PATH + '?' + params.toString();

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
