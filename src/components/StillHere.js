import React from 'react';
import { ReactComponent as WowSvg } from '../assets/Wow.svg';
import { Reveal } from './caseStudy/Blocks';
import { closer } from '../data/home';
import { MAILTO } from '../data/links';

// The sign-off at the bottom of the home page.
function StillHere() {
  // Make "an email" in the copy a mailto link without splitting the data string by hand.
  const [before, after] = closer.text.split('an email');

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
          {before}
          {after !== undefined && (
            <>
              <a href={MAILTO} className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark">
                an email
              </a>
              {after}
            </>
          )}
        </p>
      </Reveal>
    </section>
  );
}

export default StillHere;
