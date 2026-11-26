import React, { createContext, useContext } from 'react';
import ExternalLink from '../ExternalLink';

// A study can list people to link wherever their name appears in its copy:
//   mentions: [{ text: 'Ryan Wilson', href, preview }]
// The case study page provides the list, and Linked turns each name in a
// string into a link that opens in a new tab. The copy in the data file
// stays plain text.
// Erica, 2026-11-24: Ryan Wilson's name is linked on the CGI study.
export const Mentions = createContext([]);

const linkClass = 'hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark';

// `preview` shows the hover card with a picture of the page. Leave it off in
// tight spots (sticky notes, the short version), where the card would cover
// the words around it.
export function Linked({ text, preview = true }) {
  const mentions = useContext(Mentions);
  if (typeof text !== 'string' || mentions.length === 0) return text;

  const parts = [];
  let rest = text;
  while (rest) {
    // The mention that shows up first in what is left of the text.
    let first = null;
    for (const mention of mentions) {
      const at = rest.indexOf(mention.text);
      if (at !== -1 && (!first || at < first.at)) first = { at, mention };
    }
    if (!first) break;
    const { at, mention } = first;
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(
      <ExternalLink
        key={parts.length}
        href={mention.href}
        preview={preview ? mention.preview : undefined}
        className={linkClass}
      >
        {mention.text}
      </ExternalLink>
    );
    rest = rest.slice(at + mention.text.length);
  }
  if (rest) parts.push(rest);
  return <>{parts}</>;
}
