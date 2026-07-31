export const languages = {
	fr: "Français",
	en: "English",
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = "fr";

export function getLanguageFromLocale(locale: string | undefined): Language {
	return locale && locale in languages ? (locale as Language) : defaultLanguage;
}

export function languageLocale(language: Language): string {
	return language === "fr" ? "fr-FR" : "en";
}

const french = {
	"page.home.title": "GCC - Apprendre la cybersécurité ensemble",
	"page.home.description":
		"GCC est un club cyber ouvert aux membres de l'ENSIBS : workshops, writeups, CTFs et événements depuis avril 2021.",

	"navigation.blog": "Blog",
	"navigation.contact": "Contact",
	"navigation.brandSubtitle": "Club cyber de l'ENSIBS",
	"navigation.primary": "Navigation principale",
	"navigation.footer": "Pied de page",
	"navigation.join": "Liens pour rejoindre GCC",
	"navigation.social": "Réseaux sociaux",
	"navigation.external": "ouvre dans un nouvel onglet",

	"theme.toggle": "Changer de thème",

	"skip.content": "Aller au contenu",

	"menu.open": "Ouvrir le menu",
	"menu.close": "Fermer le menu",

	"hero.kicker": "GCC · Cyber club · ENSIBS",
	"hero.line1": "Apprendre la",
	"hero.line2": "cybersécurité",
	"hero.line3": "ensemble",
	"hero.description":
		"On apprend. On partage. On construit des workshops, des writeups, des CTFs et des événements depuis avril 2021.",
	"hero.callToAction.blog": "Lire les writeups",
	"hero.callToAction.discord": "Rejoindre le Discord",
	"hero.panel.title": "Une communauté ouverte.",
	"hero.panel.lead":
		"Workshops mensuels, rumps régulières, writeups et événements construits ensemble.",
	"hero.panel.members": "membres",
	"hero.panel.workshop": "workshop",
	"hero.panel.ctf": "GCC-CTF",
	"hero.panel.writeups": "writeups",

	"marginalia.hero": "Le club",
	"marginalia.capabilities": "Ce qu'on fait",
	"marginalia.join": "Rejoindre",
	"marginalia.navigation": "Index de page",

	"activity.intro.title": "Un club où l'on apprend ensemble.",
	"activity.intro.lead":
		"GCC est ouvert aux membres de l'ENSIBS, quel que soit leur niveau. On vient pour apprendre, puis on transmet à notre tour.",
	"activity.rhythm.title": "Ce qui fait vivre GCC",
	"activity.rhythm.lead":
		"On se retrouve pour apprendre, résoudre, présenter et documenter ce qu'on découvre.",
	"activity.rhythm.talks.label": "Rumps",
	"activity.rhythm.talks.detail": "présenter ce qu'on découvre",
	"activity.rhythm.workshops.label": "Workshops",
	"activity.rhythm.workshops.detail": "progresser ensemble chaque mois",
	"activity.rhythm.ctfs.label": "CTFs",
	"activity.rhythm.ctfs.detail": "jouer, créer, animer",
	"activity.rhythm.notes.label": "Retex",
	"activity.rhythm.notes.detail": "documenter pour transmettre",
	"activity.events.title": "Des événements faits maison",
	"activity.events.lead":
		"On prépare des sujets, on écrit des challenges, on tient l'infra et on anime les sessions nous-mêmes.",
	"activity.events.summary":
		"C'est ce savoir-faire qui nous permet d'organiser GCC-CTF et de contribuer à des événements comme le BreizhCTF.",
	"activity.events.breizhCtf.name": "BreizhCTF 2026",
	"activity.events.breizhCtf.description":
		"Co-création des challenges avec l'ESNA. La moitié des challenges sont signés GCC.",
	"activity.events.gccCtf.name": "GCC-CTF",
	"activity.events.gccCtf.description":
		"CTF en ligne, 500+ participants, challenges et plateforme gérés par le club.",
	"activity.events.noBracketsCtf.name": "NoBracketsCTF",
	"activity.events.noBracketsCtf.description":
		"CTF pour lycéens, avec une attention particulière à l'inclusion féminine.",
	"activity.events.workshops.name": "Workshops mensuels",
	"activity.events.workshops.description":
		"Ouverts à tous les membres, pas seulement aux anciens. On y prépare des sujets concrets et progressifs.",
	"activity.contactLead":
		"Pour une intervention, un événement ou une contribution matérielle, le plus simple est d'échanger directement avec le bureau.",
	"activity.contactLink": "Contacter le bureau",

	"join.title": "Rejoins-nous",
	"join.lead":
		"Si tu es membre de l'ENSIBS, viens apprendre avec nous. Pas besoin d'être déjà fort : les workshops sont faits pour progresser ensemble.",
	"join.discord": "Rejoindre le Discord",

	"home.latest.title": "Dernières nouvelles du club.",
	"home.latest.lead":
		"News, writeups et retours d'événements. Le blog montre ce qu'on prépare, ce qu'on apprend et ce qu'on partage.",

	"blog.title": "GCC - Blog",
	"blog.description":
		"Writeups, news, retours d'événements et articles techniques de GCC.",
	"blog.heading": "Blog.",
	"blog.lead": "Writeups, news et retours d'expérience publiés par le club.",
	"blog.searchLabel": "Rechercher dans les articles",
	"blog.search": "Rechercher un writeup…",
	"blog.categories": "Catégories",
	"blog.all": "Tout",
	"blog.noResults": "Aucun article ne correspond à ta recherche.",
	"blog.noResultsHint":
		"Essaie un autre mot-clé, change de catégorie ou reviens à toute la collection.",
	"blog.resultsStatus": "articles affichés",
	"blog.readArticle": "Lire l'article",
	"blog.back": "Retour au blog",
	"blog.meta.date": "Date",
	"blog.meta.read": "Lecture",
	"blog.meta.author": "Auteur",
	"blog.meta.sections": "Sections",

	"contact.title": "GCC - Contact",
	"contact.description":
		"Rejoindre GCC, contacter le bureau ou proposer un événement au club cyber de l'ENSIBS.",
	"contact.heading": "Une question, un workshop, un événement ?",
	"contact.lead":
		"Pour rejoindre le club, le Discord est le plus simple. Pour une intervention, un événement ou une contribution ponctuelle, écris directement au bureau.",
	"contact.discord": "Rejoindre le Discord",
	"contact.mail": "Écrire au bureau",
	"contact.boardCard": "Écris au bureau.",
	"contact.students": "Étudiants ENSIBS",
	"contact.studentsText":
		"Tu peux venir apprendre avec GCC quel que soit ton niveau. Les workshops sont faits pour progresser ensemble.",
	"contact.events": "Événements",
	"contact.eventsText":
		"On échange en direct pour les interventions, challenges, contributions matérielles ou soutiens ponctuels.",

	"notFound.title": "GCC - Page introuvable",
	"notFound.description": "Cette page GCC est introuvable.",
	"notFound.heading": "Page introuvable.",
	"notFound.lead":
		"Ce challenge n'est pas publié ici. Reviens à l'accueil ou parcours les writeups du club.",
	"notFound.home": "Retour à l'accueil",
	"notFound.blog": "Lire le blog",

	"footer.description":
		"Un club cyber ouvert aux membres de l'ENSIBS : workshops, writeups, CTFs et événements.",
	"footer.colophon": "ENSIBS · Vannes",
} as const;

const english = {
	"page.home.title": "GCC - Learning cybersecurity together",
	"page.home.description":
		"GCC is a cybersecurity club open to ENSIBS members, with workshops, writeups, CTFs and events active since April 2021.",

	"navigation.blog": "Blog",
	"navigation.contact": "Contact",
	"navigation.brandSubtitle": "ENSIBS cybersecurity club",
	"navigation.primary": "Primary navigation",
	"navigation.footer": "Footer",
	"navigation.join": "Join GCC links",
	"navigation.social": "Social links",
	"navigation.external": "opens in a new tab",

	"theme.toggle": "Toggle theme",

	"skip.content": "Skip to content",

	"menu.open": "Open menu",
	"menu.close": "Close menu",

	"hero.kicker": "GCC · Cyber club · ENSIBS",
	"hero.line1": "Learning",
	"hero.line2": "cybersecurity",
	"hero.line3": "together",
	"hero.description":
		"We learn. We share. We have been building workshops, writeups, CTFs and events since April 2021.",
	"hero.callToAction.blog": "Read the writeups",
	"hero.callToAction.discord": "Join Discord",
	"hero.panel.title": "An open community.",
	"hero.panel.lead":
		"Monthly workshops, regular talks, writeups and events built together.",
	"hero.panel.members": "members",
	"hero.panel.workshop": "workshop",
	"hero.panel.ctf": "GCC-CTF",
	"hero.panel.writeups": "writeups",

	"marginalia.hero": "The club",
	"marginalia.capabilities": "What we do",
	"marginalia.join": "Join",
	"marginalia.navigation": "Page index",

	"activity.intro.title": "A club where people learn together.",
	"activity.intro.lead":
		"GCC is open to ENSIBS members, whatever their level. People come to learn, then pass it on.",
	"activity.rhythm.title": "What keeps GCC alive",
	"activity.rhythm.lead":
		"We meet to learn, solve, present and document what we discover.",
	"activity.rhythm.talks.label": "Talks",
	"activity.rhythm.talks.detail": "share what we discover",
	"activity.rhythm.workshops.label": "Workshops",
	"activity.rhythm.workshops.detail": "learn together every month",
	"activity.rhythm.ctfs.label": "CTFs",
	"activity.rhythm.ctfs.detail": "play, build and host",
	"activity.rhythm.notes.label": "Notes",
	"activity.rhythm.notes.detail": "document to pass it on",
	"activity.events.title": "Events built in-house",
	"activity.events.lead":
		"We prepare topics, write challenges, run infrastructure and host sessions ourselves.",
	"activity.events.summary":
		"That know-how lets us run GCC-CTF and contribute to larger events such as BreizhCTF.",
	"activity.events.breizhCtf.name": "BreizhCTF 2026",
	"activity.events.breizhCtf.description":
		"Co-creating challenges with ESNA. Half the challenges are signed GCC.",
	"activity.events.gccCtf.name": "GCC-CTF",
	"activity.events.gccCtf.description":
		"Online CTF, 500+ attendees, with challenges and platform run by the club.",
	"activity.events.noBracketsCtf.name": "NoBracketsCTF",
	"activity.events.noBracketsCtf.description":
		"CTF for high-school students, with deliberate attention to female inclusion.",
	"activity.events.workshops.name": "Monthly workshops",
	"activity.events.workshops.description":
		"Open to every member, not just the seniors. Sessions focus on concrete, progressive topics.",
	"activity.contactLead":
		"For a talk, an event, or material support, the simplest path is to talk directly with the board.",
	"activity.contactLink": "Contact the board",

	"join.title": "Join us",
	"join.lead":
		"If you are an ENSIBS member, come learn with us. You do not need to be advanced: workshops are made to progress together.",
	"join.discord": "Join Discord",

	"home.latest.title": "Latest from the club.",
	"home.latest.lead":
		"News, writeups and event notes. The blog shows what we prepare, learn and share.",

	"blog.title": "GCC - Blog",
	"blog.description":
		"Writeups, news, event notes and technical articles from GCC.",
	"blog.heading": "Blog.",
	"blog.lead": "Writeups, news and field notes from the club.",
	"blog.searchLabel": "Search articles",
	"blog.search": "Search a writeup…",
	"blog.categories": "Categories",
	"blog.all": "All",
	"blog.noResults": "No article matches your search.",
	"blog.noResultsHint":
		"Try another keyword, switch category, or return to the full collection.",
	"blog.resultsStatus": "articles shown",
	"blog.readArticle": "Read article",
	"blog.back": "Back to blog",
	"blog.meta.date": "Date",
	"blog.meta.read": "Read",
	"blog.meta.author": "Author",
	"blog.meta.sections": "Sections",

	"contact.title": "GCC - Contact",
	"contact.description":
		"Join GCC, contact the board or propose an event to the ENSIBS cyber club.",
	"contact.heading": "A question, a workshop, an event?",
	"contact.lead":
		"To join the club, Discord is the simplest path. For a talk, an event or one-off support, email the board directly.",
	"contact.discord": "Join Discord",
	"contact.mail": "Email the board",
	"contact.boardCard": "Email the board.",
	"contact.students": "ENSIBS students",
	"contact.studentsText":
		"You can come learn with GCC whatever your level. Workshops are made to progress together.",
	"contact.events": "Events",
	"contact.eventsText":
		"We talk directly for talks, challenges, material contributions or one-off support.",

	"notFound.title": "GCC - Page not found",
	"notFound.description": "This GCC page cannot be found.",
	"notFound.heading": "Page not found.",
	"notFound.lead":
		"This challenge is not published here. Go back home or browse the club writeups.",
	"notFound.home": "Back home",
	"notFound.blog": "Read the blog",

	"footer.description":
		"A cybersecurity club open to ENSIBS members: workshops, writeups, CTFs and events.",
	"footer.colophon": "ENSIBS · Vannes",
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
