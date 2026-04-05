// content architecture is as following:
// I use Astro Collections and store the content inside /src/content/
// Keystatic generates .mdoc files under /$collection/slug/index.mdoc
// this schema is used for the SSG where the main branch is responsible for.
// Unfortunately, I need to sync this content config and keystatic.config.tsx schema
// so that I have correct types and fields for my content.
// TODO: Find a fix for this.


import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from 'astro/zod';

const bits = defineCollection({
  loader: glob({ pattern: "**/index.mdoc", base: "./src/content/bits" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    relatedContent: z.array(z.object({
      discriminant: z.string(), // this is generated from Keystatic MarkdocRenderer. It's basically the type of a link.
      value: z.string(),
    })).optional(),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: "**/index.mdoc", base: "./src/content/thoughts" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    relatedContent: z.array(z.object({
      discriminant: z.string(), // this is generated from Keystatic MarkdocRenderer. It's basically the type of a link.
      value: z.string(),
    })).optional(),
  }),
});

export const collections = { bits, thoughts };
