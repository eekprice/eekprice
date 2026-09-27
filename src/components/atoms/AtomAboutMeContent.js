import React from 'react';
import { motion } from 'framer-motion';

// Copy follows Portfolio/Canon/voice.md. Facts from Canon/about.md only.

const p = 'text-base lg:text-lg font-merriweather font-normal text-surface-foreground300-light dark:text-surface-foreground300-dark leading-relaxed lg:leading-loose';

const hl = 'bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark underline underline-offset-2 decoration-1 hover:decoration-2';

const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={hl}>{children}</a>
);

function AboutMeSection({ itemVariants }) {
  return (
    <motion.div className="flex flex-col w-full items-start px-3 lg:px-4" variants={itemVariants}>
      <div className="m-2 lg:m-4">
        <p className={p}>
          I'm Erica. I have ADHD and I like having a lot going on, so I'm not bored much. I teach, I design, and I make up games with my son.
        </p>
        <p className={`${p} mt-4`}>
          I've done a few different things. I'm a{' '}
          <Link href="https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22">published author in the AHFE journal</Link>,
          I <Link href="https://www.memorisely.com/">teach at Memorisely</Link>,
          I was the{' '}
          {/* TODO(Erica): SciSummary URL. The old link pointed at memorisely.com by mistake. */}
          <span className={hl}>founding designer at SciSummary</span>,
          and I started{' '}
          {/* TODO(Erica): Helix Booking URL if there is one */}
          <span className={hl}>Helix Booking</span>.
          I've spoken at conferences and I was a{' '}
          <Link href="https://podcasts.apple.com/us/podcast/the-forward-slash-podcast/id1744372906?i=1000679262388">guest on the Forward Slash podcast</Link>,
          where I talked about UX and design leadership. Before UX I was a performer at Disney, which probably explains the energy.
        </p>
        <p className={`${p} mt-4`}>
          Outside work it's latte art, my husband (we met in high school), and coming up with ideas with my son.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutMeSection;
