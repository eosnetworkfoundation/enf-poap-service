import type { Token, TokenMetadata } from '$lib/types';
import type { Claim } from './mock.util';

/*
 * Mock Data
 */
const mockHostValue = 'localhost:8080';
const tokenId = 'clij9zm550008pc8v0s815grk';
const userETHAddress = '0xf4C31FA6605a233259a6D8f8762da1E136131784';
const testToken: Token = {
    id: tokenId,
    name: 'Dog lovers monthly token',
    description: 'Token granted to attendees of the monthly dog lovers meeting',
    imageUrl:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    creatorAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
};

const testTokenMetadata: TokenMetadata = {
    name: 'Cat lovers monthly token',
    description: 'Token granted to attendees of the monthly cat lovers meeting',
    imageUrl:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    creatorAddress: '0xf4C31FA6605a233259a6D8f8762da1E136131784',
};

const testClaimCode = 'clij9zm550008pc8v0s999zzz';

const mockClaim: Claim = { address: userETHAddress, claimCode: testClaimCode };

export {
    mockClaim,
    mockHostValue,
    testClaimCode,
    tokenId,
    testToken,
    testTokenMetadata,
    userETHAddress,
};
