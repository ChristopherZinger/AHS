import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		throw error(404);
	}

	const parsedSlug = z.string().parse(slug);

	const [office, comments] = await Promise.all([
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
				}
			}
		}),
		prisma.comment.findMany({
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
		})
	]);

	if (!office) {
		throw error(404);
	}

	return {
		office,
		comments
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
		const { user } = locals;
		if (!user) {
			throw error(401, 'unauthorized');
		}

		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');
		const officeSlug = data.get('officeSlug');

		z.object({
			title: z.string().min(1),
			content: z.string().min(4),
			officeSlug: z.string().min(1)
		}).parse({ title, content, officeSlug });

		const office = await prisma.entity.findUnique({
			where: {
				slug: officeSlug
			}
		});

		if (!office) {
			throw error(400, {
				message: 'office_missing_for_slug'
			});
		}

		await prisma.comment.create({
			data: {
				content,
				title,
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
		const { user } = locals;
		if (!user) {
			throw error(401, 'unauthorized');
		}

		const data = await request.formData();
		const content = data.get('content');
		const parentCommentId = data.get('parentCommentId');

		z.object({
			parentCommentId: z.string().min(1),
			content: z.string().min(2)
		}).parse({ content, parentCommentId });

		const comment = await prisma.comment.findUnique({
			where: {
				id: parentCommentId
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
				content: content,
				parentCommentId: parentCommentId
			}
		});

		return { success: true, message: 'subcommnet_created' };
	}
};
