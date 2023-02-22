import { prisma } from '$lib/prisma';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async () => {
	const countries = await prisma.country.findMany();

	return {
		data: countries
	};
};

