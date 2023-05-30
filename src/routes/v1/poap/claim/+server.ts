import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function POST({ request }) {
    try {
        const claim = (await request.json()) ?? {};
        // sanitize
        if (!claim.address || !claim.claimCode) {
            return json({ error: 'Invalid input' }, { status: 400 });
        }
        const success = await prismaDatabase.addTokenToUserByClaimCode(
            claim.address,
            claim.claimCode
        );
        if (!success) {
            return json({ success, error: 'Claim code does not exist' }, { status: 404 });
        }
        return json({ success }, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
