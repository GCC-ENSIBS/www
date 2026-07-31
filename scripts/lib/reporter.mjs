import { relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
const insideGitHubActions = process.env.GITHUB_ACTIONS === "true";

function toRepositoryPath(file) {
	return relative(repositoryRoot, file) || file;
}

function annotate(severity, entry) {
	const location = entry.line ? `,line=${entry.line}` : "";

	console.log(
		`::${severity} file=${toRepositoryPath(entry.file)}${location}::${entry.message}`,
	);
}

function print(entries, symbol) {
	for (const entry of entries) {
		const location = entry.line
			? `${toRepositoryPath(entry.file)}:${entry.line}`
			: toRepositoryPath(entry.file);

		console.log(`  ${symbol} ${location}\n      ${entry.message}`);
	}
}

/**
 * Collects problems found while scanning files and reports them once, both as
 * readable output and as GitHub Actions annotations when running in CI.
 */
export function createReporter(title) {
	const errors = [];
	const warnings = [];

	return {
		error(file, line, message) {
			errors.push({ file, line, message });
		},

		warn(file, line, message) {
			warnings.push({ file, line, message });
		},

		/** Prints every collected entry and returns the process exit code. */
		finish(checkedCount) {
			console.log(`${title} — ${checkedCount} file(s) checked`);

			if (warnings.length > 0) {
				console.log(`\n${warnings.length} warning(s):`);
				print(warnings, "!");
			}

			if (errors.length > 0) {
				console.log(`\n${errors.length} error(s):`);
				print(errors, "x");
			}

			if (insideGitHubActions) {
				for (const warning of warnings) {
					annotate("warning", warning);
				}

				for (const error of errors) {
					annotate("error", error);
				}
			}

			if (errors.length === 0) {
				console.log("\nEverything looks good.");

				return 0;
			}

			return 1;
		},
	};
}
