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
import { Prisma, PrismaClient } from '@prisma/client';
export class PrismaDatabase {
    constructor() {
        this.prisma = new PrismaClient();
    }
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedToken = yield this.prisma.token.create({
                data: token,
            });
            return storedToken.id;
        });
    }
    getToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.prisma.token.findUnique({
                where: {
                    id,
                },
            });
            return token;
        });
    }
    getTokensByAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.prisma.user
                .findUnique({
                    where: {
                        address,
                    },
                })
                .tokens();
            return tokens;
        });
    }
}
//# sourceMappingURL=prismaDatabase.js.map
