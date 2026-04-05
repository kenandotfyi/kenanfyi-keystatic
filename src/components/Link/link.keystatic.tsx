import { inline } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Link = inline({
  label: 'Internal Link',
  schema: {
    post: fields.conditional(
      fields.select({
        label: 'Collection',
        options: [
          { label: 'Thought', value: 'thought' },
          { label: 'Bit', value: 'bit' },
        ],
        defaultValue: 'thought',
      }),
      {
        thought: fields.relationship({
          label: 'Thought',
          collection: 'thoughts',
        }),
        bit: fields.relationship({
          label: 'Bit',
          collection: 'bits',
        }),
      }
    ),
    label: fields.text({ label: 'Link text', validation: { isRequired: true } }),
  },
  ContentView: (props) => (
    <span style={{
      color: '#6366f1',
      textDecoration: 'underline',
      textDecorationStyle: 'dotted' as const,
      cursor: 'default',
    }}>
      {props.value.label || 'Untitled link'}
      <span style={{ fontSize: '0.65rem', opacity: 0.5, marginLeft: 4 }}>
        [{props.value.post.discriminant}: {props.value.post.value || '?'}]
      </span>
    </span>
  ),
});
