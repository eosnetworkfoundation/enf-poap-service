import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();
const defaultImageUrl = 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png';

export async function POST({ request }) {
    try {
        const tokenMetadata = (await request.json()) ?? {};
        if (!tokenMetadata.name || !tokenMetadata.description || !tokenMetadata.creatorAddress) {
            return json({ error: 'Invalid Input' }, { status: 400 });
        }
        const claimCode = await prismaDatabase.createToken({
            ...tokenMetadata,
            imageUrl: tokenMetadata.imageUrl || defaultImageUrl,
        });
        return json(
            {
                claimCode,
                claimUrl: `http://${request.headers.get('host')}?id=${claimCode}`,
            },
            { status: 201 }
        );
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
