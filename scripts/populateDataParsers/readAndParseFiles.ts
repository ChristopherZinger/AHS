import fs from 'fs';
import path from 'path';
import { parseCities } from './city';
import { parseCountries } from './country';
import { parseOffices } from './office';
import type { City, Country, Office } from './types';

const __dirname = path.resolve('');
const pathToIitialData = path.join(__dirname, '../initial-data/ahs-initial-data');

export async function getParsedFile<T>(
	path: string,
	parse: (data: unknown) => T
) {
	return parse(JSON.parse(fs.readFileSync(path, 'utf-8')));
}

export async function getCountriesFromFile(): Promise<Country[]> {
	return await getParsedFile(
		path.join(pathToIitialData, 'countries.json'),
		parseCountries
	);
}

export async function getOfficesFromFile(): Promise<Office[]> {
	return getParsedFile(
		path.join(pathToIitialData, 'officeByCountryCode.json'),
		parseOffices
	);
}

export async function getCitiesFromFile(): Promise<City[]> {
	return getParsedFile(
		path.join(
			pathToIitialData,
			'citiesWithCountryCodeAndUuid.json'
		),
		parseCities
	);
}
