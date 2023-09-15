import { prisma } from '$lib/prisma';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const countryCodeQueryParam = params['country_code'];
	const parseResult = z
		.string()
		.length(2)
		.safeParse(countryCodeQueryParam);

	if (!parseResult.success) {
		throw error(400, 'Bad request');
	}

	try {
		const cities = await prisma.city.findMany({
			where: {
				countryAlpha2: parseResult.data
			}
		});

		return json({
			cities
		});
	} catch (err) {
		console.error(err);
		throw error(500, err as any);
	}
}
