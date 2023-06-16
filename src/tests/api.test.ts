import { describe, expect, it, vi } from 'vitest';
import { PrismaDatabase } from '$lib/prismaDatabase';
import { POST as v1_poap } from '$lib/../routes/v1/poap/+server';
import { POST as v1_poap_created } from '$lib/../routes/v1/poap/created/+server';
import { POST as v1_poap_create } from '$lib/../routes/v1/poap/create/+server';
import { POST as v1_poap_claimed } from '$lib/../routes/v1/poap/claimed/+server';
import { POST as v1_poap_claim } from '$lib/../routes/v1/poap/claim/+server';
import {
    mockClaim,
    mockHostValue,
    testClaimCode,
    testToken,
    testTokenMetadata,
    tokenId,
    userETHAddress,
} from './mock.data';
import { testRequest } from './mock.util';

// override db calls via mock
vi.mock('$lib/prismaDatabase');
// define client once
const prismaDatabase = new PrismaDatabase();
/*
 ** Our test suit for POAP Services
 */
describe('POAP Service', () => {
    it('makes successful /v1/poap request', async () => {
        // inject mock
        prismaDatabase.getTokens.mockResolvedValue([testToken]);
        // emulate the HTTP POST call
        const response = await v1_poap(testRequest([tokenId]));
        expect(response.ok).toBe(true);
        const tokens = await response.json();
        expect(tokens[0]).toStrictEqual(testToken);
        expect(response.status).toStrictEqual(200);
        prismaDatabase.getTokens.mockClear();
    });
    it('returns empty for /v1/poap when db errors', async () => {
        // inject mock
        prismaDatabase.getTokens.mockRejectedValue(new Error('bad database call'));
        // emulate the HTTP POST call
        const response = await v1_poap(testRequest([]));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Internal Error' });
        expect(response.status).toStrictEqual(500);
        prismaDatabase.getTokens.mockClear();
    });

    it('makes successful /v1/created request', async () => {
        // inject mock
        prismaDatabase.getCreatedTokensByUserAddress.mockResolvedValue([testToken]);
        // emulate the HTTP POST call
        const response = await v1_poap_created(testRequest({ address: userETHAddress }));
        expect(response.ok).toBe(true);
        const tokens = await response.json();
        expect(tokens[0]).toStrictEqual(testToken);
        expect(response.status).toStrictEqual(200);
        prismaDatabase.getCreatedTokensByUserAddress.mockClear();
    });
    it('returns empty for /v1/created when db errors', async () => {
        // inject mock
        prismaDatabase.getCreatedTokensByUserAddress.mockRejectedValue(
            new Error('bad database call')
        );
        // emulate the HTTP POST call
        const response = await v1_poap_created(testRequest({ address: userETHAddress }));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Internal Error' });
        expect(response.status).toStrictEqual(500);
        prismaDatabase.getCreatedTokensByUserAddress.mockClear();
    });
    it('returns Invalid for /v1/created when address not found', async () => {
        // inject mock
        prismaDatabase.getCreatedTokensByUserAddress.mockResolvedValue([testToken]);
        // emulate the HTTP POST call
        const response = await v1_poap_created(testRequest({ BADNAME: userETHAddress }));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Invalid Input' });
        expect(response.status).toStrictEqual(400);
        prismaDatabase.getCreatedTokensByUserAddress.mockClear();
    });

    it('makes successful /v1/create request', async () => {
        // assemble expected
        const expected = {
            claimCode: testClaimCode,
            claimUrl: `http://${mockHostValue}?id=${testClaimCode}`,
        };
        // inject mock
        prismaDatabase.createToken.mockResolvedValue(testClaimCode);
        // emulate the HTTP POST call
        const response = await v1_poap_create(testRequest(testTokenMetadata));
        expect(response.ok).toBe(true);
        const claim = await response.json();
        expect(claim).toStrictEqual(expected);
        expect(response.status).toStrictEqual(201);
        prismaDatabase.createToken.mockClear();
    });
    it('makes invalid /v1/create request', async () => {
        // inject mock
        prismaDatabase.createToken.mockResolvedValue(testClaimCode);
        // emulate the HTTP POST call
        const response = await v1_poap_create(testRequest(testTokenMetadata, true));
        expect(response.ok).toBe(false);
        const claim = await response.json();
        expect(claim).toStrictEqual({ error: 'Invalid Input' });
        expect(response.status).toStrictEqual(400);
        prismaDatabase.createToken.mockClear();
    });
    it('returns empty for /v1/create when db errors', async () => {
        // inject mock
        prismaDatabase.createToken.mockRejectedValue(new Error('bad database call'));
        // emulate the HTTP POST call
        const response = await v1_poap_create(testRequest(testTokenMetadata));
        expect(response.ok).toBe(false);
        const claim = await response.json();
        expect(claim).toStrictEqual({ error: 'Internal Error' });
        expect(response.status).toStrictEqual(500);
        prismaDatabase.createToken.mockClear();
    });

    it('makes successful /v1/claimed request', async () => {
        // inject mock
        prismaDatabase.getClaimedTokensByUserAddress.mockResolvedValue([testToken]);
        // emulate the HTTP POST call
        const response = await v1_poap_claimed(testRequest({ address: userETHAddress }));
        expect(response.ok).toBe(true);
        const tokens = await response.json();
        expect(tokens[0]).toStrictEqual(testToken);
        expect(response.status).toStrictEqual(200);
        prismaDatabase.getClaimedTokensByUserAddress.mockClear();
    });
    it('returns empty for /v1/claimed when db errors', async () => {
        // inject mock
        prismaDatabase.getClaimedTokensByUserAddress.mockRejectedValue(
            new Error('bad database call')
        );
        // emulate the HTTP POST call
        const response = await v1_poap_claimed(testRequest({ address: userETHAddress }));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Internal Error' });
        expect(response.status).toStrictEqual(500);
        prismaDatabase.getClaimedTokensByUserAddress.mockClear();
    });
    it('returns Invalid for /v1/claimed when address not found', async () => {
        // inject mock
        prismaDatabase.getClaimedTokensByUserAddress.mockResolvedValue([testToken]);
        // emulate the HTTP POST call
        const response = await v1_poap_claimed(testRequest({ BADNAME: userETHAddress }));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Invalid Input' });
        expect(response.status).toStrictEqual(400);
        prismaDatabase.getClaimedTokensByUserAddress.mockClear();
    });

    it('makes successful /v1/claim request', async () => {
        // inject mock
        prismaDatabase.addTokenToUserByClaimCode.mockResolvedValue(true);
        // emulate the HTTP POST call
        const response = await v1_poap_claim(testRequest(mockClaim));
        expect(response.ok).toBe(true);
        expect(response.status).toStrictEqual(200);
        prismaDatabase.addTokenToUserByClaimCode.mockClear();
    });
    it('returns empty for /v1/claim when db errors', async () => {
        // inject mock
        prismaDatabase.addTokenToUserByClaimCode.mockRejectedValue(new Error('bad database call'));
        // emulate the HTTP POST call
        const response = await v1_poap_claim(testRequest(mockClaim));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Internal Error' });
        expect(response.status).toStrictEqual(500);
        prismaDatabase.addTokenToUserByClaimCode.mockClear();
    });
    it('returns 400 for /v1/claim when claim code does not exist', async () => {
        // inject mock
        prismaDatabase.addTokenToUserByClaimCode.mockResolvedValue(true);
        // emulate the HTTP POST call
        const response = await v1_poap_claim(testRequest({ address: userETHAddress }));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Invalid Input' });
        expect(response.status).toStrictEqual(400);
        prismaDatabase.addTokenToUserByClaimCode.mockClear();
    });
    it('returns Invalid for /v1/claim when address not present', async () => {
        // inject mock
        prismaDatabase.addTokenToUserByClaimCode.mockResolvedValue(false);
        // emulate the HTTP POST call
        const response = await v1_poap_claim(testRequest(mockClaim));
        expect(response.ok).toBe(false);
        const tokens = await response.json();
        expect(tokens).toStrictEqual({ error: 'Claim code does not exist' });
        expect(response.status).toStrictEqual(404);
        prismaDatabase.addTokenToUserByClaimCode.mockClear();
    });
});
