import type { Language } from "@/i18n/ui";

export function localizedPath(language: Language, path: `/${string}`): string {
	const base = import.meta.env.BASE_URL;
	const localized = language === "fr" ? path : `/en${path}`;
	return `${base}${localized}`;
}
