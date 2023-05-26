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
import { json } from '@sveltejs/kit';
import { PrismaDatabase } from '$lib/prismaDatabase';
const prismaDatabase = new PrismaDatabase();
const defaultImageUrl = 'https://cdn-images-1.medium.com/max/800/1*5FNuSa1b6gVd70NmZQmu7Q.png';

export function POST({ request }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenMetadata = (_a = yield request.json()) !== null && _a !== void 0 ? _a : {};
            // sanitize
            if (!tokenMetadata.name || !tokenMetadata.description) {
                return json({ error: 'Invalid input' }, { status: 400 });
            }
            const claimCode = yield prismaDatabase.createToken(
                Object.assign(Object.assign({}, tokenMetadata), {
                    imageUrl: tokenMetadata.imageUrl || defaultImageUrl,
                })
            );
            return json(
                {
                    claimCode,
                    claimUrl: `http://${request.headers.get('host')}?id=${claimCode}`,
                },
                { status: 201 }
            );
        } catch (error) {
            return json({ error: 'Invalid input' }, { status: 400 });
        }
    });
}
//# sourceMappingURL=+server.js.map
