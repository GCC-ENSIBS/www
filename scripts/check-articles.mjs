/**
 * Enforces the shape every blog article shares, on top of what the content
 * collection schema already validates at build time: file layout, locale
 * parity, frontmatter ordering, heading hierarchy and image alternatives.
 *
 * The schema in src/content.config.ts owns the meaning of the frontmatter
 * values; this script owns their form, so an article can be checked without
 * running a build.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	fences,
	prose,
	readFrontmatter,
	splitFrontmatter,
	withoutInlineCode,
} from "./lib/markdown.mjs";
import { createReporter } from "./lib/reporter.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const blogDirectory = join(repositoryRoot, "src/content/blog");

/** Mirrors the locales declared in astro.config.ts. */
const locales = ["fr", "en"];

/** Frontmatter keys, in the order every article writes them. */
const keyOrder = [
	"authors",
	"title",
	"description",
	"publicationDate",
	"updatedDate",
	"cover",
	"coverAlt",
	"categories",
	"tags",
];

const requiredKeys = [
	"authors",
	"title",
	"description",
	"publicationDate",
	"categories",
	"tags",
];

/**
 * Keys that must stay identical across the translations of an article: they
 * are what pairs the two versions together and what the UI reads.
 */
const structuralKeys = ["publicationDate", "updatedDate", "cover"];

/**
 * Keys that should stay identical but describe editorial choices, so a
 * divergence is reported without failing the run.
 */
const editorialKeys = ["authors", "categories", "tags"];

const articleExtension = /\.mdx?$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const reporter = createReporter("Articles");

function readArticles() {
	const articles = [];

	for (const locale of locales) {
		const directory = join(blogDirectory, locale);

		for (const entry of readdirSync(directory)) {
			const file = join(directory, entry);

			if (statSync(file).isDirectory()) {
				reporter.error(
					file,
					null,
					"Articles are flat files; nested directories are not part of the layout.",
				);

				continue;
			}

			if (!articleExtension.test(entry)) {
				reporter.error(file, null, "Articles must be .mdx (or .md) files.");

				continue;
			}

			articles.push({
				file,
				locale,
				slug: entry.replace(articleExtension, ""),
				raw: readFileSync(file, "utf8"),
			});
		}
	}

	return articles;
}

function checkFileHygiene({ file, slug, raw }) {
	if (!slugPattern.test(slug)) {
		reporter.error(
			file,
			null,
			`Slug "${slug}" must be lowercase kebab-case: it is the article URL.`,
		);
	}

	if (raw.startsWith("﻿")) {
		reporter.error(file, 1, "File starts with a byte order mark.");
	}

	if (raw.includes("\r\n")) {
		reporter.error(file, null, "File uses CRLF line endings; use LF.");
	}

	if (!raw.endsWith("\n")) {
		reporter.error(file, null, "File must end with a newline.");
	} else if (raw.endsWith("\n\n")) {
		reporter.error(file, null, "File must end with a single newline.");
	}
}

function checkFrontmatter({ file, frontmatter }) {
	if (frontmatter === null) {
		reporter.error(
			file,
			1,
			"Missing frontmatter: the file must open with a --- delimited block.",
		);

		return null;
	}

	const entries = readFrontmatter(frontmatter);
	const seen = new Map();
	let previousRank = -1;

	for (const entry of entries) {
		const rank = keyOrder.indexOf(entry.key);

		if (rank === -1) {
			reporter.error(
				file,
				entry.line,
				`Unknown frontmatter key "${entry.key}"; the collection schema ignores it silently.`,
			);

			continue;
		}

		if (seen.has(entry.key)) {
			reporter.error(
				file,
				entry.line,
				`Duplicate frontmatter key "${entry.key}".`,
			);

			continue;
		}

		seen.set(entry.key, entry);

		if (rank < previousRank) {
			reporter.error(
				file,
				entry.line,
				`Frontmatter key "${entry.key}" is out of order; expected order: ${keyOrder.join(", ")}.`,
			);
		}

		previousRank = Math.max(previousRank, rank);
	}

	for (const key of requiredKeys) {
		if (!seen.has(key)) {
			reporter.error(file, 1, `Missing frontmatter key "${key}".`);
		}
	}

	for (const key of ["title", "description"]) {
		const entry = seen.get(key);

		if (entry && entry.value === "") {
			reporter.error(file, entry.line, `Frontmatter key "${key}" is empty.`);
		}
	}

	for (const key of ["authors", "categories", "tags"]) {
		const entry = seen.get(key);

		if (entry && entry.items.length === 0) {
			reporter.error(
				file,
				entry.line,
				`Frontmatter key "${key}" must list at least one entry.`,
			);
		}
	}

	if (seen.has("cover") !== seen.has("coverAlt")) {
		reporter.error(
			file,
			(seen.get("cover") ?? seen.get("coverAlt")).line,
			"cover and coverAlt go together: a cover always needs its alternative text.",
		);
	}

	return seen;
}

