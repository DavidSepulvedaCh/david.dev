import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://davidsepulvedach.github.io',
    base: '/david.dev/',
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'es',
                locales: { es: 'es-CO', en: 'en-US' },
            },
        }),
    ],
});
