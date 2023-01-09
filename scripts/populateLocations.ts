import { EntityType } from '@prisma/client';
import { prisma } from '../src/lib/prisma';

import {
	getCitiesFromFile,
	getCountriesFromFile,
	getOfficesFromFile
} from './populateDataParsers/readAndParseFiles';
import type { Office, City, Country } from './populateDataParsers/types';

async function main() {
	const countries = await getCountriesFromFile();
	const offices = await getOfficesFromFile();
	const cities = await getCitiesFromFile();

	const regions = [...new Set(countries.map((c) => c.region))];

	console.log('run transaction');
	await prisma.$transaction([
		createRegions(regions),
		createCountries(countries),
		createCities(cities),
		createOffices(offices)
	]);

	console.log('finito');
}

function createCountries(countries: Country[]) {
	return prisma.country.createMany({
		data: countries.map((c) => ({
			name: c.name,
			alpha2: c['alpha-2'],
			regionName: c.region
		}))
	});
}

function createCities(cities: City[]) {
	return prisma.city.createMany({
		data: cities.map((c) => ({
			id: c.uuid,
			countryAplha2: c['country-alpha-2'],
			name: c.name
		}))
	});
}

function createOffices(offices: Office[]) {
	return prisma.entity.createMany({
		data: offices.map((c) => ({
			cityId: c.cityUUID,
			name: c.author,
			type: EntityType.OFFICE,
			lookup_keywords: [c.author]
		}))
	});
}

function createRegions(regions: string[]) {
	return prisma.region.createMany({
		data: regions.map((name) => ({
			name
		}))
	});
}

void main();
