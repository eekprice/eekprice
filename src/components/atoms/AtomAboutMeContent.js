import React from 'react';
import { ARISO_URL, SCISUMMARY_URL, PREVIEWS } from '../../data/links';
import Link from '../ExternalLink';

// Copy is Erica's, from the Figma hero (Tailwind Portfolio, node 158:1376),
// with em dashes and exclamation points swapped for periods and commas per
// Portfolio/Canon/voice.md. Words are otherwise unchanged.
//
// Only the first paragraph sits in the about box, so the hero stays short.
// The other two are comments: pins on the edge of the box that open to read
// (`aboutComments` below, shown by components/comments/CommentPins.js).

const p = 'text-sm lg:text-base font-inter font-normal text-surface-foreground300-light dark:text-surface-foreground300-dark leading-relaxed';

// Every link here leaves the site, so each one is an ExternalLink: a new-tab
// icon, and for Ariso and SciSummary a picture of the page on hover.

// `preview` is what a pin shows before it is opened: the first words of the
// comment. `body` is the whole thing. `link` is optional: a page on the site
// with more, shown as a button under the comment.
export const aboutComments = [
  {
    id: 'hats',
    preview: "I've worn many hats in my career.",
    // The side projects page is a placeholder for now (pages/SideProjectsPage.js).
    // TODO(Erica): the label is a placeholder in your voice. Change the words here.
    link: { to: '/side-projects', label: 'My Side Projects' },
    body: (
      <p>
        I've worn many hats in my career. I'm a{' '}
        <Link href="https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22">published author in the AHFE journal</Link>,
        retired <Link href="https://www.memorisely.com/">teacher at Memorisely</Link>,
        the{' '}
        {/* The Figma said "co-founder" of both. LinkedIn, her named source, says
            Founding Experience Designer at SciSummary and Founder of Helix Booking,
            and so do the about box and the resume page. Changed 2026-11-18 so the
            roles agree. TODO(Erica): confirm. */}
        <Link href={SCISUMMARY_URL}>founding designer at SciSummary</Link>,
        the founder of Helix Booking, a conference speaker, and{' '}
        <Link href="https://podcasts.apple.com/us/podcast/the-forward-slash-podcast/id1744372906?i=1000679262388">guest on the Forward Slash podcast</Link>,
        where I shared insights on UX and design leadership. Before diving into the world of UX, I brought characters to life as a performer at Disney, a role that probably explains my Energizer Bunny energy.
      </p>
    ),
  },
  {
    id: 'life',
    preview: "When I'm not building tech...",
    // The About page is the hobbies page, so this is the comment that points to it.
    // TODO(Erica): the label is a placeholder in your voice. Change the words here.
    link: { to: '/about', label: 'More About Me' },
    body: (
      <p>
        When I'm not building tech, you can find me experimenting with coffee art, enjoying adventures with my high school sweetheart (now husband), or brainstorming new ideas with my son. Life is one big, creative playground, and I wouldn't have it any other way.
      </p>
    ),
  },
];

// The bottom margin leaves room for the pins, which sit on the box's bottom edge.
function AboutMeSection() {
  return (
    <div className="flex flex-col w-full items-start px-3 lg:px-4">
      <div className="mt-3 mb-8 lg:mt-4 lg:mb-9 text-left">
        {/* The first sentence is the through-line: what connects the leadership,
            consulting and founding design work (added 2026-11-18 for the Workiva
            application). TODO(Erica): pick the wording. Two other candidates are in
            Canon/workiva-role.md. */}
        <p className={p}>
          I lead design for complicated enterprise products, and I still do the hands-on work as a founding designer on AI products.
          I'm bubbly, energetic, and always curious. I thrive on variety and excitement, which is why I'm never bored.
          By day, I'm a product consultant leading an AWS data migration and shaping AI product strategy for a global aerospace company.
          By night, I'm the Founding Experience Designer at{' '}
          <Link href={ARISO_URL} preview={PREVIEWS.ariso}>Ariso</Link>, <Link href={SCISUMMARY_URL} preview={PREVIEWS.scisummary}>SciSummary</Link>, and Helix.
        </p>
      </div>
    </div>
  );
}

export default AboutMeSection;
