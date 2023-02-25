import { prisma } from '../src/lib/prisma';

const main = async () => {
	const offices = await prisma.entity.findMany({
		where: {
			name: {
				startsWith: ' '
			}
		}
	});

	console.log('offices to update: ', offices.length)

	prisma.$transaction(
		offices.map((office) =>
			prisma.entity.update({
				where: {
					id: office.id,
				},
				data: {
					name: office.name.trim()
				}
			})
		)
	);

    console.log('done')
};

void main();
