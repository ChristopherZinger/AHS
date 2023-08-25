import { prisma } from '$lib/prisma.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { compareSync } from 'bcrypt';
import { setSessionCookie } from '$lib/server/authCookiesUtils';
import type { TokenUser } from '$lib/server/TokenUserUtils';

export const actions = {
	login: async ({
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
			throw error(400, 'bad_inupt');
		}

		const { data } = parsingResult;

		const user = await prisma.user.findUnique({
			where: {
				email: data.email
			}
		});

		if (!user) {
			throw error(401, 'no_user_with_this_email');
		}

		const isPasswordCorrect = compareSync(
			data.password,
			user.hashedPassword
		);
		if (!isPasswordCorrect) {
			throw error(401, 'wrong_password');
		}

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
