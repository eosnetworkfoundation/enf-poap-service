import { writable } from 'svelte/store';

export const userAddress = writable<string | null>(null);