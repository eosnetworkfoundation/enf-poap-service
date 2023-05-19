<script lang="ts">
    import Web3 from "web3";
    import { goto } from '$app/navigation';
    
    let metadata = {};
    let web3;

    async function connectWallet() {
        if (typeof window.ethereum !== "undefined") {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const accounts = await web3.eth.getAccounts();

                // Get wallet address
                const address = accounts[0];
                metadata.address = `Wallet Address: ${address}`;

                // Get network type
                const networkType = await web3.eth.net.getNetworkType();
                metadata.network = `Network: ${networkType}`;

                // Get account balance
                const balanceWei = await web3.eth.getBalance(address);
                const balanceEther = web3.utils.fromWei(balanceWei);
                metadata.balance = `Balance: ${balanceEther} ETH`;

            } catch (error) {
                console.error("User rejected the connection request", error);
            }
        } else {
            metadata.message = "MetaMask is not installed. Please install MetaMask to connect your wallet.";
        }
    }

    function logoutWallet() {
        if (web3) {
            web3 = null;
            metadata = {};
            window.ethereum.removeAllListeners(); // Remove any listeners to prevent memory leaks
        }
    }

    function navigateToClaimToken() {
        goto('/claim-token')
    }

    function navigateToCreateToken() {
        goto('/create-token')
    }

</script>

<div class="p-8 bg-white shadow-xl rounded-lg transform transition-transform hover:scale-105">
    <h2 class="mb-4 text-xl font-semibold text-green-700">ENF's POAP Center</h2>
    <button on:click={connectWallet} class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Connect MetaMask Wallet</button>
    <button on:click={logoutWallet} class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Logout</button>
    <p class="mb-4 text-sm text-gray-700">{metadata.address}</p>
    <p class="mb-4 text-sm text-gray-700">{metadata.network}</p>
    <p class="mb-4 text-sm text-gray-700">{metadata.balance}</p>
    <button on:click={navigateToClaimToken} class="w-full px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Claim Token</button>
    <button on:click={navigateToCreateToken} class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Create Token</button>
</div>