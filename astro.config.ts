import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://gcc-ensibs.fr",
	trailingSlash: "always",
	scopedStyleStrategy: "where",
	prefetch: {
		defaultStrategy: "hover",
	},
	i18n: {
		locales: ["fr", "en"],
		defaultLocale: "fr",
		fallback: {
			en: "fr",
		},
		routing: {
			fallbackType: "rewrite",
		},
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			defaultColor: false,
			wrap: true,
		},
	},
});
