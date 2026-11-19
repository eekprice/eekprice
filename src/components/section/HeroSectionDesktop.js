import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as Melg } from '../../assets/melg.svg';
import PersonalityScene from '../atoms/PersonalityAtom';
import { ReactComponent as HeartSvg } from '../../assets/Heart.svg';
import { ReactComponent as StarSvg } from '../../assets/Star.svg';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import TypingEffect from '../TypingEffect';
import { Underline } from '../sketch/Sketch';
import { useHeroCopy } from '../../data/heroCopy';

// When each piece of the hero starts, in seconds after the hero appears.
// Change the opening's pace here. The title types at 50ms a letter, so it
// lands about 1.3s after `title`. With these numbers the hero is done in
// about 2.3 seconds (it used to take 4.7).
const START = {
  photo: 0.15, // slides in from the left
  title: 0.25, // starts typing. The underline and subline follow the last letter.
  box: 0.9, // the about box grows from its top edge
  aboutText: 1.6, // the words in the box fade in
  star: 1.7,
  heart: 1.85,
};

// With `instant`, nothing waits its turn: every piece starts at once.
const AT_ONCE = { photo: 0, title: 0, box: 0, aboutText: 0, star: 0, heart: 0 };

// `onReady` fires when the about text has faded in, the last big piece to arrive.
// `instant` skips the choreography, for a visitor who arrived on a link to a
// section further down. The pieces still settle in, all together, with no typing.
function HeroSection({ onReady, instant = false }) {
  const hero = useHeroCopy();
  const at = instant ? AT_ONCE : START;
  const heroRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [starsSettled, setStarsSettled] = useState(false);
  // Once the heart has popped in it stays put. Without this, any re-render
  // (like opening the easter egg) replays the pop-in and hides it for 4s.
  const [heartSettled, setHeartSettled] = useState(false);
  const [showSubline, setShowSubline] = useState(false);
  const { handleSecretClick, EasterEggModal } = useEasterEgg();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const node = heroRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom === 2 ? 2 : custom * 0.5,
      },
    }),
  };

  const slideInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const melgVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const revealEasterEgg = () => {
    handleSecretClick();
  };

  return (
    <motion.div
      ref={heroRef}
      className="w-full max-w-[880px] mx-auto flex flex-col items-center relative mt-16 px-8 pt-8"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Photo and text. Same width as the about box below, and the photo's
          left edge sits on the box's left edge, so everything hangs off one line. */}
      <motion.div className="flex flex-row items-center gap-6 w-full max-w-[680px]" variants={itemVariants}>
        {hasAnimated && (
            <motion.div
              className="flex-shrink-0 w-40 -ml-[46px]"
              initial="hidden"
              animate="visible"
              variants={melgVariants}
              transition={{ type: "spring", stiffness: 100, delay: at.photo }}
            >
              {/* The SVG is 304x350 and the photo itself starts 88px in (the blob
                  and squiggle sit left of it). At w-40 that's 46px, so the
                  negative margin lets the doodles hang outside the shared edge. */}
              <Melg
                className="w-full h-auto cursor-pointer"
                onClick={revealEasterEgg}
              />
            </motion.div>
        )}

        {/* One big line (the role). The greeting and subline are small and sans. */}
        <motion.div className="flex flex-col flex-1 min-w-0 items-start text-left" variants={itemVariants}>
          <motion.h1
            className="text-lg font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
            variants={slideInFromTop}
            custom={0}
          >
            <TypingEffect text={hero.greeting} maxBlinksAfterTyping={1} instant={instant} />
          </motion.h1>
          <motion.h2
            className="mt-1 text-[2.375rem] leading-tight font-merriweather font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark"
            variants={itemVariants}
            custom={0}
          >
            {/* The marker underline draws once the last letter lands. */}
            <Underline bold tone="teal" show={showSubline}>
              <TypingEffect
                text={hero.title}
                delay={at.title * 1000}
                instant={instant}
                maxBlinksAfterTyping={6}
                onComplete={() => setShowSubline(true)}
              />
            </Underline>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
            initial={{ opacity: 0, y: -12 }}
            animate={showSubline ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subline}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* The about box, centered on the page, with a clear gap under the row.
          The star and heart are pinned to its right corners. */}
        <motion.div
          initial={{ scale: 0 }}
          animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: at.box,
          }}
          className="flex items-start justify-center w-full max-w-[680px] relative -mt-2 z-10"
          style={{ transformOrigin: 'top center' }}
          custom={8}
        >
          {/* Yellow star, centered on the box's top right corner */}
          <motion.div
            className="absolute -right-5 -top-1 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? (starsSettled ? {
              scale: 1,
              opacity: 1,
              rotate: 0
            } : {
              scale: [0, 1.2, 0.9, 1.1, 1],
              opacity: 1,
              rotate: [0, -10, 5, -7, 0]
            }) : { scale: 0, opacity: 0 }}
            transition={{
              delay: at.star,
              duration: 0.5,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            onAnimationComplete={() => { if (hasAnimated) setStarsSettled(true); }}
          >
            <StarSvg className="w-10 h-10" />
          </motion.div>
          <PersonalityScene revealDelay={at.aboutText * 1000} onRevealed={onReady} />
          <motion.div 
            className="absolute -bottom-6 -right-6 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? (heartSettled ? {
              scale: 1,
              opacity: 1,
              rotate: 0
            } : {
              scale: [0, 1.2, 0.9, 1.1, 1],
              opacity: 1,
              rotate: [0, 10, -5, 7, 0]
            }) : { scale: 0, opacity: 0 }}
            transition={heartSettled ? { duration: 0 } : {
              delay: at.heart,
              duration: 0.5,
              type: "spring",
              stiffness: 300
            }}
            onAnimationComplete={() => { if (hasAnimated) setHeartSettled(true); }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <HeartSvg className="w-12 h-12" />
          </motion.div>
        </motion.div>

      {EasterEggModal}
    </motion.div>
  );
}

export default HeroSection;
