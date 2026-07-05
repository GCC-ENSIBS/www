export const languages = {
	fr: "Français",
	en: "English",
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = "fr";

export function getLanguageFromLocale(locale: string | undefined): Language {
	return locale && locale in languages ? (locale as Language) : defaultLanguage;
}

const french = {
	"page.home.title": "GCC — Club cyber de l'ENSIBS, Vannes",
	"page.home.description":
		"Club cyber de l'ENSIBS à Vannes. 150+ membres, GCC-CTF 500+, contribution aux challenges du BreizhCTF 2026, workshops mensuels ouverts à tous.",

	"navigation.blog": "Blog",
	"navigation.contact": "Contact",

	"theme.toggle": "Changer de thème",

	"skip.content": "Aller au contenu",

	"menu.open": "Ouvrir le menu",

	"hero.kicker": "Le club cyber de l'ENSIBS, à Vannes.",
	"hero.line1": "On organise.",
	"hero.line2": "On transmet.",
	"hero.line3": "On joue",
	"hero.description":
		"150 membres, deux CTF par an, des workshops chaque mois. On apprend en faisant, avec des débutants comme des habitués.",
	"hero.callToAction.blog": "Lire les writeups",

	"marginalia.hero": "Le club",
	"marginalia.capabilities": "Ce qu'on fait",
	"marginalia.join": "Rejoindre",
	"marginalia.navigation": "Index de page",

	"sponsor.title": "Ce qu'on fait",
	"sponsor.lead":
		"Fondé en avril 2021, GCC rassemble plus de 150 étudiants. On organise des CTF, on crée des challenges, et on anime un workshop mensuel ouvert à tous les membres.",
	"sponsor.statisticsSummary":
		"Aujourd'hui : 150+ membres, 500+ participants au GCC-CTF, la moitié des challenges du BreizhCTF 2026, et un workshop chaque mois.",
	"sponsor.eventsTitle": "Nos événements et contributions",
	"sponsor.events.breizhCtf.name": "BreizhCTF 2026",
	"sponsor.events.breizhCtf.description":
		"Co-création des challenges avec l'ESNA. La moitié des challenges sont signés GCC.",
	"sponsor.events.gccCtf.name": "GCC-CTF",
	"sponsor.events.gccCtf.description":
		"CTF en ligne, 500+ participants, challenges et plateforme gérés par le club.",
	"sponsor.events.noBracketsCtf.name": "NoBracketsCTF",
	"sponsor.events.noBracketsCtf.description":
		"CTF pour lycéens, avec une attention particulière à l'inclusion féminine.",
	"sponsor.events.workshops.name": "Workshops mensuels",
	"sponsor.events.workshops.description":
		"Ouverts à tous les membres, pas seulement aux anciens. On y prépare des sujets concrets et progressifs.",
	"sponsor.contactLead":
		"Devenez sponsor de notre prochain événement et soutenez les challenges, l'infrastructure ou les prix.",
	"sponsor.contactLink": "Devenir sponsor",

	"student.title": "Rejoins-nous à ton rythme",
	"student.lead":
		"Débutant ou déjà à l'aise, tu peux venir aux workshops, poser tes questions, jouer les CTF et aider à organiser quand tu te sens prêt.",

	"footer.colophon": "Club cyber · ENSIBS · Vannes",
} as const;

const english = {
	"page.home.title": "GCC — Cyber club of ENSIBS, Vannes",
	"page.home.description":
		"Cyber club of ENSIBS in Vannes. 150+ members, GCC-CTF 500+, contribution to BreizhCTF 2026 challenges, monthly workshops open to all.",

	"navigation.blog": "Blog",
	"navigation.contact": "Contact",

	"theme.toggle": "Toggle theme",

	"skip.content": "Skip to content",

	"menu.open": "Open menu",

	"hero.kicker": "The cyber club of ENSIBS, in Vannes.",
	"hero.line1": "We organise.",
	"hero.line2": "We pass it on.",
	"hero.line3": "We play",
	"hero.description":
		"150 members, two CTFs a year, monthly workshops. We learn by doing, with newcomers and regulars.",
	"hero.callToAction.blog": "Read the writeups",

	"marginalia.hero": "The club",
	"marginalia.capabilities": "What we do",
	"marginalia.join": "Join",
	"marginalia.navigation": "Page index",

	"sponsor.title": "What we do",
	"sponsor.lead":
		"Founded in April 2021, GCC gathers more than 150 students. We run CTFs, create challenges, and host a monthly workshop open to every member.",
	"sponsor.statisticsSummary":
		"Today: 150+ members, 500+ attendees at GCC-CTF, half of the BreizhCTF 2026 challenges, and one workshop every month.",
	"sponsor.eventsTitle": "Our events and contributions",
	"sponsor.events.breizhCtf.description":
		"Co-creating challenges with ESNA. Half the challenges are signed GCC.",
	"sponsor.events.gccCtf.description":
		"Online CTF, 500+ attendees, with challenges and platform run by the club.",
	"sponsor.events.noBracketsCtf.description":
		"CTF for high-school students, with deliberate attention to female inclusion.",
	"sponsor.events.workshops.name": "Monthly workshops",
	"sponsor.events.workshops.description":
		"Open to every member, not just the seniors. Sessions focus on concrete, progressive topics.",
	"sponsor.contactLead":
		"Become a sponsor of our next event and support challenges, infrastructure, or prizes.",
	"sponsor.contactLink": "Become a sponsor",

	"student.title": "Join us at your own pace",
	"student.lead":
		"Whether you are new or already comfortable, you can join workshops, ask questions, play CTFs, and help organize when you feel ready.",

	"footer.colophon": "Cyber club · ENSIBS · Vannes",
} satisfies Partial<Record<keyof typeof french, string>>;

export const ui = {
	fr: french,
	en: english,
} as const;

export type UIKey = keyof typeof french;

export function translate(language: Language | undefined, key: UIKey): string {
	const dictionary: Partial<Record<UIKey, string>> =
		ui[language ?? defaultLanguage] ?? french;

	return dictionary[key] ?? french[key] ?? key;
}

export function useTranslations(language: Language | undefined) {
	return (key: UIKey) => translate(language, key);
}
