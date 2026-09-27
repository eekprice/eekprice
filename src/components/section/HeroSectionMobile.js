import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as Mesm } from '../../assets/mesm.svg';
import PersonalityScene from '../atoms/PersonalityAtom';
import { ReactComponent as HeartSvg } from '../../assets/Heart.svg';
import { ReactComponent as StarSvg } from '../../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../../assets/Stars.svg';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import TypingEffect from '../TypingEffect';
import { MAILTO, RESUME_HREF } from '../../data/links';

// Phone hero: a centered column. Avatar, name, headline, chips, links, then
// the about box. Everything is on screen within about 1.5s of mount.

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.05, staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};
const chipRow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const chip = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 24 } },
};
const box = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 18 } },
};
const pop = (delay) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.15, 1],
    opacity: 1,
    rotate: [0, 8, 0],
    transition: { delay, duration: 0.4, ease: 'easeOut' },
  },
});

const chipClass = `text-xs px-1.5 py-0.5 whitespace-nowrap rounded-lg shadow-sm
  bg-surface-background200-light dark:bg-surface-background200-dark
  border border-surface-outline-light dark:border-surface-outline-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark`;

const linkClass = 'underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark';

function HeroSectionMobile() {
  const { handleSecretClick, EasterEggModal } = useEasterEgg();
  const heroRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={heroRef}
      className="w-full max-w-md mx-auto flex flex-col items-center px-4 pt-6 pb-4 text-center"
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      variants={container}
    >
      <motion.div variants={item}>
        <Mesm
          className="w-20 h-20 rounded-full cursor-pointer"
          onClick={handleSecretClick}
          role="img"
          aria-label="Erica Price"
        />
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-3 text-2xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark"
      >
        <TypingEffect text="I'm Erica" maxBlinksAfterTyping={1} instant={!!reduceMotion} />
      </motion.h1>

      {/*
        TODO(Erica): pick the hero headline. "A Product Design Manager" is a placeholder.
        Candidates from Canon/voice.md (first sentence as the headline, the rest as a line under it):
        1. Founding Designer: "I've been the first designer at two AI startups." / "I do the research, build the design system, and figure out the product without a team around me."
        2. Principal UX: "About ten years on enterprise and consumer products." / "I led UX for the KFC and Taco Bell POS and I've started design practices, accessibility programs, and design systems from nothing."
        3. Program / Delivery Lead: "I take over programs that lost visibility and get them moving again." / "I figure out who's doing what, reorganize the team, and keep the loud stuff off the critical path."
        4. Freelance: "I do contract and part-time work on three kinds of problems." / "Getting design started at an early company, leading UX on a complicated product, and unsticking a program that stalled."
        Note: Canon/positioning.md steers away from manager titles for all three paths.
      */}
      <motion.h2
        variants={item}
        className="mt-1 text-xl font-merriweather font-normal leading-snug break-words text-surface-foreground100-light dark:text-surface-foreground100-dark"
      >
        <TypingEffect text="A Product Design Manager" instant />
      </motion.h2>

      <motion.ul variants={chipRow} className="mt-3 flex flex-wrap justify-center gap-1.5 list-none p-0 m-0" aria-label="A few words about Erica">
        {['Optimistic', 'Animated', 'Strategic'].map((label) => (
          <motion.li key={label} variants={chip} className={chipClass}>
            {label}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={item}
        className="mt-3 flex flex-row items-center gap-2 text-sm font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
      >
        <a href={MAILTO} className={linkClass}>Email</a>
        <span aria-hidden="true">•</span>
        <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer" className={linkClass}>Resume</a>
      </motion.div>

      <motion.div variants={box} className="relative w-full mt-6" style={{ transformOrigin: 'top center' }}>
        <motion.div variants={pop(0.55)} className="absolute -left-3 -top-4 z-10" aria-hidden="true">
          <StarSvg className="w-8 h-8" />
        </motion.div>

        <PersonalityScene revealDelay={reduceMotion ? 0 : 700} />

        <motion.div
          variants={pop(0.62)}
          className="absolute -right-3 -top-4 z-20 cursor-pointer"
          onClick={handleSecretClick}
          aria-hidden="true"
        >
          <StarsSvg className="w-8 h-8 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
        </motion.div>

        <motion.div variants={pop(0.7)} className="absolute -right-2 -bottom-4 z-10" aria-hidden="true">
          <HeartSvg className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {EasterEggModal}
    </motion.div>
  );
}

export default HeroSectionMobile;
