// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourwillpro.com.au',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap(),
  ],
});
```

Save, then:
```
git add .
git commit -m "Fix Astro config"
git push