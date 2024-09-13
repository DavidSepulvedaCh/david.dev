import { defineCollection, z } from "astro:content";

const project = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.string().array(),
        image: z.string(),
        urlGitHub: z.string(),
        urlView: z.string(),
    })
});


export const collections = { project };