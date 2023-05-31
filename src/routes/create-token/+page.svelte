<script lang="ts">
    import Swal from 'sweetalert2';

    let name = '';
    let description = '';
    let file: File | null = null;

    function handleFileUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            file = target.files[0];
        }
    }

    async function submit() {
        if (!name || !description || !file) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields and upload an image.',
                confirmButtonColor: 'crimson'
            })
            return;
        }

        // TODO: Here we would normally send the data to our DB backend
        // For now, we will just simulate a successful submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Swal.fire({
            title: 'Success!',
            html: 'Claim Code: <a href="https://example.com" style="color: blue;">www.example-url-link.com</a>',
            icon: 'success',
            confirmButtonColor: '#48BB78',
        });
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="p-8 bg-white shadow-xl rounded-lg">
        <h2 class="mb-4 text-xl font-semibold text-green-700">Create POAP Token</h2>
        <form class="grid gap-6 mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">
                Token Name:
                <input
                    type="text"
                    bind:value={name}
                    placeholder="Enter your token name"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
            </label>
            <label class="block mb-2 text-sm font-medium text-gray-600">
                Token Description:
                <textarea
                    bind:value={description}
                    placeholder="Enter your token description"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
            </label>
            <label class="block mb-2 text-sm font-medium text-gray-600">
                Token Image:
                <input
                    type="file"
                    on:change={handleFileUpload}
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
            </label>
            <button
                on:click|preventDefault={submit}
                class="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                >Submit</button
            >
        </form>
    </div>
</div>
