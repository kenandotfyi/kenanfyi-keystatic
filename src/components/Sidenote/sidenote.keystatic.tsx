import { inline } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Sidenote = inline({
  label: 'Sidenote',
  schema: {
    text: fields.text({ label: 'Note text', multiline: true, validation: { isRequired: true } }),
  },
  ContentView: (props) => (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      className="sidenote-preview"
    >
      <style>{`
        .sidenote-preview .sidenote-tooltip { display: none; }
        .sidenote-preview:hover .sidenote-tooltip { display: block; }
        span:has(> .sidenote-preview) { border: none !important; }
      `}</style>
      <span style={{
        display: 'inline-flex',
        fontSize: '0.875rem',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        background: props.value.text ? 'red' : 'blue',
        width: 16,
        height: 16,
        verticalAlign: 'super',
        cursor: 'help',
        position: 'relative',
        top: -4,
      }}>
        x
      </span>
      {props.value.text && (
        <span
          className="sidenote-tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 6,
            background: '#1f2937',
            color: '#f9fafb',
            fontSize: '0.75rem',
            padding: '6px 10px',
            borderRadius: 6,
            whiteSpace: 'pre-wrap',
            maxWidth: 280,
            width: 'max-content',
            zIndex: 50,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            lineHeight: 1.4,
          }}
        >
          {props.value.text}
        </span>
      )}
    </span>
  ),
});
