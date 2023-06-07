import type { Token } from '@prisma/client';
import Token from '../components/Token.svelte';

export class PoapServiceClient {
    fetch: typeof fetch;
    origin: string;

    constructor(origin?: string, fetchImpl?: typeof fetch) {
        this.origin = origin || (location && location.origin);
        this.fetch = fetchImpl || fetch;
    }

    async getToken(claimCode: string): Promise<Token[]> {
        try {
            const response = await this.fetch(`${this.origin}/v1/poap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([claimCode]),
            });

            if (!response.ok) {
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getClaimedTokens(address: string): Promise<Token[]> {
        try {
            const response = await this.fetch(`${this.origin}/v1/poap/claimed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                }),
            });

            if (!response.ok) {
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getCreatedTokens(address: string): Promise<Token[]> {
        try {
            const response = await this.fetch(`${this.origin}/v1/poap/created`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                }),
            });

            if (!response.ok) {
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async claimToken(address: string, claimCode: string): Promise<Token[]> {
        try {
            const response = await this.fetch(`${this.origin}/v1/poap/claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    claimCode,
                }),
            });

            if (!response.ok) {
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
