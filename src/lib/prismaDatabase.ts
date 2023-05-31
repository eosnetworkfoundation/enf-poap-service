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

    async getTokens(ids: string[]) {
        if (ids.length === 0) {
            return [];
        }

        const tokens = await this.prisma.token.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        return tokens;
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

    /**
     * Updates the user's tokens with the token associated with the claim code
     * If the user does not exist, it creates the user
     * If the claim code does not exist, it returns false to indicate failure and does not update the db
     * @param address
     * @param claimCode
     * @returns Promise<boolean> indicating success or failure
     */
    async addTokenToUserByClaimCode(address: string, claimCode: string): Promise<boolean> {
        const token = await this.prisma.token.findUnique({
            where: {
                id: claimCode,
            },
        });
        if (!token) {
            return false;
        }

        await this.prisma.user.upsert({
            where: {
                address,
            },
            create: {
                address,
                tokens: {
                    connect: {
                        id: token.id,
                    },
                },
            },
            update: {
                tokens: {
                    connect: {
                        id: token.id,
                    },
                },
            },
        });

        return true;
    }
}
