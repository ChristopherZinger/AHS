import { prisma } from '$lib/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { hashSync } from 'bcrypt';
import { USER_ROLE } from '@prisma/client';
import { setSessionCookie } from '$lib/server/authCookiesUtils';
import type { TokenUser } from '$lib/server/TokenUserUtils';

export async function load() {
	throw redirect(307, '/survey');
}

export const actions = {
	signup: async ({
		request,
		cookies
	}): Promise<{
		user: TokenUser;
	}> => {
		const rawData = await request.formData();

		const email = rawData.get('email');
		const password = rawData.get('password');

		const parsingResult = z
			.object({
				email: z.string().email(),
				password: z.string().min(6)
			})
			.safeParse({
				email,
				password
			});

		if (!parsingResult.success) {
			throw error(400, 'bad_input');
		}

		const { data } = parsingResult;
		const hashedPassword = hashSync(data.password, 10);

		const user = await prisma.user.create({
			data: {
				email: data.email,
				hashedPassword,
				role: USER_ROLE.STANDARD
			}
		});

		setSessionCookie(cookies, user);

		return {
			user: {
				email: user.email,
				id: user.id,
				role: user.role
			}
		};
	}
};
