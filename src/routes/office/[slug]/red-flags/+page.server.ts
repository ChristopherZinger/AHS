import { prisma } from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	throw redirect(307, '/survey');
	const { slug } = params;

	if (!slug) {
		throw error(404);
	}

	const parsedSlug = z.string().parse(slug);

	const [office] = await Promise.all([
		prisma.entity.findUnique({
			where: {
				slug: parsedSlug
			},
			include: {
				city: {
					select: {
						name: true,
						countryAlpha2: true
					}
				},
				redFlagCounters: {
					select: {
						redFlagName: true,
						counter: true
					}
				}
			}
		})
	]);

	if (!office) {
		throw error(404);
	}

	return {
		office
	};
};
