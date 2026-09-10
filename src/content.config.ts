import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// `z` reexportado desde astro:content quedó deprecado en Astro 7.
import { z } from "astro/zod";

const project = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/project" }),
    // `image()` valida la ruta y deja que astro:assets optimice el archivo.
    schema: ({ image }) => z.object({
        title: z.string(),
        title_en: z.string().optional(),
        description: z.string(),
        description_en: z.string().optional(),
        tags: z.string().array(),
        category: z.string().default("web"),
        image: image(),
        urlGitHub: z.string(),
        urlView: z.string(),
    })
});

export const collections = { project };