function checkBody({ file, body, bodyOffset }) {
	let previousLevel = 0;
	let firstHeading = null;

	for (const { text, line } of prose(body, bodyOffset)) {
		const heading = text.match(/^(#{1,6})\s+\S/);

		if (heading) {
			const level = heading[1].length;

			if (level === 1) {
				reporter.error(
					file,
					line,
					"Level 1 headings are reserved for the frontmatter title; start sections at ##.",
				);
			}

			if (firstHeading === null) {
				firstHeading = { level, line };
			}

			if (previousLevel > 0 && level > previousLevel + 1) {
				reporter.error(
					file,
					line,
					`Heading jumps from h${previousLevel} to h${level}; do not skip levels.`,
				);
			}

			previousLevel = level;
		}

		for (const [, alternative, source] of withoutInlineCode(text).matchAll(
			/!\[([^\]]*)\]\(([^)]*)\)/g,
		)) {
			if (alternative.trim() === "") {
				reporter.error(
					file,
					line,
					`Image "${source}" has no alternative text.`,
				);
			}
		}
	}

	if (firstHeading === null) {
		reporter.error(file, bodyOffset + 1, "Article has no section heading.");
	} else if (firstHeading.level !== 2) {
		reporter.error(
			file,
			firstHeading.line,
			`First heading is h${firstHeading.level}; articles open at h2.`,
		);
	}

	for (const block of fences(body, bodyOffset)) {
		if (!block.closed) {
			reporter.error(file, block.line, "Unclosed code fence.");

			continue;
		}

		if (block.info === "") {
			reporter.warn(
				file,
				block.line,
				"Code fence without a language: syntax highlighting is lost.",
			);
		}
	}
}

function checkLocaleParity(articles) {
	const bySlug = new Map();

	for (const article of articles) {
		const translations = bySlug.get(article.slug) ?? new Map();

		translations.set(article.locale, article);
		bySlug.set(article.slug, translations);
	}

	for (const [slug, translations] of bySlug) {
		for (const locale of locales) {
			if (translations.has(locale)) {
				continue;
			}

			const existing = [...translations.values()][0];

			reporter.error(
				existing.file,
				null,
				`Article "${slug}" has no ${locale} translation; every article ships in ${locales.join(" and ")}.`,
			);
		}

		const [reference, ...others] = locales
			.map((locale) => translations.get(locale))
			.filter(Boolean);

		for (const other of others) {
			for (const [keys, report] of [
				[structuralKeys, reporter.error],
				[editorialKeys, reporter.warn],
			]) {
				for (const key of keys) {
					const left = describe(reference.keys?.get(key));
					const right = describe(other.keys?.get(key));

					if (left === right) {
						continue;
					}

					report(
						other.file,
						other.keys?.get(key)?.line ?? null,
						`Frontmatter key "${key}" differs from ${reference.locale}: ${right || "(missing)"} vs ${left || "(missing)"}.`,
					);
				}
			}
		}
	}
}

/** Renders a value for comparison; lists compare as sets, order aside. */
function describe(entry) {
	if (!entry) {
		return "";
	}

	return entry.items.length > 0
		? [...entry.items].sort().join(", ")
		: entry.value;
}

const articles = readArticles();

for (const article of articles) {
	const { frontmatter, body, bodyOffset } = splitFrontmatter(article.raw);

	checkFileHygiene(article);

	article.keys = checkFrontmatter({ ...article, frontmatter });

	checkBody({ ...article, body, bodyOffset });
}

checkLocaleParity(articles);

process.exit(reporter.finish(articles.length));
