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
				DEFAULT: "oklch(62% 0.22 27)",
				bright: "oklch(68% 0.24 27)",
				deep: "oklch(50% 0.20 27)",
				dim: "oklch(62% 0.22 27 / 0.15)",
				glow: "oklch(62% 0.22 27 / 0.25)",
			},
			ink: {
				DEFAULT: "oklch(15% 0.005 270)",
				raised: "oklch(18% 0.006 270)",
				sunken: "oklch(12% 0.004 270)",
				muted: "oklch(55% 0.005 270)",
				subtle: "oklch(48% 0.005 270)",
			},
			surface: {
				DEFAULT: "oklch(92% 0.005 270)",
				muted: "oklch(55% 0.005 270)",
				subtle: "oklch(48% 0.005 270)",
			},
			paper: {
				DEFAULT: "oklch(97% 0.002 270)",
				raised: "oklch(95% 0.003 270)",
				sunken: "oklch(93% 0.004 270)",
			},
			fg: {
				DEFAULT: "oklch(20% 0.005 270)",
				muted: "oklch(45% 0.005 270)",
				subtle: "oklch(52% 0.005 270)",
			},
			border: {
				DEFAULT: "oklch(55% 0.005 270 / 0.7)",
				strong: "oklch(55% 0.005 270 / 0.8)",
			},
		},
		fontFamily: {
			display: ['"Spectral"', "Georgia", "serif"],
			sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
			mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
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
					name: "Spectral",
					weights: [400, 500, 600, 700],
					italic: true,
				},
				sans: {
					name: "Hanken Grotesk",
					weights: [400, 500, 600, 700],
				},
				mono: {
					name: "JetBrains Mono",
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
