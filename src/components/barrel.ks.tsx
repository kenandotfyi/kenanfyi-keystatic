// sharedComponents are used across different post types like thoughts and bits
// there might be other type of components which are specific to a collectiona
// this file is just to manage them and it exports the objects that consists
// of components.

// Inside the /src/components folder component names starting with uppercase letters
// are Astro components that I use in frontend.
// Components/folders starting with lowercase letters are for Keystatic and thus for
// backend
// Example:
// Adm.astro --> Frontend component, used by Astro as well as Markdoc config to
// orchestrate component definitions for Markdoc rendering.
// adm.keystatic.tsx --> Keystatic backend component, renders editor UI component.
// There are other components which have individual to front or backend specifically.
// Like Figure.astro is there for the MarkdocRenderer to replace <img>
// with <figure> and <figcaption> elements.
// fields/relatedContent.ts file is there for only to be used in the
// keystatic.config.tsx, just for DRY.

// Therefore, want to change something on the frontend? Go to uppercase component
// want to change something for the editor UI? Go to lowercase component


import { Adm } from './Adm/adm.keystatic';
import { References } from './References/references.keystatic';
import { Sidenote } from './Sidenote/sidenote.keystatic';
import { Link } from './Link/link.keystatic';

export const sharedComponents = { Adm, Sidenote, References, Link };

export const thoughtsComponents = { ...sharedComponents };

export const bitsComponents = { ...sharedComponents };
