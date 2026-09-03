import { defineCollection, z } from "astro:content";

const project = defineCollection({
    type: "content",
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
