import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

export type TokenUser = {
	email: string;
	id: string;
	role: USER_ROLE;
};

export function parseTokenUser(tokenUser: unknown): TokenUser {
	return z
		.object({
			email: z.string().email(),
			id: z.string().uuid(),
			role: z.nativeEnum(USER_ROLE)
		})
		.passthrough()
		.parse(tokenUser);
}
