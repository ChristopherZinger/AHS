import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const countries = await prisma.country.findMany();

	throw redirect(307, '/survey');

	return {
		data: countries
	};
}
