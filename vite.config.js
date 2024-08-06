import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import {resolve} from 'path';

export default defineConfig({
    build: {
        outDir: './dist/web-components',
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, './projects/web-components/src/web-components-entry.js'),
            name: 'StandaloneElement',
            fileName: 'bundle',
            formats: ['iife']
        },
        rollupOptions: {
            external: ['@angular/core', '@angular/common', '@angular/platform-browser'],
            output: {
                globals: {
                    '@angular/core': 'ng.core',
                    '@angular.common': 'ng.common',
                    '@angular.platform-browser': 'ng.platformBrowser'
                }
            }
        },
        minify: 'terser'
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {src: './projects/web-components/package.json', dest: ''},
                {src: './projects/web-components/src/public-api.ts', dest: ''}
            ]
        })
    ]
});
