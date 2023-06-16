import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function POST({ request }) {
    try {
        const { address, claimCode } = (await request.json()) ?? {};
        if (!address || !claimCode) {
            return json({ error: 'Invalid Input' }, { status: 400 });
        }
        const success = await prismaDatabase.addTokenToUserByClaimCode(address, claimCode);
        if (!success) {
            return json({ error: 'Claim code does not exist' }, { status: 404 });
        }
        return json(undefined, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
