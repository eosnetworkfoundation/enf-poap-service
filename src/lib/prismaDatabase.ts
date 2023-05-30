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
            }
        });
        return token;
    }

    async getTokensByAddress(address: string) {
        const tokens = await this.prisma.user
            .findUnique({
                where: {
                    address,
                }
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
     * @returns
     */
    async addTokenToUserByClaimCode(address: string, claimCode: string) {
        const token = await this.prisma.token.findUnique({
            where: {
                id: claimCode,
            },
        });
        if (!token) {
            return false;
        }
        const user = await this.prisma.user.findUnique({
            where: {
                address,
            },
        });
        if (!user) {
            await this.prisma.user.create({
                data: {
                    address,
                    tokens: {
                        connect: {
                            id: token.id,
                        },
                    },
                },
            });
        } else {
            await this.prisma.user.update({
                where: {
                    address,
                },
                data: {
                    tokens: {
                        connect: {
                            id: token.id,
                        },
                    },
                },
            });
        }

        return true;
    }
}
