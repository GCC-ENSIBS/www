/**
 * Runs the Nu Html Checker — the validator behind validator.w3.org — over the
 * built site, so the pages we ship are conforming HTML rather than markup that
 * merely renders.
 *
 * CSS validation stays off: the checker still rejects modern syntax that our
 * generated stylesheets legitimately use.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReporter } from "./lib/reporter.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const distDirectory = join(repositoryRoot, "dist");
const jar = join(
	fileURLToPath(import.meta.resolve("vnu-jar")),
	"../build/dist/vnu.jar",
);

if (!existsSync(distDirectory)) {
	console.error("No dist/ directory: run `pnpm build` first.");
	process.exit(1);
}

if (!existsSync(jar)) {
	console.error(`The Nu Html Checker is missing at ${jar}.`);
	process.exit(1);
}

const validator = spawnSync(
	"java",
	[
		"-jar",
		jar,
		"--format",
		"json",
		"--exit-zero-always",
		"--skip-non-html",
		"--also-check-svg",
		distDirectory,
	],
	{ encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (validator.error) {
	console.error(
		"Could not run the Nu Html Checker. It needs a Java runtime on PATH.",
	);
	console.error(validator.error.message);
	process.exit(1);
}

let report;

try {
	report = JSON.parse(validator.stderr || validator.stdout);
} catch {
	console.error("Unreadable validator output:");
	console.error(validator.stderr || validator.stdout);
	process.exit(1);
}

const reporter = createReporter("W3C validity");

function countPages(directory) {
	let total = 0;

	for (const entry of readdirSync(directory)) {
		const path = join(directory, entry);

		if (statSync(path).isDirectory()) {
			total += countPages(path);

			continue;
		}

		if (path.endsWith(".html")) {
			total += 1;
		}
	}

	return total;
}

for (const message of report.messages ?? []) {
	const file = message.url ? fileURLToPath(message.url) : distDirectory;
	const line = message.lastLine ?? message.firstLine ?? null;
	const text = message.extract
		? `${message.message} (near: ${message.extract.replace(/\s+/g, " ").trim()})`
		: message.message;

	if (message.type === "error" || message.subType === "fatal") {
		reporter.error(file, line, text);

		continue;
	}

	reporter.warn(file, line, text);
}

process.exit(reporter.finish(countPages(distDirectory)));
