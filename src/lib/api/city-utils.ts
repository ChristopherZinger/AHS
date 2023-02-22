import type { City } from '@prisma/client';

export const fetchCityListByCountryCode = async (
	countryCode: string
): Promise<City[]> => {
	const url = `api/location/region/any/country/${countryCode}/city`;

	const res = await (
		await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	).json();

	return res.cities;
};
