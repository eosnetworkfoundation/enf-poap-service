<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Token } from '$lib/types';
    export let token: Token;
    function navigateToToken() {
        goto(`/token/${token.id}`);
    }
</script>

<button
    class="rounded border object-center hover:bg-sky-200 h-32"
    on:click={navigateToToken}
    on:keydown={navigateToToken}
>
    <div class="flex">
        <div class="w-2/3 self-center pl-4 overflow-hidden">
            <h3 class="text-left text-lg font-bold">{token.name}</h3>
            <p class="text-left">{token.description}</p>
        </div>
        <div class="w-1/3">
            <div class="w-24 h-24 rounded-full overflow-hidden">
                <img class="object-cover w-full h-full" src={token.imageUrl} alt={token.name} />
            </div>
        </div>
    </div>
</button>
