<script lang="ts">
    let claimCode: string;
    let message: string;

    function submit(): void {
        if (claimCode === "password") {
            message = "Success!";
        } else {
            message = "Claim Code does not exist.";
        }
    }

    // TODO: create func to check if claim code is in DB
    function isValidClaimCode(claimCode: string): boolean {
        return true;
    }

</script>

<div class="flex justify-center items-center min-h-screen">
<div class="p-8 bg-white shadow-xl rounded-lg">
    <h2 class="mb-4 text-xl font-semibold text-green-700">Claim Token</h2>
    <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"></label>
        <input type="text" bind:value={claimCode} placeholder="Enter your claim code" class="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition-colors">
    </div>
    <button on:click={submit} class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Submit</button>
    {#if message}
        <div class="mt-4 p-2 text-center text-white rounded-md {message === 'Success!' ? 'bg-green-500' : 'bg-red-500'} transition-colors">
            {message}
        </div>
    {/if}
</div>
</div>
