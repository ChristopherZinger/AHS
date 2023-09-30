import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const getPrismaClient = () => new PrismaClient();

export type AppPrisma = typeof prisma;

export async function usePrisma(
	cb: (p: AppPrisma) => Promise<void>
): Promise<void> {
	const prisma = new PrismaClient();
	try {
		await cb(prisma);
	} catch (e) {
		prisma.$disconnect();
		throw new Error(e as any);
	}
}
