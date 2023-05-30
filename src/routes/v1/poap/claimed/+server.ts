import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function GET({ url }) {
    try {
        const address = url.searchParams.get('address');
        // sanitize
        if (!address) {
            return json({ error: 'Invalid input' }, { status: 400 });
        }
        const tokens = (await prismaDatabase.getTokensByAddress(address)) ?? [];
        return json({ tokens }, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
