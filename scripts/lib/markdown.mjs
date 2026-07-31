/**
 * Returns the fence descriptor when the line opens or closes a fenced code
 * block. A backtick fence whose info string contains a backtick is not a fence
 * at all, which is how an inline `` ```code``` `` span stays out of the way.
 */
function readFence(line) {
	const match = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);

	if (!match) {
		return null;
	}

	const [, marker, info] = match;

	if (marker.startsWith("`") && info.includes("`")) {
		return null;
	}

	return { character: marker[0], length: marker.length, info: info.trim() };
}

/**
 * Yields every line that lives outside a fenced code block, so that scanners
 * never mistake sample code for real markup.
 */
export function* prose(lines, offset = 0) {
	let openFence = null;

	for (const [index, text] of lines.entries()) {
		const fence = readFence(text);

		if (openFence) {
			const closes =
				fence &&
				fence.character === openFence.character &&
				fence.length >= openFence.length &&
				fence.info === "";

			if (closes) {
				openFence = null;
			}

			continue;
		}

		if (fence) {
			openFence = { ...fence, line: index + offset + 1 };

			continue;
		}

		yield { text, line: index + offset + 1 };
	}
}

/** Same walk as {@link prose}, but exposing the fenced blocks themselves. */
export function fences(lines, offset = 0) {
	const blocks = [];
	let openFence = null;

	for (const [index, text] of lines.entries()) {
		const fence = readFence(text);

		if (!fence) {
			continue;
		}

		if (!openFence) {
			openFence = { ...fence, line: index + offset + 1 };

			continue;
		}

		if (
			fence.character === openFence.character &&
			fence.length >= openFence.length &&
			fence.info === ""
		) {
			blocks.push({ ...openFence, closed: true });
			openFence = null;
		}
	}

	if (openFence) {
		blocks.push({ ...openFence, closed: false });
	}

	return blocks;
}

/** Blanks out inline code spans so their content is never parsed as markup. */
export function withoutInlineCode(text) {
	return text.replace(/`[^`]*`/g, (span) => " ".repeat(span.length));
}

/**
 * Splits a frontmatter document into its two halves. `body` keeps its original
 * line numbering through `bodyOffset`.
 */
export function splitFrontmatter(raw) {
	const lines = raw.split("\n");

	if (lines[0] !== "---") {
		return { frontmatter: null, body: lines, bodyOffset: 0 };
	}

	const closingIndex = lines.indexOf("---", 1);

	if (closingIndex === -1) {
		return { frontmatter: null, body: lines, bodyOffset: 0 };
	}

	return {
		frontmatter: lines.slice(1, closingIndex),
		body: lines.slice(closingIndex + 1),
		bodyOffset: closingIndex + 1,
	};
}

/**
 * Reads the subset of YAML the articles rely on: top level scalars, block
 * sequences and folded scalars. Values are returned verbatim; the collection
 * schema is what validates their meaning at build time.
 */
export function readFrontmatter(frontmatterLines) {
	const entries = [];

	for (const [index, text] of frontmatterLines.entries()) {
		const match = text.match(/^([A-Za-z][A-Za-z0-9]*):(.*)$/);

		if (!match) {
			const item = text.match(/^\s+-\s+(.*)$/);
			const last = entries.at(-1);

			if (item && last && last.value === "") {
				last.items.push(unquote(item[1]));
			}

			continue;
		}

		const [, key, rawValue] = match;

		entries.push({
			key,
			line: index + 2,
			value: unquote(rawValue.trim()),
			items: [],
		});
	}

	return entries;
}

function unquote(value) {
	const match = value.match(/^"(.*)"$/) ?? value.match(/^'(.*)'$/);

	return match ? match[1] : value;
}
