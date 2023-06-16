import type { Token, TokenMetadata } from '$lib/types';
import { mockHostValue } from './mock.data';

type IdList = Array<string>;
type Address = { address: string } | { BADNAME: string };
export type Claim = {
    address: string;
    claimCode: string;
};
/*
 * generic function to get requests
 */
function testRequest(data: IdList | Address | TokenMetadata | Claim, empty = false) {
    const headers = {
        get: (property: string): string => {
            const metadata: { [key: string]: string } = { host: mockHostValue };
            return metadata[property];
        },
    };
    if (empty) {
        return { request: { json: () => new Promise((resolve) => resolve(null)) } };
    }
    return { request: { json: () => new Promise((resolve) => resolve(data)), headers: headers } };
}

/*
 * generic function to return that we pass in
 * return types is currently Array<Token> | undefined
 * will need to expand allowed types as additional tests are added
 */
function testFetchResponse(data: Array<Token> | undefined, status = true) {
    return { ok: status, json: () => new Promise((resolve) => resolve(data)) };
}

export { testRequest, testFetchResponse };
