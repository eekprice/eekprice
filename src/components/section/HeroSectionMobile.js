import { openingSeen } from '../../data/opening';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as Mesm } from '../../assets/mesm.svg';
import PersonalityScene from '../atoms/PersonalityAtom';
import { ReactComponent as HeartSvg } from '../../assets/Heart.svg';
import { ReactComponent as StarSvg } from '../../assets/Star.svg';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import TypingEffect from '../TypingEffect';
import { Underline } from '../sketch/Sketch';
import { useHeroCopy } from '../../data/heroCopy';

// Phone hero: one centered column. Avatar, small greeting, the role as the one
// big line, small subline, then the about box. Email, Resume, and About live
// in the nav, so there's no link row here. The star and heart are pinned to
// the box's right corners, same as desktop. Everything is on screen within
// about 1.5s of mount.

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.05, staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};
// The about box draws itself out from its top left corner (PersonalityScene),
// so its wrapper only has to be there.
const box = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
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


// `onReady` fires when the about text has faded in, the last big piece to arrive.
// `instant` drops the short wait before the about text, for a visitor who
// arrived on a link to a section further down.
function HeroSectionMobile({ onReady, instant = false }) {
  const hero = useHeroCopy();
  const { handleSecretClick, EasterEggModal } = useEasterEgg();
  const heroRef = useRef(null);
  // Back on Home after the opening has played: the hero starts finished.
  const still = useRef(openingSeen()).current;
  const [hasAnimated, setHasAnimated] = useState(still);
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
      className="w-full max-w-md sm:max-w-xl mx-auto flex flex-col items-center px-2 sm:px-4 pt-6 pb-4 text-center"
      initial={still ? false : 'hidden'}
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
        className="mt-3 text-base font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
      >
        <TypingEffect text={hero.greeting} maxBlinksAfterTyping={1} instant={!!reduceMotion || instant} />
      </motion.h1>

      <motion.h2
        variants={item}
        className="mt-1 text-2xl sm:text-4xl font-merriweather font-normal leading-tight break-words text-surface-foreground100-light dark:text-surface-foreground100-dark"
      >
        {/* The marker underline draws right after the title has faded in. */}
        <Underline bold tone="teal" wrap show={hasAnimated} delay={reduceMotion ? 0 : 600}>
          <TypingEffect text={hero.title} instant />
        </Underline>
      </motion.h2>

      <motion.p
        variants={item}
        className="mt-4 text-base font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
      >
        {hero.subline}
      </motion.p>

      <motion.div variants={box} className="relative w-full mt-7" style={{ transformOrigin: 'top center' }}>
        <PersonalityScene
          drawDelay={reduceMotion || instant ? 0 : 450}
          revealDelay={reduceMotion || instant ? 0 : 1050}
          onRevealed={onReady}
        />

        <motion.div variants={pop(0.55)} className="absolute -right-3 -top-4 z-20" aria-hidden="true">
          <StarSvg className="w-8 h-8" />
        </motion.div>

        <motion.div variants={pop(0.7)} className="absolute -right-3 -bottom-4 z-10" aria-hidden="true">
          <HeartSvg className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {EasterEggModal}
    </motion.div>
  );
}

export default HeroSectionMobile;
