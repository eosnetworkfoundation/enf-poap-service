import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function GET({ params }) {
    try {
        const id = params.id;
        const token = await prismaDatabase.getToken(id);
        if (!token) {
            return json({ error: 'Token not found' }, { status: 404 });
        }
        return json({ token }, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Error' }, { status: 500 });
    }
}
