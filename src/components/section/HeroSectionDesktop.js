import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactComponent as Melg } from '../../assets/melg.svg';
import PersonalityScene from '../atoms/PersonalityAtom';
import { ReactComponent as HeartSvg } from '../../assets/Heart.svg';
import { ReactComponent as StarSvg } from '../../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../../assets/Stars.svg';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import TypingEffect from '../TypingEffect';
import { MAILTO, RESUME_HREF } from '../../data/links';
import { hero } from '../../data/home';

function HeroSection() {
  const heroRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [starsSettled, setStarsSettled] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
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
        staggerChildren: 0.5,
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
      {/* Same width as the about box below so the two edges line up. */}
      <motion.div className="flex flex-row items-center gap-6 w-full max-w-[760px]" variants={itemVariants}>
        {hasAnimated && (
            <motion.div
              className="flex-shrink-0 w-48"
              initial="hidden"
              animate="visible"
              variants={melgVariants}
              transition={{ type: "spring", stiffness: 100, delay: 2 }}
            >
              {/* The SVG is 304x350; scale it to the column so the photo lines up with the text. */}
              <Melg
                className="w-full h-auto cursor-pointer"
                onClick={revealEasterEgg}
              />
            </motion.div>
        )}

        <motion.div className="flex flex-col space-y-4 flex-1 min-w-0 items-start" variants={itemVariants}>
          <div className="flex flex-row items-center justify-between w-full space-x-4 rounded-lg relative text-left">
            <motion.h1 
              className="text-3xl font-merriweather font-light z-10 text-surface-foreground100-light dark:text-surface-foreground100-dark" 
              variants={slideInFromTop}
              custom={0}
            >
              <TypingEffect text={` ${hero.greeting}`} maxBlinksAfterTyping={1} />
            </motion.h1>
          </div>
          <motion.h2 
            className="text-4xl font-merriweather font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark relative"
            variants={itemVariants}
            custom={0}
          >
            <TypingEffect
              text={hero.title}
              delay={1000}
              maxBlinksAfterTyping={6}
              onComplete={() => setShowQuickLinks(true)}
            />
            

            <motion.div
              className="absolute -right-20 top-1/2 -translate-y-1/2 cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={hasAnimated ? (starsSettled ? {
                scale: 1,
                opacity: 1,
                rotate: 0
              } : {
                scale: [0, 1.2, 0.9, 1.1, 1],
                opacity: 1,
                rotate: [0, 10, -5, 7, 0]
              }) : { scale: 0, opacity: 0 }}
              transition={{
                delay: 4.1,
                duration: 0.5,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              onAnimationComplete={() => { if (hasAnimated) setStarsSettled(true); }}
              onClick={handleSecretClick}
            >
              <StarsSvg className="w-16 h-16 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </motion.div>
          </motion.h2>
          <motion.p
            className="text-2xl font-merriweather font-light text-surface-foreground200-light dark:text-surface-foreground200-dark"
            initial={{ opacity: 0, y: -12 }}
            animate={showQuickLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subline}
          </motion.p>
          <motion.div
            className="flex flex-row items-center gap-2 text-sm font-inter font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
            initial={{ opacity: 0, y: -16 }}
            animate={showQuickLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={MAILTO}
              className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
            >
              Email
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
            >
              Resume
            </a>
            <span aria-hidden="true">•</span>
            <Link
              to="/about"
              className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
            >
              About me
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The about box sits under the whole row, centered on the page. */}
        <motion.div
          initial={{ scale: 0 }}
          animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 3,
          }}
          className="flex items-start justify-center w-full relative -mt-6 z-10"
          style={{ transformOrigin: 'top center' }}
          custom={8}
        >
          {/* Yellow star on the box's top left corner */}
            <motion.div
            className="absolute -left-8 -top-8 z-20"
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
              delay: 4.0,
              duration: 0.5,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <StarSvg className="w-16 h-16" />
          </motion.div>
          <PersonalityScene />
          <motion.div 
            className="absolute bottom-0 -right-10 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? { 
              scale: [0, 1.2, 0.9, 1.1, 1],
              opacity: 1,
              rotate: [0, 10, -5, 7, 0]
            } : { scale: 0, opacity: 0 }}
            transition={{ 
              delay: 4.2,
              duration: 0.5,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <HeartSvg className="w-16 h-16" />
          </motion.div>
        </motion.div>

      {EasterEggModal}
    </motion.div>
  );
}

export default HeroSection;
