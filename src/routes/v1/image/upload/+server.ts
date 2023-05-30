import { writeFile } from 'fs/promises';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const formData = await request.formData();
    const image = (formData?.get('image') ?? {}) as File;

    if (!image.name) {
        return json(
            { error: 'Request did not contain file formdata with the key "image"' },
            { status: 400 }
        );
    }

    try {
        // Specify the directory where you want to save the uploaded files
        const uploadPath = `static/uploads/${image.name}`;

        // Write the file to the specified path
        await writeFile(uploadPath, new Uint8Array(await image.arrayBuffer()));

        // Return a response with the file details
        return json(
            {
                url: 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png',
            },
            { status: 200 }
        );
    } catch (error) {
        return json({ error: 'Image upload failed' }, { status: 500 });
    }
}
