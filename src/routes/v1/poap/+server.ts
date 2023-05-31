import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function POST({ request }) {
    try {
        const ids = (await request.json()) ?? [];
        const tokens = await prismaDatabase.getTokens(ids);
        return json(tokens, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
