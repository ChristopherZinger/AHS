import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function usePrisma(
	cb: (p: typeof prisma) => Promise<void>
): Promise<void> {
	try {
		await cb(prisma);
	} catch (e) {
		prisma.$disconnect();
		throw new Error(e as any);
	}
}
