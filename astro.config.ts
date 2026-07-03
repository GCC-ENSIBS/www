import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import astroBrokenLinksChecker from "astro-broken-links-checker";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "unocss/astro";

export default defineConfig({
	site: "https://gcc-ensibs.fr",
	scopedStyleStrategy: "where",
	prefetch: {
		defaultStrategy: "hover",
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
	i18n: {
		locales: ["fr", "en"],
		defaultLocale: "fr",
		fallback: {
			en: "fr",
		},
		routing: {
			prefixDefaultLocale: false,
			fallbackType: "rewrite",
		},
	},
	integrations: [
		UnoCSS(),
		expressiveCode(),
		mdx(),
		sitemap(),
		pagefind(),
		robotsTxt(),
		astroBrokenLinksChecker({
			checkExternalLinks: true,
			throwError: false,
		}),
	],
});
