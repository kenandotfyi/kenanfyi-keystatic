import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Adm = wrapper({
  label: 'Admonition',
  schema: {
    type: fields.select({
      label: 'Type',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
      ],
      defaultValue: 'info',
    }),
  },
  ContentView: (props) => {
    const type = props.value.type;
    return (
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
          {type === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'}
        </div>
        {props.children}
      </div>
    );
  },
});
