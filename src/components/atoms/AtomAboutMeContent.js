import React from 'react';
import { motion } from 'framer-motion';

function AboutMeSection({ itemVariants }) {
  return (
    <motion.div className="flex flex-col w-full items-start px-4" variants={itemVariants}>
      <div className="m-4 leading-loose">
        <p className="text-sm md:text-lg font-merriweather font-normal text-surface-foreground300-light dark:text-surface-foreground300-dark leading-loose">
          I'm Erica—bubbly, energetic, and always curious. I thrive on variety and excitement, which is why I'm never bored. My ADHD fuels my passion for exploring the many facets of life, from teaching and designing to latte art and making up silly games with my 5-year-old son.
        </p>
        <p className="text-sm md:text-lg font-merriweather font-normal mt-4 text-surface-foreground300-light dark:text-surface-foreground300-dark leading-loose">
          I've worn many hats in my career. I'm a <a href="https://openaccess.cms-conferences.org/publications/book/978-1-964867-19-9/article/978-1-964867-19-9_22" target="_blank" className="bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark no-underline hover:underline">published author in the AHFE journal</a>, a <a href="https://www.memorisely.com/" target="_blank" className="bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark no-underline hover:underline">teacher at Memorisely</a>, the <a href="https://www.memorisely.com/" target="_blank" className="bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark no-underline hover:underline">co-founder of SciSummary</a> and Helix Booking, a   
          <span className="bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark"> conference speaker</span>, and a   
          <a href="https://podcasts.apple.com/us/podcast/the-forward-slash-podcast/id1744372906?i=1000679262388" target="_blank" className="bg-highlight-backgroundTextHighlight-light dark:bg-highlight-backgroundTextHighlight-dark text-highlight-foregroundTextHighlight-light dark:text-highlight-foregroundTextHighlight-dark no-underline hover:underline">guest on the Forward Slash podcast</a>, where I shared insights on UX and design leadership. Before diving into the world of UX, I brought characters to life as a performer at Disney—a role that probably explains my Energizer Bunny energy!
        </p>
        <p className="text-sm md:text-lg font-merriweather font-normal mt-4 text-surface-foreground300-light dark:text-surface-foreground300-dark leading-loose">
          When I'm not designing or teaching, you'll find me experimenting with coffee art, enjoying adventures with my high school sweetheart (now husband), or brainstorming new ideas with my son. Life is one big, creative playground, and I wouldn't have it any other way.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutMeSection;