import { config, fields, collection } from '@keystatic/core';
import { thoughtsComponents, bitsComponents } from './src/components/barrel.ks';
import { relatedContent } from './src/components/fields/relatedContent';

const useGithub = import.meta.env.PUBLIC_KS_GITHUB === 'true';

const storage = useGithub
  ? {
    kind: 'github' as const,
    repo: { owner: 'kenandotfyi', name: 'kenanfyi-keystatic' },
  }
  : { kind: 'local' as const };

export default config({
  storage,
  collections: {
    thoughts: collection({
      label: 'Thoughts',
      slugField: 'title',
      path: 'src/content/thoughts/*/',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'published', 'updated', 'draft'],
      schema: {
        draft: fields.checkbox({ label: 'draft', defaultValue: true }),
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        published: fields.date({ label: 'Published At' }),
        updated: fields.date({ label: 'Updated At' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/thoughts',
              publicPath: '/src/content/thoughts/',
            },
          },
          components: thoughtsComponents,
        }),
        relatedContent,
      },
    }),
    bits: collection({
      label: 'Bits',
      slugField: 'title',
      path: 'src/content/bits/*/',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'published', 'updated', 'draft'],
      schema: {
        draft: fields.checkbox({ label: 'draft', defaultValue: true }),
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        published: fields.date({ label: 'Published At' }),
        updated: fields.date({ label: 'Updated At' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/bits',
              publicPath: '/src/content/bits/',
            },
          },
          components: bitsComponents,
        }),
        relatedContent,
      },
    }),
  },
});
