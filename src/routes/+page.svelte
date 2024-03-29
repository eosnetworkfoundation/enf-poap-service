<script lang="ts">
    import { ethers } from 'ethers';
    import { goto } from '$app/navigation';
    import '../vite-env.d.ts';
    import { PoapServiceClient } from '$lib/PoapServiceClient.js';
    import type { Token } from '$lib/types.js';
    import TokenList from '../components/TokenList.svelte';
    import { userAddress } from '$lib/store.js';

    let metadata: Record<string, string> = {};
    let provider: ethers.providers.Web3Provider | null;
    let poapServiceClient: PoapServiceClient;
    let createdTokens: Token[] = [];
    let claimedTokens: Token[] = [];
    if (typeof window !== 'undefined') {
        poapServiceClient = new PoapServiceClient();
    }
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Get wallet address
                const address = await signer.getAddress();
                userAddress.set(address);
                metadata.address = `Wallet Address: ${address}`;

                // Get network type
                const network = await provider.getNetwork();
                metadata.network = `Network: ${network.name}`;

                // Get account balance
                const balanceWei = await provider.getBalance(address);
                const balanceEther = ethers.utils.formatEther(balanceWei);
                metadata.balance = `Balance: ${balanceEther} ETH`;
                loadClaimedTokens(address);
                loadCreatedTokens(address);
            } catch (error) {
                console.error('User rejected the connection request', error);
            }
        } else {
            metadata.message =
                'MetaMask is not installed. Please install MetaMask to connect your wallet.';
        }
    }

    function logoutWallet() {
        provider = null;
        metadata = {};
        window.ethereum.removeAllListeners(); // Remove any listeners to prevent memory leaks
    }

    function navigateToClaimToken() {
        goto('/claim-token');
    }

    function navigateToCreateToken() {
        goto('/create-token');
    }

    function loadCreatedTokens(address: string) {
        poapServiceClient.getCreatedTokens(address).then((tokens) => {
            createdTokens = tokens;
        });
    }

    function loadClaimedTokens(address: string) {
        poapServiceClient.getClaimedTokens(address).then((tokens) => {
            claimedTokens = tokens;
        });
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="p-8 bg-white shadow-xl rounded-lg">
        <h2 class="mb-4 text-xl font-semibold text-green-700">ENF's POAP Center</h2>
        <button
            on:click={connectWallet}
            class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Connect MetaMask Wallet</button
        >
        <button
            on:click={logoutWallet}
            class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Logout</button
        >
        <p class="mb-4 text-sm text-gray-700">{metadata.address}</p>
        <p class="mb-4 text-sm text-gray-700">{metadata.network}</p>
        <p class="mb-4 text-sm text-gray-700">{metadata.balance}</p>
        <button
            on:click={navigateToClaimToken}
            class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Claim Token</button
        >
        <button
            on:click={navigateToCreateToken}
            class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >Create Token</button
        >
        <TokenList tokenList={createdTokens} title="Created Tokens" />
        <TokenList tokenList={claimedTokens} title="Claimed Tokens" />
    </div>
</div>
