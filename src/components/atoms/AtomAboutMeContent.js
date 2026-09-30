import React from 'react';
import { motion } from 'framer-motion';

// Copy is Erica's, from the Figma hero (Tailwind Portfolio, node 158:1376),
// with em dashes and exclamation points swapped for periods and commas per
// Portfolio/Canon/voice.md. Words are otherwise unchanged.

const p = 'text-sm lg:text-base font-inter font-normal text-surface-foreground300-light dark:text-surface-foreground300-dark leading-relaxed';

const link = 'underline underline-offset-2 decoration-1 hover:decoration-2';

const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>
);

function AboutMeSection({ itemVariants }) {
  return (
    <motion.div className="flex flex-col w-full items-start px-3 lg:px-4" variants={itemVariants}>
      <div className="my-3 lg:my-4 text-left">
        <p className={p}>
          I'm Erica: bubbly, energetic, and always curious. I thrive on variety and excitement, which is why I'm never bored.
          By day, I'm a product consultant leading an AWS data migration and shaping AI product strategy for a global aerospace company.
          By night, I'm the Founding Experience Designer at{' '}
          {/* TODO(Erica): Ariso URL */}
          <span className={link}>Ariso</span>, SciSummary, and Helix.
        </p>
        <p className={`${p} mt-4`}>
          I've worn many hats in my career. I'm a{' '}
          <Link href="https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22">published author in the AHFE journal</Link>,
          retired <Link href="https://www.memorisely.com/">teacher at Memorisely</Link>,
          the{' '}
          {/* TODO(Erica): SciSummary URL. Canon/about.md says "founding designer", the Figma says "co-founder". */}
          <span className={link}>co-founder of SciSummary</span>{' '}
          and Helix Booking, a conference speaker, and{' '}
          <Link href="https://podcasts.apple.com/us/podcast/the-forward-slash-podcast/id1744372906?i=1000679262388">guest on the Forward Slash podcast</Link>,
          where I shared insights on UX and design leadership. Before diving into the world of UX, I brought characters to life as a performer at Disney, a role that probably explains my Energizer Bunny energy.
        </p>
        <p className={`${p} mt-4`}>
          When I'm not building tech, you can find me experimenting with coffee art, enjoying adventures with my high school sweetheart (now husband), or brainstorming new ideas with my son. Life is one big, creative playground, and I wouldn't have it any other way.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutMeSection;
