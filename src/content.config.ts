import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: ({ image }) =>
		z
			.object({
				authors: z.array(z.string()).default([]),
				title: z.string(),
				description: z.string(),
				publicationDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				cover: image().optional(),
				coverAlt: z.string().optional(),
				categories: z.array(z.string()).default([]),
				tags: z.array(z.string()).default([]),
			})
			.superRefine((data, context) => {
				if (data.cover && !data.coverAlt) {
					context.addIssue({
						code: "custom",
						path: ["coverAlt"],
						message: "coverAlt is required when cover is set.",
					});
				}
			}),
});

export const collections = { blog };
