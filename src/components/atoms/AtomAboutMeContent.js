import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../Button';
import { cursorSay } from '../CursorTag';
import { ARISO_URL, SCISUMMARY_URL } from '../../data/links';
import { cursorLines } from '../../data/home';

// Copy is Erica's, from the Figma hero (Tailwind Portfolio, node 158:1376),
// with em dashes and exclamation points swapped for periods and commas per
// Portfolio/Canon/voice.md. Words are otherwise unchanged.
//
// Only the first paragraph shows at first, so the hero stays short. "Read
// more" opens the other two. The first time it is opened, the desktop cursor
// says a line about it (cursorLines.reader in data/home.js).

const p = 'text-sm lg:text-base font-inter font-normal text-surface-foreground300-light dark:text-surface-foreground300-dark leading-relaxed';

const link = 'underline underline-offset-2 decoration-1 hover:decoration-2';

const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>
);

const Chevron = ({ open }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function AboutMeSection({ itemVariants }) {
  const [open, setOpen] = useState(false);
  const saidIt = useRef(false);
  const reduce = useReducedMotion();

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !saidIt.current) {
      saidIt.current = true;
      cursorSay(cursorLines.reader);
    }
  };

  // Finished content rises in (design system). The second paragraph follows the first.
  const rise = (order) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: order * 0.08 },
        };

  return (
    <motion.div className="flex flex-col w-full items-start px-3 lg:px-4" variants={itemVariants}>
      <div className="my-3 lg:my-4 text-left">
        <p className={p}>
          I'm Erica: bubbly, energetic, and always curious. I thrive on variety and excitement, which is why I'm never bored.
          By day, I'm a product consultant leading an AWS data migration and shaping AI product strategy for a global aerospace company.
          By night, I'm the Founding Experience Designer at{' '}
          <Link href={ARISO_URL}>Ariso</Link>, <Link href={SCISUMMARY_URL}>SciSummary</Link>, and Helix.
        </p>
        {open && (
          <div id="about-more">
            <motion.p className={`${p} mt-4`} {...rise(0)}>
              I've worn many hats in my career. I'm a{' '}
              <Link href="https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22">published author in the AHFE journal</Link>,
              retired <Link href="https://www.memorisely.com/">teacher at Memorisely</Link>,
              the{' '}
              {/* TODO(Erica): Canon/about.md says "founding designer", the Figma says "co-founder". */}
              <Link href={SCISUMMARY_URL}>co-founder of SciSummary</Link>{' '}
              and Helix Booking, a conference speaker, and{' '}
              <Link href="https://podcasts.apple.com/us/podcast/the-forward-slash-podcast/id1744372906?i=1000679262388">guest on the Forward Slash podcast</Link>,
              where I shared insights on UX and design leadership. Before diving into the world of UX, I brought characters to life as a performer at Disney, a role that probably explains my Energizer Bunny energy.
            </motion.p>
            <motion.p className={`${p} mt-4`} {...rise(1)}>
              When I'm not building tech, you can find me experimenting with coffee art, enjoying adventures with my high school sweetheart (now husband), or brainstorming new ideas with my son. Life is one big, creative playground, and I wouldn't have it any other way.
            </motion.p>
          </div>
        )}
        <p className="mt-3">
          <Button variant="link" aria-expanded={open} aria-controls="about-more" onClick={toggle}>
            {open ? 'Show less' : 'Read more'}
            <Chevron open={open} />
          </Button>
        </p>
      </div>
    </motion.div>
  );
}

export default AboutMeSection;
