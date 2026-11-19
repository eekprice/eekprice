import React from 'react';
import { ARISO_URL, SCISUMMARY_URL, PREVIEWS } from './links';
import Link from '../components/ExternalLink';

// Copy for /workiva. Erica, 2026-11-19: the page is "a dupe of my original
// home page with different text", starting with "Hi workiva, im erica, a
// principal product design/ tinkerer". Everything under the hero is Home.
//
// TODO(Erica): the subline and the about text are a first pass. The about
// text was rewritten for the Growth team role (new AI products, prototypes,
// compliance-grade data, cross-team work). Each line comes from a case study
// or from your "tell me about yourself" answer. "Prototype early" is mine.
export const workivaCopy = {
  greeting: "Hi Workiva, I'm Erica",
  title: 'Principal Product Designer',
  subline: 'Tinkerer, founding designer and product builder',
  about: (
    <>
      I design new AI products from the start. I'm the Founding Experience Designer at{' '}
      <Link href={ARISO_URL} preview={PREVIEWS.ariso}>Ariso</Link> and <Link href={SCISUMMARY_URL} preview={PREVIEWS.scisummary}>SciSummary</Link>,
      and I like to tinker, so I prototype early.
      By day, I lead an AI platform program for a global aerospace company, in a government cloud with export-controlled data and strict rules on tooling.
      I specialize in cross-discipline work inside large organizations.
      I'm good at wrangling a vision, getting people to work together, and keeping everyone thinking about the user.
    </>
  ),
};
