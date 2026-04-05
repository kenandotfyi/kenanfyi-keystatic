import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    image: {
      render: component('./src/components/Figure/Figure.astro'),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
      },
    },
  },
  tags: {
    Sidenote: {
      render: component('./src/components/Sidenote/Sidenote.astro'),
      attributes: {
        text: { type: String, required: true },
      },
    },
    Adm: {
      render: component('./src/components/Adm/Adm.astro'),
      attributes: {
        type: { type: String, default: 'info' },
      },
    },
    References: {
      render: component('./src/components/References/References.astro'),
      attributes: {
        label: { type: String },
        links: { type: Array },
      },
    },
    Link: {
      render: component('./src/components/Link/Link.astro'),
      attributes: {
        post: { type: Object, required: true },
        label: { type: String, required: true },
      },
    },
  },
});
