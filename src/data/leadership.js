import React from 'react';
import { ARISO_URL, SCISUMMARY_URL, PREVIEWS } from './links';
import Link from '../components/ExternalLink';

// Copy for /leadership. Erica, 2026-11-19: "make new page called leadership
// kind of like workiva. /leadership this way i can post my portfolio as
// leadership instead. this normal one would be IC".
//
// These are the words Home had on that day (title and subline are hers, from
// 2026-11-18). They are pinned here so this page keeps saying "leader" when
// Home's hero is changed to the IC version.
// TODO(Erica): change any of it here. Home's own words are in data/home.js.
export const leadershipCopy = {
  // Keeps the big Yum card on top of Leadership Experience. Home, the IC
  // version, draws every role as a small card.
  featuredLeadership: true,
  greeting: "I'm Erica",
  title: 'Product Design Leader',
  subline: 'Founding designer and product consultant',
  about: (
    <>
      I lead design for complicated enterprise products, and I still do the hands-on work as a founding designer on AI products.
      I'm bubbly, energetic, and always curious. I thrive on variety and excitement, which is why I'm never bored.
      By day, I'm a product consultant leading an AWS data migration and shaping AI product strategy for a global aerospace company.
      By night, I'm the Founding Experience Designer at{' '}
      <Link href={ARISO_URL} preview={PREVIEWS.ariso}>Ariso</Link>, <Link href={SCISUMMARY_URL} preview={PREVIEWS.scisummary}>SciSummary</Link>, and Helix.
    </>
  ),
};
