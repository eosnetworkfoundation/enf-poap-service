import type { Token } from "@prisma/client";

export class PoapServiceClient {
    fetch: typeof fetch;
    origin: string;

    constructor(origin?: string, fetchImpl?: typeof fetch) {
        this.origin = origin || (location && location.origin);
        this.fetch = fetchImpl || fetch;
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
}
