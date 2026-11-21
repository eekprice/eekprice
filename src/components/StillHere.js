import React from 'react';
import { ReactComponent as WowSvg } from '../assets/Wow.svg';
import { Reveal } from './caseStudy/Blocks';
import { closer } from '../data/home';
import { MAILTO, LINKEDIN_URL } from '../data/links';
import ExternalLink, { NewTabIcon } from './ExternalLink';

// The sign-off at the bottom of the home page.
//
// "LinkedIn" and "an email" in the copy are links, found in the data string so
// it does not have to be split by hand. Both leave the site, so both carry the
// new-tab icon (Erica, 2026-11-20). LinkedIn opens in a new tab; the email
// link opens the mail app.
const linkClass = 'hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark';
const LINKS = {
  LinkedIn: (words) => (
    <ExternalLink href={LINKEDIN_URL} className={linkClass}>{words}</ExternalLink>
  ),
  'an email': (words) => (
    <a href={MAILTO} className={`underline underline-offset-2 decoration-1 hover:decoration-2 ${linkClass}`}>
      {words}
      <NewTabIcon />
      <span className="sr-only"> (opens your mail app)</span>
    </a>
  ),
};

function StillHere() {
  // Cut the sentence at each linked phrase, keeping the phrases.
  const parts = closer.text.split(new RegExp(`(${Object.keys(LINKS).join('|')})`));

  return (
    <section className="max-w-[560px] mx-auto px-4 pt-16 pb-8 text-center">
      <Reveal>
        <h2 className="text-2xl lg:text-3xl font-merriweather font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark">
          {closer.heading}
        </h2>
        <WowSvg
          role="img"
          aria-label="Wow!"
          className="mx-auto -mt-6 w-40 h-40 text-surface-foreground300-light dark:text-surface-foreground100-dark [&_path]:fill-current"
        />
        <p className="-mt-6 text-left font-inter text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark">
          {parts.map((part, n) => (
            <React.Fragment key={n}>{LINKS[part] ? LINKS[part](part) : part}</React.Fragment>
          ))}
        </p>
      </Reveal>
    </section>
  );
}

export default StillHere;
