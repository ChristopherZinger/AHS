import { prisma } from '../src/lib/server/prisma';

const main = async () => {
	const offices = await prisma.entity.findMany({
		where: {
			name: {
				startsWith: ' '
			}
		}
	});

	prisma.$transaction(
		offices.map((office) =>
			prisma.entity.update({
				where: {
					id: office.id
				},
				data: {
					name: office.name.trim()
				}
			})
		)
	);
};

void main();
