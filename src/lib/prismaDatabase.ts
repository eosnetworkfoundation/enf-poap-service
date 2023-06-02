import { Prisma, PrismaClient } from '@prisma/client';
import type { TokenMetadata } from './types';
export class PrismaDatabase {
    prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Creates the token in the DB and returns the claim code
     * If the user does not exist, it creates the user
     * If the claim code does not exist, it returns false to indicate failure and does not update the db
     * @param userAddress
     * @param claimCode
     * @returns Promise<boolean> indicating success or failure
     */
    async createToken({ creatorAddress, ...restOfMetadata }: TokenMetadata) {
        const token = await this.prisma.token.create({
            data: {
                ...restOfMetadata,
                creator: {
                    connectOrCreate: {
                        where: {
                            address: creatorAddress,
                        },
                        create: {
                            address: creatorAddress,
                        },
                    },
                },
            },
        });

        return token.id;
    }

    async getTokens(ids: string[]) {
        if (!ids.length) return [];

        return await this.prisma.token.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    async getClaimedTokensByUserAddress(address: string) {
        return await this.prisma.user
            .findUnique({
                where: {
                    address,
                },
            })
            .claimedTokens();
    }

    async getCreatedTokensByUserAddress(address: string) {
        return await this.prisma.user
            .findUnique({
                where: {
                    address,
                },
            })
            .createdTokens();
    }

    /**
     * Updates the user's tokens with the token associated with the claim code
     * If the user does not exist, it creates the user
     * If the claim code does not exist, it returns false to indicate failure and does not update the db
     * @param userAddress
     * @param claimCode
     * @returns Promise<boolean> indicating success or failure
     */
    async addTokenToUserByClaimCode(userAddress: string, claimCode: string): Promise<boolean> {
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
                address: userAddress,
            },
            create: {
                address: userAddress,
                claimedTokens: {
                    connect: {
                        id: token.id,
                    },
                },
            },
            update: {
                claimedTokens: {
                    connect: {
                        id: token.id,
                    },
                },
            },
        });

        return true;
    }
}
