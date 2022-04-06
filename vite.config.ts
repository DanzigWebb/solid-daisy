import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/main.ts'),
            formats: ["cjs", "es"],
            fileName: (format) => `my-lib.${format}.js`,
        },
        rollupOptions: {
            external: ['solid-js'],
        },
    },
    resolve: {
        alias: {
            '@root': __dirname,
            '@components': path.resolve(__dirname, 'src', 'lib', 'components'),
            '@shared': path.resolve(__dirname, 'src', 'shared'),
            '@views': path.resolve(__dirname, 'src', 'views'),
        }
    },
});
