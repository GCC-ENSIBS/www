import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetWebFonts,
	presetWind4,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import { presetAnimations } from "unocss-preset-animations";

export default defineConfig({
	safelist: [
		"animate-in",
		"fade-in",
		"slide-in-from-bottom-2",
		"slide-in-from-bottom-3",
		"animate-duration-400",
		"animate-duration-500",
	],
	theme: {
		colors: {
			brand: {
				DEFAULT: "oklch(58% 0.22 27)",
				bright: "oklch(68% 0.24 27)",
				deep: "oklch(50% 0.20 27)",
				dim: "oklch(58% 0.22 27 / 0.15)",
				glow: "oklch(58% 0.22 27 / 0.25)",
			},
			signal: {
				yellow: "oklch(88% 0.18 95)",
				blue: "oklch(56% 0.16 255)",
			},
			ink: {
				DEFAULT: "oklch(14% 0.012 270)",
				raised: "oklch(18% 0.014 270)",
				card: "oklch(23% 0.014 270)",
				sunken: "oklch(10% 0.012 270)",
				muted: "oklch(71% 0.012 270)",
				subtle: "oklch(62% 0.012 270)",
			},
			surface: {
				DEFAULT: "oklch(94% 0.006 270)",
				muted: "oklch(72% 0.008 270)",
				subtle: "oklch(54% 0.009 270)",
			},
			paper: {
				DEFAULT: "oklch(97% 0.004 270)",
				raised: "oklch(94% 0.006 270)",
				sunken: "oklch(91% 0.008 270)",
			},
			foreground: {
				DEFAULT: "oklch(20% 0.012 270)",
				muted: "oklch(39% 0.012 270)",
				subtle: "oklch(48% 0.012 270)",
			},
			border: {
				DEFAULT: "oklch(55% 0.012 270 / 0.45)",
				strong: "oklch(55% 0.012 270 / 0.7)",
			},
		},
		fontFamily: {
			display: ['"Archivo"', '"Hanken Grotesk"', "system-ui", "sans-serif"],
			sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
		},
	},
	presets: [
		presetWind4({
			preflights: {
				reset: true,
			},
			dark: "class",
		}),
		presetWebFonts({
			provider: "google",
			fonts: {
				display: {
					name: "Archivo",
					weights: [500, 600, 700, 800, 900],
				},
				sans: {
					name: "Hanken Grotesk",
					weights: [400, 500, 600, 700],
				},
			},
		}),
		presetAnimations({
			duration: 400,
			fillMode: "both",
			timingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
		}),
		presetTypography(),
		presetIcons({
			scale: 1.2,
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
