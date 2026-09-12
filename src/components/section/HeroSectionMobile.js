import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as Melg } from '../../assets/melg.svg';
import PersonalityScene from '../atoms/PersonalityAtom';
import { ReactComponent as HeartSvg } from '../../assets/Heart.svg';
import { ReactComponent as StarSvg } from '../../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../../assets/Stars.svg';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import TypingEffect from '../TypingEffect';

function HeroSectionMobile() {
  const { handleSecretClick, EasterEggModal } = useEasterEgg();
  const heroRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [starsSettled, setStarsSettled] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
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

  return (
    <motion.div
      ref={heroRef}
      className="w-full flex flex-col items-center justify-center relative  p-2"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="flex flex-row items-center space-y-4" variants={itemVariants}>
        {hasAnimated && (
            <motion.div
              className="border-black p-2 flex-shrink-0"
              initial="hidden"
              animate="visible"
              variants={melgVariants}
              transition={{ type: "spring", stiffness: 100, delay: 2 }}
            >
              <Melg 
                className="w-48 -mt-10 -mb-10 -ml-16 cursor-pointer"
                onClick={handleSecretClick}
              />
            </motion.div>
        )}

        <motion.div className="flex flex-col space-y-2 w-full items-center" variants={itemVariants}>
          <div className="flex flex-row items-center justify-between w-full gap-2 rounded-lg relative text-left">
            <motion.h1 
              className="flex-shrink-0 text-xl font-merriweather font-light z-10 text-surface-foreground100-light dark:text-surface-foreground100-dark" 
              variants={slideInFromTop}
              custom={0}
            >
              <TypingEffect text=" I'm Erica" maxBlinksAfterTyping={1} />
            </motion.h1>
            <div className="flex flex-row flex-nowrap items-center justify-end min-w-0 gap-1">
              <motion.div
                className="text-xs whitespace-nowrap bg-surface-background200-light dark:bg-surface-background200-dark border border-surface-outline-light dark:border-surface-outline-dark text-surface-foreground100-light dark:text-surface-foreground100-dark rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={5}
              >
                Optimistic
              </motion.div>
              <motion.div
                className="text-xs whitespace-nowrap bg-surface-background200-light dark:bg-surface-background200-dark border border-surface-outline-light dark:border-surface-outline-dark text-surface-foreground100-light dark:text-surface-foreground100-dark rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={6}
              >
                Animated
              </motion.div>
              <motion.div
                className="text-xs whitespace-nowrap bg-surface-background200-light dark:bg-surface-background200-dark border border-surface-outline-light dark:border-surface-outline-dark text-surface-foreground100-light dark:text-surface-foreground100-dark rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={7}
              >
                Strategic
              </motion.div>
            </div>
          </div>
          <motion.h2 
            className="self-start text-2xl font-merriweather font-normal text-text-primary text-surface-foreground100-light dark:text-surface-foreground100-dark" 
            variants={itemVariants}
            custom={0}
          >
            <TypingEffect
              text="A Product Design Manager"
              delay={1000}
              maxBlinksAfterTyping={6}
              onComplete={() => setShowQuickLinks(true)}
            />
          </motion.h2>
          <motion.div
            className="self-start flex flex-row items-center gap-2 text-sm font-int font-normal text-surface-foreground200-light dark:text-surface-foreground200-dark"
            initial={{ opacity: 0, y: -16 }}
            animate={showQuickLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="mailto:hello@ericaprice.com"
              className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
            >
              Email
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          delay: 3,
        }}
        className="flex items-center justify-center w-full h-full -mt-10 relative px-10"
        style={{ transformOrigin: 'top left' }}
        custom={8}
      >
        <div className="relative">
          <motion.div
            className="absolute -left-8 top-6 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? (starsSettled ? { scale: 1, opacity: 1, rotate: 0 } : {
              scale: [0, 1.2, 0.9, 1.1, 1],
              opacity: 1,
              rotate: [0, -10, 5, -7, 0]
            }) : { scale: 0, opacity: 0 }}
            transition={{ delay: 4.0, duration: 0.5, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <StarSvg className="w-10 h-10" />
          </motion.div>
          <PersonalityScene />
          <motion.div
            className="absolute -top-3 -right-3 z-20 cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? (starsSettled ? { scale: 1, opacity: 1, rotate: 0 } : {
              scale: [0, 1.2, 0.9, 1.1, 1],
              opacity: 1,
              rotate: [0, 10, -5, 7, 0]
            }) : { scale: 0, opacity: 0 }}
            transition={{ delay: 4.1, duration: 0.5, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            onAnimationComplete={() => { if (hasAnimated) setStarsSettled(true); }}
            onClick={handleSecretClick}
          >
            <StarsSvg className="w-10 h-10 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
          </motion.div>
        </div>
        <motion.div
          className="absolute right-4 bottom-0 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={hasAnimated ? {
            scale: [0, 1.2, 0.9, 1.1, 1],
            opacity: 1,
            rotate: [0, 10, -5, 7, 0]
          } : { scale: 0, opacity: 0 }}
          transition={{ delay: 4.2, duration: 0.5, type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <HeartSvg className="w-10 h-10" />
        </motion.div>
      </motion.div>
      {EasterEggModal}
    </motion.div>
  );
}

export default HeroSectionMobile;
