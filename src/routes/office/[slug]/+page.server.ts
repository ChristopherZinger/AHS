import { prisma } from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { z } from 'zod';

export const load = async ({ params, locals }) => {
	throw redirect(307, '/survey');
	const { user } = locals;

	const { slug } = params;

	if (!slug) {
		throw error(404);
	}

	const parsedSlug = z.string().parse(slug);

	const [office, comments, counters] = await Promise.all([
		await prisma.entity.findUnique({
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
						counter: true,
						redFlagName: true
					},
					take: 3,
					orderBy: {
						counter: 'desc'
					}
				}
			}
		}),
		await prisma.comment.findMany({
			where: {
				entity: {
					slug
				}
			},
			select: {
				content: true,
				title: true,
				createdAt: true,
				id: true,
				subcomments: {
					select: {
						content: true,
						createdAt: true
					},
					orderBy: {
						createdAt: 'desc'
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		}),
		await prisma.redFlagCounter.findMany({
			where: {
				entity: {
					slug: parsedSlug
				}
			}
		})
	]);

	if (!office) {
		throw error(404);
	}

	const userSurveys =
		user &&
		(await prisma.redFlagSurvey.findMany({
			where: {
				authorId: user.id,
				entityId: office.id
			},
			take: 1,
			orderBy: {
				createdAt: 'desc'
			}
		}));
	const didSubmitFlagsWithinPeriod = userSurveys?.reduce((acc, i) => {
		const hasSubmitedWithinPeriod = dayjs(i.createdAt).isAfter(
			dayjs().subtract(6, 'months')
		);

		if (hasSubmitedWithinPeriod) {
			return true;
		}

		return acc;
	}, false);

	const allFlags = counters.reduce((acc, i) => {
		acc += i.counter;
		return acc;
	}, 0);

	return {
		office,
		comments,
		allFlags,
		didSubmitFlagsWithinPeriod
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	'create-comment': async ({ request, locals }) => {
		/*
		TODO
			- only allow limited nr of comments per user per time unit
			- check for bad words - npm badword
		*/
		const { user } = locals as any;
		if (!user) {
			throw error(401, 'unauthorized');
		}

		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');
		const officeSlug = data.get('officeSlug');

		const parsedData = z
			.object({
				title: z.string().min(1),
				content: z.string().min(4),
				officeSlug: z.string().min(1)
			})
			.parse({ title, content, officeSlug });

		const office = await prisma.entity.findUnique({
			where: {
				slug: parsedData.officeSlug
			}
		});

		if (!office) {
			throw error(400, {
				message: 'office_missing_for_slug'
			});
		}

		await prisma.comment.create({
			data: {
				content: parsedData.content,
				title: parsedData.title,
				authorId: user.id,
				entityId: office.id
			}
		});

		return { success: true, message: 'commnet_created' };
	},
	'create-subcomment': async ({ request, locals }) => {
		/*
		TODO
			- only allow limited nr of comments per user per time unit
			- check for bad words - npm badword
		*/
		const { user } = locals as any;
		if (!user) {
			throw error(401, 'unauthorized');
		}

		const data = await request.formData();
		const content = data.get('content');
		const parentCommentId = data.get('parentCommentId');

		const parsedData = z
			.object({
				parentCommentId: z.string().min(1),
				content: z.string().min(2)
			})
			.parse({ content, parentCommentId });

		const comment = await prisma.comment.findUnique({
			where: {
				id: parsedData.parentCommentId
			}
		});

		if (!comment) {
			throw error(400, {
				message: 'comment_missing_for_id'
			});
		}

		await prisma.subcomment.create({
			data: {
				authorId: user.id,
				content: parsedData.content,
				parentCommentId: parsedData.parentCommentId
			}
		});

		return { success: true, message: 'subcommnet_created' };
	}
};
