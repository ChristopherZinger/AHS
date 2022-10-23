import { prisma } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
	const payload = await event.request.json();
	let user: undefined | { email: string; firebaseId: string } = undefined;

	try {
		user = z
			.object({
				email: z.string().email(),
				firebaseId: z.string().min(1) // .uuid() ?
			})
			.parse(payload);
	} catch (err) {
		return new Response('incorrect_input', {
			status: 400
		});
	}

	await createUser(user);

	return new Response('user_profile_created', {
		status: 201
	});
}

export const createUser = async (user: {
	email: string;
	firebaseId: string;
}) => {
	await prisma.userProfile.create({
		data: user
	});
};
