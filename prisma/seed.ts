import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tokens: Prisma.TokenCreateInput[] = [
    {
        name: 'EOS Network Fireside Chat Token',
        description: 'Token for attending a fireside chat.',
        imageUrl: 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png',
        users: {
            create: [
                {
                    address: '0xf4C31FA6605a233259a6D8f8762da1E136131784',
                },
            ],
        },
    },
    {
        name: 'Dog lovers monthly token',
        description: 'Token granted to attendees of the monthly dog lovers meeting',
        imageUrl:
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const t of tokens) {
        const token = await prisma.token.create({
            data: t,
        });
        console.log(`Created token with id: ${token.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
