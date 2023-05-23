import { json } from "@sveltejs/kit";
import { PrismaDatabase } from '$lib/prismaDatabase';

const prismaDatabase = new PrismaDatabase();

export async function POST({ request }) {
    try {
        const tokenMetadata = await request.json() ?? {};
        // sanitize
        if (!tokenMetadata.name || !tokenMetadata.description || !tokenMetadata.imageUrl) {
            return json({ error: "Invalid input" }, { status: 400 });
        }
        const claimCode = await prismaDatabase.createToken(tokenMetadata);
        return json({
            claimCode,
            claimUrl: `http://${request.headers.get("host")}?id=${claimCode}`
        }, { status: 201 });
    } catch (error) {
        return json({ error: "Invalid input" }, { status: 400 });
    }
}