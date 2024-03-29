import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
        coverage: {
            reportsDirectory: `src/tests/coverage`,
        },
    },
    resolve: {
        alias: {
            buffer: 'buffer/', // 'Buffer' efficiently manipulates binary data in Ethereum transactions.
        },
    },
});
