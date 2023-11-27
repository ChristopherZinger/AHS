import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

export type TokenUser = {
	firebaseUid: string;
};
