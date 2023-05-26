import { writeFile } from 'fs/promises';
import { json } from '@sveltejs/kit';
import logger from '@/utils/logger';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
    const formData = await request.formData();
    const image = (formData?.get('image') ?? {}) as File;

    if (!image.name) {
        logger.error('Request did not contain file formdata with the key "image"');
        return json({ status: 400 });
    }

    try {
        // Specify the directory where you want to save the uploaded files
        const uploadPath = `static/uploads/${image.name}`;

        // Write the file to the specified path
        await writeFile(uploadPath, new Uint8Array(await image.arrayBuffer()));

        logger.info('Image successfully uploaded: %s', image.name);

        // Return a response with the file details
        return json(
            {
                url: 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png',
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error('Image upload failed');
        return json({ status: 500 });
    }
}
