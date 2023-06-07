<script lang="ts">
    import Swal from 'sweetalert2';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { PoapServiceClient } from '$lib/PoapServiceClient.js';
    import type { Token } from '$lib/types';
    import { userAddress } from '$lib/store.js';

    let claimCode: string;
    let name: string;
    let description: string;
    let imageUrl: string;
    let poapServiceClient: PoapServiceClient;
    let currentAddress: string | null;

    userAddress.subscribe((value) => {
        currentAddress = value;
    });

    $: claimCode = $page.params.claimCode;

    onMount(async () => {
        if (typeof window !== 'undefined') {
            poapServiceClient = new PoapServiceClient();
        }
        loadToken(claimCode);
    });

    function submit(): void {
        // TODO: add database write
        if (currentAddress !== null) {
            poapServiceClient.claimToken(currentAddress, claimCode);
        } else {
            console.error('Please connect MetaMask wallet.');
        }

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'POAP claimed!',
            confirmButtonColor: 'green',
        });
    }

    function loadToken(claimCode: string) {
        poapServiceClient.getToken(claimCode).then((tokens) => {
            try {
                let token = tokens[0];
                name = token.name;
                description = token.description;
                imageUrl = token.imageUrl;
            } catch (error) {
                console.error('Server interrupted. Please try again.');
            }
        });
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="p-8 bg-white shadow-xl rounded-lg">
        <h2 class="mb-4 text-xl font-semibold text-green-700">{name}</h2>
        <img src={imageUrl} alt={name} class="w-full h-64 object-cover mt-4" />
        <p class="mb-4 text-sm text-gray-700">{description}</p>
        <button
            on:click={submit}
            class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Submit</button
        >
    </div>
</div>
