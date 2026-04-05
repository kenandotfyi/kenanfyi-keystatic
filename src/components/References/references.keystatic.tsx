import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import {
  FilePdf,
  Browser,
  BookOpen,
  GithubLogo,
  YoutubeLogo,
  MastodonLogo,
  Article,
  ArrowSquareOut,
} from '@phosphor-icons/react';

export const References = block({
  label: 'References',
  schema: {
    label: fields.text({ label: 'Label' }),
    links: fields.array(
      fields.object({
        href: fields.url({ label: 'URL', validation: { isRequired: true } }),
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        subtitle: fields.text({ label: 'Subtitle' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Website', value: 'website' },
            { label: 'Book', value: 'book' },
            { label: 'Wikipedia', value: 'wiki' },
            { label: 'IEEE', value: 'ieee' },
            { label: 'arXiv', value: 'arxiv' },
            { label: 'GitHub', value: 'github' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Mastodon', value: 'mastodon' },
          ],
          defaultValue: 'book',
        }),
      }),
      {
        label: 'Links',
        itemLabel: (props) => props.fields.title.value || 'New link',
      }
    ),
  },
  ContentView: (props) => {
    const iconMap: Record<string, React.ReactNode> = {
      pdf: <FilePdf size={16} color="#e05252" />,
      book: <BookOpen size={16} />,
      website: <Browser size={16} />,
      github: <GithubLogo size={16} />,
      youtube: <YoutubeLogo size={16} color="#e05252" />,
      mastodon: <MastodonLogo size={16} color="#6364ff" />,
      ieee: <Article size={16} color="#0077b6" />,
      arxiv: <Article size={16} color="#b31b1b" />,
      wiki: <ArrowSquareOut size={16} />,
    };
    return (
      <div style={{ padding: '4px 0' }}>
        {props.value.label && (
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 4 }}>
            {props.value.label}
          </div>
        )}
        {props.value.links.map((link, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', padding: '2px 0' }}>
            {iconMap[link.type] || <ArrowSquareOut size={16} />}
            <span>
              <strong>{link.title}</strong>
              {link.subtitle && (
                <span style={{ opacity: 0.5, fontSize: '0.75rem' }}> — {link.subtitle}</span>
              )}
            </span>
          </div>
        ))}
        {props.value.links.length === 0 && (
          <div style={{ opacity: 0.4, fontSize: '0.85rem' }}>No links added yet</div>
        )}
      </div>
    );
  },
});
