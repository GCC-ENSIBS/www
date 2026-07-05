import type { Language } from "@/i18n/ui";

export function localizedPath(language: Language, path: `/${string}`): string {
	return language === "fr" ? path : `/en${path}`;
}
