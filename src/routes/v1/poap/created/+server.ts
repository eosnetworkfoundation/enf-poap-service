import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function POST({ request }) {
    try {
        const { address } = (await request.json()) ?? {};
        if (!address) {
            return json({ error: 'Invalid input' }, { status: 400 });
        }
        const tokens = (await prismaDatabase.getCreatedTokensByUserAddress(address)) ?? [];
        return json(tokens, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
