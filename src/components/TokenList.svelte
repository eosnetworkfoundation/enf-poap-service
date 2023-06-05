<script lang="ts">
    import type { Token } from '$lib/types';
    import TokenComponent from './Token.svelte';

    export let tokenList: Token[];
    export let title: string;
</script>

<div class="w-full">
    <h2 class="mb-4 text-xl font-semibold text-green-700">{title}</h2>
    {#if tokenList.length === 0}
        <p class="mb-4 text-sm text-gray-700">No tokens found</p>
    {/if}
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        {#each tokenList as tokenMetadata}
            <TokenComponent token={tokenMetadata} />
        {/each}
    </div>
</div>
