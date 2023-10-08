import { prisma } from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';
import lodash from 'lodash';
import { z } from 'zod';
import { OFFICE_QUERY_PARAMS } from './fetchOffices';
import { EntityType } from '@prisma/client';

const { set } = lodash;

const queryParamsSchema = z.object<
	Record<OFFICE_QUERY_PARAMS, z.ZodTypeAny>
>({
	[OFFICE_QUERY_PARAMS.text]: z.string().min(2),
	[OFFICE_QUERY_PARAMS.city]: z.string().min(2).nullable(),
	[OFFICE_QUERY_PARAMS.countryCode]: z.string().length(2).nullable(),
	[OFFICE_QUERY_PARAMS.startAt]: z.string().nullable()
});

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const values = queryParamsSchema.parse({
		[OFFICE_QUERY_PARAMS.text]: url.searchParams.get(
			OFFICE_QUERY_PARAMS.text
		),
		[OFFICE_QUERY_PARAMS.city]: url.searchParams.get(
			OFFICE_QUERY_PARAMS.city
		),
		[OFFICE_QUERY_PARAMS.countryCode]: url.searchParams.get(
			OFFICE_QUERY_PARAMS.countryCode
		),
		[OFFICE_QUERY_PARAMS.startAt]: url.searchParams.get(
			OFFICE_QUERY_PARAMS.startAt
		)
	});

	let locationQuery = {};
	if (values[OFFICE_QUERY_PARAMS.countryCode]) {
		set(
			locationQuery,
			'city.countryAlpha2',
			values[OFFICE_QUERY_PARAMS.countryCode]
		);
	}
	if (values[OFFICE_QUERY_PARAMS.city]) {
		set(locationQuery, 'city.name', values[OFFICE_QUERY_PARAMS.city]);
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
		const offices = await prisma.entity.findMany({
			skip: parseInt(values[OFFICE_QUERY_PARAMS.startAt] || 0),
			orderBy: {
				name: 'asc'
			},
			where: {
				type: EntityType.OFFICE,
				...locationQuery,
				aliases: {
					some: {
						name: {
							contains: values[OFFICE_QUERY_PARAMS.text],
							mode: 'insensitive'
						}
					}
				}
			},
			...select,
			take: 20
		});

		return json(offices);
	} catch (err) {
		console.log(err);
		throw error(500, err as any);
	}
}
