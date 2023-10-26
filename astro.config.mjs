import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  renderers: ['@astrojs/renderer-svelte', '@astrojs/renderer-react'],
  integrations: [tailwind(), react(), svelte()]
});