import { prisma } from '$lib/server/prisma';
import { AppRedFlag } from '$lib/utils/dbEnums.js';
import { error, redirect } from '@sveltejs/kit';
import lodash from 'lodash';
import { z } from 'zod';

const { uniq } = lodash;

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	throw redirect(307, '/survey');
	const { slug } = params;

	if (!slug) {
		throw error(404);
	}

	const parsedSlug = z.string().parse(slug);

	const office = await prisma.entity.findUnique({
		where: {
			slug: parsedSlug
		},
		include: {
			city: {
				select: {
					name: true,
					countryAlpha2: true
				}
			}
		}
	});

	if (!office) {
		throw error(404);
	}

	return {
		office
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	'submit-red-flag-survey': async ({ request, locals, params }) => {
		/*
		TODO
			- only allow limited nr of comments per user per time unit
			- check for bad words - npm badword
		*/
		const { user } = locals as any;
		if (!user) {
			throw error(401, 'unauthorized');
		}

		const officeSlug = params.slug;

		const isRedFlag = (flag: unknown): flag is AppRedFlag => {
			return Object.values(AppRedFlag).includes(flag as any);
		};

		const flags: AppRedFlag[] = [];
		const data = await request.formData();
		data.forEach((_, flag) => {
			if (isRedFlag(flag)) {
				flags.push(flag);
			}
		});

		const office = await prisma.entity.findUnique({
			where: {
				slug: officeSlug
			}
		});

		if (!office) {
			throw error(400, 'missing_office_for_slug');
		}

		await Promise.all([
			...uniq(flags).map(async (f) => {
				const counter = await prisma.redFlagCounter.findFirst({
					where: {
						entityId: office.id,
						redFlagName: f
					}
				});

				if (counter) {
					return await prisma.redFlagCounter.update({
						where: {
							id: counter.id
						},
						data: {
							counter: {
								increment: 1
							}
						}
					});
				}
				return await prisma.redFlagCounter.create({
					data: {
						redFlagName: f,
						entityId: office.id,
						counter: 1
					}
				});
			}),
			prisma.redFlagSurvey.create({
				data: {
					authorId: user.id,
					entityId: office.id,
					redFlags: flags
				}
			})
		]);

		return { success: true, message: 'red-flag-survey-submited' };
	}
};
