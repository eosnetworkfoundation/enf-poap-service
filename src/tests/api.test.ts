import { describe, expect, it, vi } from 'vitest';
import { Token } from '$lib/types';

// override fetch to support mock
global.fetch = vi.fn();
/*
 * generic function to return that we pass in
 * return types is currently Array<Token>
 * will need to expand allowed types as additional tests are added
 */
function testFetchResponse(data: Array<Token>) {
    return { json: () => new Promise((resolve) => resolve(data)) };
}
// our mock data
const testToken: Token = {
    id: 'clij9zm550008pc8v0s815grk',
    name: 'Dog lovers monthly token',
    description: 'Token granted to attendees of the monthly dog lovers meeting',
    imageUrl:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    creatorAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
};

/*
 * Functional Wrapper around http call
 * Could easily put this code inside test
 */
async function getToken(id: string) {
    return (
        await fetch('http://localhost:8080/v1/poap/', {
            method: 'POST',
            body: `id: '${id}'`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
}
/*
 ** Our test suit for POAP Services
 */
describe('POAP Service', () => {
    it('makes POST request to fetch token meta-data', async () => {
        // mockResolvedValue injected in
        // https://vitest.dev/api/mock.html#mockresolvedvalue
        fetch.mockResolvedValue(testFetchResponse([testToken]));
        // wrapper around http call
        const returnedToken = await getToken(testToken.id);
        // check the correct call is made
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/v1/poap/', {
            method: 'POST',
            body: `id: '${testToken.id}'`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // check mock result, service call returns array, so we pack testToken into an array
        expect(returnedToken).toStrictEqual([testToken]);
    });
});
