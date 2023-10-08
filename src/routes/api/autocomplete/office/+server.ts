import { prisma } from '$lib/server/prisma';
import { json, error } from '@sveltejs/kit';
import lodash from 'lodash';
import { z } from 'zod';
import { OFFICE_AUTOCOMPLETE_QUERY_PARAMS } from '../fetchAutocompleteOffice';

const { set, uniqBy } = lodash;

const queryParamsSchema = z.object<
	Record<OFFICE_AUTOCOMPLETE_QUERY_PARAMS, z.ZodTypeAny>
>({
	text: z.string().min(2),
	city: z.string().min(2).nullable(),
	'country-code': z.string().length(2).nullable()
});

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const values = queryParamsSchema.parse({
		text: url.searchParams.get(OFFICE_AUTOCOMPLETE_QUERY_PARAMS.text),
		city: url.searchParams.get(OFFICE_AUTOCOMPLETE_QUERY_PARAMS.city),
		'country-code': url.searchParams.get(
			OFFICE_AUTOCOMPLETE_QUERY_PARAMS.countryCode
		)
	});

	let locationQuery = {};
	if (values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.countryCode]) {
		set(
			locationQuery,
			'city.countryAlpha2',
			values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.countryCode]
		);
	}
	if (values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.city]) {
		set(
			locationQuery,
			'city.name',
			values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.city]
		);
	}

	const select = {
		select: {
			slug: true,
			name: true,
			city: {
				select: {
					country: {
						select: {
							alpha2: true
						}
					},
					name: true
				}
			}
		}
	};

	try {
		const [startsWith, contains] = await Promise.all([
			await prisma.entity.findMany({
				where: {
					...locationQuery,
					aliases: {
						some: {
							name: {
								startsWith: values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.text],
								mode: 'insensitive'
							}
						}
					}
				},
				...select,
				take: 10
			}),
			await prisma.entity.findMany({
				where: {
					...locationQuery,
					aliases: {
						some: {
							name: {
								contains: values[OFFICE_AUTOCOMPLETE_QUERY_PARAMS.text],
								mode: 'insensitive'
							}
						}
					}
				},
				...select,
				take: 10
			})
		]);

		return json(uniqBy([...startsWith, ...contains], 'name'));
	} catch (err) {
		console.error(err);
		throw error(500, err as any);
	}
}
