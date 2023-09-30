import { getPrismaClient, usePrisma } from '$lib/prisma.js';
import {
	createAnonymousSessionRecord,
	getAnonymousSessionCookiePayload,
	setAnonymousSessionCookie
} from '$lib/server/cookiesUtils/AnonymousSessionCookieUtils.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { ServerErrorName } from '$lib/utils/appError.js';
import { AppServerError } from '$lib/server/AppServerErrorUtils.js';

export const actions = {
	'register-subscriber': async function ({ request, cookies }) {
		const prisma = getPrismaClient();
		try {
			let sessionCookie = await getAnonymousSessionCookiePayload(cookies);
			if (!sessionCookie) {
				sessionCookie = await createAnonymousSessionRecord(prisma);
				setAnonymousSessionCookie(
					{
						id: sessionCookie.id,
						createdAt: sessionCookie.createdAt,
						expirationDate: sessionCookie.expirationDate
					},
					cookies
				);
			}

			const form = await request.formData();
			const parsingResult = z
				.string()
				.email()
				.safeParse(form.get('email'));
			if (!parsingResult.success) {
				throw new AppServerError(400, ServerErrorName.BAD_INPUT);
			}

			const { data: email } = parsingResult;

			await prisma.subscriber.upsert({
				where: {
					email
				},
				update: {
					email,
					sessionId: sessionCookie.id
				},
				create: {
					email,
					sessionId: sessionCookie.id
				}
			});
		} catch (e) {
			prisma.$disconnect();
			if (e instanceof AppServerError) {
				throw error(e.code, e);
			} else {
				throw new Error();
			}
		}
	}
};
