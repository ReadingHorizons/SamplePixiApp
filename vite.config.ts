import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            output: {
                dir: `dist`,
                assetFileNames: `js/[name].[ext]`,
                chunkFileNames: `js/[name].js`,
                entryFileNames: `js/[name].js`,
                name: "Decoding",
            }
        },
        sourcemap: true,
    },
    server: {
        port: 3030,
        open: true,
    }
})