<script lang="ts">
    import Swal from 'sweetalert2';
    let claimCode: string;

    function submit(): void {
        if (isValidClaimCode(claimCode)) {
            Swal.fire({
                title: 'Success!',
                html: 'You have claimed the POAP!',
                icon: 'success',
                confirmButtonColor: '#48BB78',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Claim code does not exist.',
                confirmButtonColor: 'crimson'
            })
        }
    }

    // TO-DO: create func to check if claim code is in DB
    function isValidClaimCode(claimCode: string): boolean {
        return claimCode === 'password';
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
