import { getFirebaseAdmin } from '$lib/server/cookiesUtils/firebase.js';
import { getPrisma } from '$lib/server/prisma.js';
import { z } from 'zod';
import {} from '@sveltejs/kit';

export async function PUT({ url }) {
	const { auth } = getFirebaseAdmin();
	const uid = z.string().parse(url.searchParams.get('uid'));
	const user = await auth.getUser(uid); // this throws error if no user for id

	const prisma = getPrisma();
	try {
		await prisma.user.create({
			data: {
				firestoreAuthUid: user.uid
			}
		});
	} catch (error) {
		prisma.$disconnect();
		throw new Error(error as any);
	} finally {
		prisma.$disconnect();
	}

	return new Response();
}
