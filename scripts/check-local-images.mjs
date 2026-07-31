/**
 * Fails when an image is pulled from a remote URL instead of living in the
 * repository, and when a local reference points at a file that is not there.
 *
 * Remote images break the asset pipeline: no hashing, no optimisation, no
 * offline build, and a third party deciding when our pages lose their
 * illustrations.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
	prose,
	readFrontmatter,
	splitFrontmatter,
	withoutInlineCode,
} from "./lib/markdown.mjs";
import { createReporter } from "./lib/reporter.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const publicDirectory = join(repositoryRoot, "public");
const sourceDirectory = join(repositoryRoot, "src");
const scannedRoots = [sourceDirectory, publicDirectory];

const imageExtensions = new Set([
	".apng",
	".avif",
	".bmp",
	".gif",
	".ico",
	".jpeg",
	".jpg",
	".png",
	".svg",
	".tif",
	".tiff",
	".webp",
]);

/** Assets that Astro resolves through an import, images included. */
const importableExtensions = new Set([...imageExtensions, ".pdf", ".mp4"]);

/** Frontmatter keys that always hold an asset, whatever the value looks like. */
const assetKeys = new Set(["cover", "image", "thumbnail", "ogImage", "banner"]);

const markdownExtensions = new Set([".md", ".mdx"]);
const scannedExtensions = new Set([
	...markdownExtensions,
	".astro",
	".css",
	".html",
	".js",
	".mjs",
	".svg",
	".ts",
]);

const reporter = createReporter("Local images");

function extensionOf(path) {
	const match = path.match(/\.[a-z0-9]+$/i);

	return match ? match[0].toLowerCase() : "";
}

function* walk(directory) {
	for (const entry of readdirSync(directory)) {
		const path = join(directory, entry);

		if (statSync(path).isDirectory()) {
			yield* walk(path);

			continue;
		}

		yield path;
	}
}

/**
 * Collects every reference a line makes to an asset. Values holding a template
 * expression are skipped: those are resolved by Astro, not by us.
 */
function referencesIn(text) {
	const references = [];
	const add = (value) => {
		if (!value || value.includes("{") || value.includes("$")) {
			return;
		}

		references.push(value.trim());
	};

	for (const [, value] of text.matchAll(
		/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g,
	)) {
		add(value);
	}

	for (const [, value] of text.matchAll(
		/\b(?:src|poster|content|xlink:href|href)\s*=\s*["']([^"']*)["']/g,
	)) {
		if (importableExtensions.has(extensionOf(value.split(/[?#]/)[0]))) {
			add(value);
		}
	}

	for (const [, value] of text.matchAll(/\bsrcset\s*=\s*["']([^"']*)["']/g)) {
		for (const candidate of value.split(",")) {
			add(candidate.trim().split(/\s+/)[0]);
		}
	}

	for (const [, , value] of text.matchAll(
		/\burl\(\s*(["']?)([^"')]+)\1\s*\)/g,
	)) {
		add(value);
	}

	for (const [, value] of text.matchAll(
		/\bfrom\s*["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
	)) {
		if (importableExtensions.has(extensionOf(value ?? ""))) {
			add(value);
		}
	}

	return references;
}

function isRemote(reference) {
	return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(reference);
}

function isIgnorable(reference) {
	return (
		reference.startsWith("#") ||
		reference.startsWith("data:") ||
		reference.startsWith("mailto:") ||
		reference.startsWith("astro:") ||
		reference.startsWith("virtual:")
	);
}

/** Maps a reference onto the file it should resolve to on disk. */
function resolveReference(file, reference) {
	const path = decodeURIComponent(reference.split(/[?#]/)[0]);

	if (path.startsWith("@/")) {
		return join(sourceDirectory, path.slice(2));
	}

	if (path.startsWith("/")) {
		return join(publicDirectory, path);
	}

	if (path.startsWith(".")) {
		return resolve(dirname(file), path);
	}

	return null;
}

/**
 * Every asset a file points at. Markdown is read in two halves: the
 * frontmatter, where a cover is declared, and the body outside code fences.
 */
function referencesInFile(file) {
	const raw = readFileSync(file, "utf8");
	const found = [];

	if (!markdownExtensions.has(extensionOf(file))) {
		for (const [index, text] of raw.split("\n").entries()) {
			for (const reference of referencesIn(text)) {
				found.push({ reference, line: index + 1 });
			}
		}

		return found;
	}

	const { frontmatter, body, bodyOffset } = splitFrontmatter(raw);

	for (const entry of frontmatter ? readFrontmatter(frontmatter) : []) {
		for (const value of [entry.value, ...entry.items]) {
			const looksLikeAsset =
				assetKeys.has(entry.key) ||
				importableExtensions.has(extensionOf(value.split(/[?#]/)[0]));

			if (value !== "" && looksLikeAsset) {
				found.push({ reference: value, line: entry.line });
			}
		}
	}

	for (const { text, line } of prose(body, bodyOffset)) {
		for (const reference of referencesIn(withoutInlineCode(text))) {
			found.push({ reference, line });
		}
	}

	return found;
}

function checkFile(file) {
	const isArticle = file.startsWith(join(sourceDirectory, "content"));

	for (const { reference, line } of referencesInFile(file)) {
		if (isIgnorable(reference)) {
			continue;
		}

		if (isRemote(reference)) {
			reporter.error(
				file,
				line,
				`Remote asset "${reference}". Commit it under src/assets and import it instead.`,
			);

			continue;
		}

		const target = resolveReference(file, reference);

		if (target === null) {
			reporter.error(
				file,
				line,
				`Unresolvable asset "${reference}". Use a relative path, "@/…" or a "/…" path served from public/.`,
			);

			continue;
		}

		if (!existsSync(target)) {
			reporter.error(
				file,
				line,
				`Missing asset "${reference}" (expected at ${target.slice(repositoryRoot.length)}).`,
			);

			continue;
		}

		if (isArticle && reference.startsWith("/")) {
			reporter.warn(
				file,
				line,
				`Article asset "${reference}" is served from public/ and skips the asset pipeline. Prefer src/assets.`,
			);
		}
	}
}

let checkedCount = 0;

for (const root of scannedRoots) {
	for (const file of walk(root)) {
		if (!scannedExtensions.has(extensionOf(file))) {
			continue;
		}

		checkFile(file);
		checkedCount += 1;
	}
}

process.exit(reporter.finish(checkedCount));
