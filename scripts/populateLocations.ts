import { EntityType } from '@prisma/client';
import { prisma } from '../src/lib/prisma';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

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

	console.log('set_retions_countries_cities_offices');
	await prisma.$transaction([
		createRegions(regions),
		createCountries(countries),
		createCities(cities),
		createOffices(offices)
	]);

	await createAliases();

	console.log('finito');
}

async function createAliases() {
	console.log('create_aliases');
	console.log('getting_offices');
	const offices = await prisma.entity.findMany();

	console.log('start_setting_aliases');
	await prisma.$transaction(
		offices.map((o) => {
			return prisma.alias.create({
				data: {
					entityType: EntityType.OFFICE,
					name: o.name,
					entityId: o.id
				}
			});
		})
	);
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
			countryAlpha2: c['country-alpha-2'],
			name: c.name
		}))
	});
}

function createOffices(offices: Office[]) {
	return prisma.entity.createMany({
		data: offices.map((o) => ({
			cityId: o.cityUUID,
			name: o.author.trim(),
			type: EntityType.OFFICE,
			slug: slugify(`${o.author.trim()}_${nanoid(5)}`, { lower: true })
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
