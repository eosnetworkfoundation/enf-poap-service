import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
    {
        address: '0xf4C31FA6605a233259a6D8f8762da1E136131784',
    },
    {
        address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    },
    {
        address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    },
];

const tokens: Prisma.TokenCreateInput[] = [
    {
        name: 'EOS Network Fireside Chat Token',
        description: 'Token for attending a fireside chat.',
        imageUrl: 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png',
        creator: {
            connect: {
                address: users[0].address,
            },
        },
        claimers: {
            connect: [
                {
                    address: users[0].address,
                },
                {
                    address: users[1].address,
                },
            ],
        },
    },
    {
        name: 'Dog lovers monthly token',
        description: 'Token granted to attendees of the monthly dog lovers meeting',
        imageUrl:
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
        creator: {
            connect: {
                address: users[1].address,
            },
        },
        claimers: {
            connect: [
                {
                    address: users[0].address,
                },
                {
                    address: users[2].address,
                },
            ],
        },
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of users) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
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
