<script lang="ts">
    import Swal from 'sweetalert2';
    import type { Token } from '@prisma/client';
    import type { ExternalProvider } from '@ethersproject/providers';
    import { goto } from '$app/navigation';
    import { PoapServiceClient } from '$lib/PoapServiceClient.js';

    import { mintToken } from '../../utils/claim/claim';
    import type { POAPInputs } from '../../utils/claim/claim';

    let poapServiceClient: PoapServiceClient;
    let claimCode: string;

    if (typeof window !== 'undefined') {
        poapServiceClient = new PoapServiceClient();
    }

    async function submit(): Promise<void> {
        const claimCodeDetails = await isValidClaimCode(claimCode);
        if (claimCodeDetails.length && window.ethereum) {
            const externalProvider: ExternalProvider = window.ethereum;
            const poapInputs: POAPInputs = {
                title: claimCodeDetails[0].name,
                description: claimCodeDetails[0].description,
                url: claimCodeDetails[0].imageUrl,
            };

            await mintToken(poapInputs, externalProvider);
            goto(`/tokens/${claimCode}`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Claim code does not exist.',
                confirmButtonColor: 'crimson',
            });
        }
    }

    async function isValidClaimCode(claimCode: string): Promise<Token[]> {
        try {
            const claimCodeResults = await poapServiceClient.getToken(claimCode);
            return claimCodeResults;
        } catch (err) {
            throw new Error(`Failed to validate the claim code: ${err}`);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="p-8 bg-white shadow-xl rounded-lg">
        <h2 class="mb-4 text-xl font-semibold text-green-700">Claim Token</h2>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">
                <input
                    type="text"
                    bind:value={claimCode}
                    placeholder="Enter your claim code"
                    class="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition-colors"
                />
            </label>
        </div>
        <button
            on:click={submit}
            class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Submit</button
        >
    </div>
</div>
