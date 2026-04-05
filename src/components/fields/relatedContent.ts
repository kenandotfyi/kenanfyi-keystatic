import { fields } from '@keystatic/core';

export const relatedContent = fields.array(
  fields.conditional(
    fields.select({
      label: 'Type',
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
  {
    label: 'Related Content',
    itemLabel: (props) => {
      const type = props.discriminant;
      const slug = props.value.value;
      return slug ? `${type}: ${slug}` : `Select a ${type}`;
    },
  }
);
