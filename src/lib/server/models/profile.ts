import { prisma } from '$lib/prisma';
import type { Profile } from '@prisma/client';

type CreateProfile = Pick<Profile, 'email' | 'firebase_id'>;

const findProfileByFirebaseUID = async (
	firebaseUID: string
): Promise<Profile | null> =>
	await prisma.profile.findUnique({ where: { firebase_id: firebaseUID } });

const createProfile = async (profile: CreateProfile): Promise<Profile> =>
	await prisma.profile.create({ data: profile });

export const expectProfileForDecodedIdToken = async ({
	email,
	uid
}: {
	email: string;
	uid: string;
}): Promise<Profile> => {
	let profile = await findProfileByFirebaseUID(uid);

	if (!profile) {
		profile = await createProfile({ email, firebase_id: uid });
	}

	return profile;
};
