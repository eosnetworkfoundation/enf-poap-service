var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { writeFile } from 'fs/promises';
import { json } from '@sveltejs/kit';

export function POST({ request }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const formData = yield request.formData();
        const image =
            (_a = formData === null || formData === void 0 ? void 0 : formData.get('image')) !==
                null && _a !== void 0
                ? _a
                : {};
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
            yield writeFile(uploadPath, new Uint8Array(yield image.arrayBuffer()));
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
    });
}
//# sourceMappingURL=+server.js.map
