import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaDatabase {
    prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createToken(token: Prisma.TokenCreateInput) {
        const storedToken = await this.prisma.token.create({
            data: token,
        });
        return storedToken.id;
    }

    async getToken(id: string) {
        const token = await this.prisma.token.findUnique({
            where: {
                id,
            },
        });
        return token;
    }

    async getTokensByAddress(address: string) {
        const tokens = await this.prisma.user
            .findUnique({
                where: {
                    address,
                },
            })
            .tokens();
        return tokens;
    }
}
