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
				light: "min-light",
				dark: "dracula",
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
		expressiveCode({
			themes: {
				light: "min-light",
				dark: "dracula",
			},
			styleOverrides: {
				borderRadius: "4px",
				codeFontFamily:
					"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
				codeFontSize: "13px",
				codeLineHeight: "1.6",
				codePaddingInline: "1rem",
				codePaddingBlock: "0.75rem",
				borderWidth: "0px",
				backgroundColor: "transparent",
			},
		}),
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
