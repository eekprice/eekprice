import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as HeroPattern } from '../../assets/hero-pattern.svg';
import { ReactComponent as Melg } from '../../assets/melg.svg';
import { ReactComponent as Mesm } from '../../assets/mesm.svg';
import Nav from '../Nav';
import PersonalityScene from '../atoms/PersonalityAtom';

function HeroSection() {
  const [isSmall, setIsSmall] = useState(false);
  const heroRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const blinkEffect = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0, 1, 0, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const melgVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  function TypingEffect({ text, delay = 0, maxBlinksAfterTyping = 6 }) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(false);
    const [typingComplete, setTypingComplete] = useState(false);
    const typingSpeed = 50; // typing speed in milliseconds
    const [blinkCount, setBlinkCount] = useState(0);

    useEffect(() => {
      const startTyping = () => {
        let index = 0;
        setShowCursor(true);
        const interval = setInterval(() => {
          setDisplayedText((prev) => {
            if (index < text.length) {
              return prev + text[index];
            }
            return prev;
          });
          index++;
          if (index === text.length) {
            clearInterval(interval);
            setTypingComplete(true);
          }
        }, typingSpeed);
      };

      const delayTimeout = setTimeout(startTyping, delay);

      // Cleanup interval and timeout on component unmount
      return () => {
        clearInterval(delayTimeout);
      };
    }, [text, delay]);

    useEffect(() => {
      if (typingComplete) {
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
          setBlinkCount((prev) => prev + 1);
        }, 500); // Cursor blink speed

        if (blinkCount >= maxBlinksAfterTyping) {
          clearInterval(cursorInterval);
          setShowCursor(false); // Hide cursor after max blinks
        }

        return () => clearInterval(cursorInterval);
      }
    }, [typingComplete, blinkCount, maxBlinksAfterTyping]);

    return (
      <span>
        {displayedText}
        {showCursor && <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>}
      </span>
    );
  }

  return (
    <motion.div
      ref={heroRef}
      className="w-full flex items-start justify-center relative mt-10"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
    

      <motion.div className="flex flex-row items-start space-x-8" variants={itemVariants}>
        {hasAnimated && (
          isSmall ? (
            <div className="border-2 border-[#003347] rounded-full">
              <Mesm 
                className="w-24 h-24 cursor-pointer"
                onClick={() => setIsSmall(false)}
              />
            </div>
          ) : (
            <motion.div
              className="border-black p-2"
              initial="hidden"
              animate="visible"
              variants={melgVariants}
              transition={{ type: "spring", stiffness: 100, delay: 2 }}
            >
              <Melg 
                className="cursor-pointer -mt-10 -mb-10 -ml-16"
                onClick={() => setIsSmall(true)}
              />
            </motion.div>
          )
        )}

        <motion.div className=" flex flex-col space-y-4 w-full items-left" variants={itemVariants}>
          <div className="flex items-center justify-between w-full space-x-4 rounded-lg relative text-left">
            <motion.h1 
              className="pt-8 text-3xl font-merriweather font-light z-10 text-surface-foreground100-light dark:text-surface-foreground100-dark" 
              variants={slideInFromTop}
              custom={0}
            >
              <TypingEffect text=" I'm Erica" maxBlinksAfterTyping={1} />
            </motion.h1>

            <div className="flex space-x-2">
              <motion.div 
                className="text-sm inline-block
                 bg-surface-background200-light dark:bg-surface-background200-dark 
                 border border-surface-outline-light dark:border-surface-outline-dark 
                 text-surface-foreground100-light dark:text-surface-foreground100-dark 
                 rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={5}
              >
                Optimistic
              </motion.div>
              <motion.div 
                className="text-sm inline-block
                 bg-surface-background200-light dark:bg-surface-background200-dark 
                 border border-surface-outline-light dark:border-surface-outline-dark 
                 text-surface-foreground100-light dark:text-surface-foreground100-dark 
                 rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={6}
              >
                Animated
              </motion.div>
              <motion.div 
                className="text-sm inline-block 
                bg-surface-background200-light dark:bg-surface-background200-dark 
                border border-surface-outline-light dark:border-surface-outline-dark
                 text-surface-foreground100-light dark:text-surface-foreground100-dark 
                 rounded-lg shadow-sm px-1"
                variants={itemVariants}
                custom={7}
              >
                Strategic
              </motion.div>
            </div>
          </div>
          <motion.h2 
            className="text-5xl font-merriweather font-normal text-text-primary text-surface-foreground100-light dark:text-surface-foreground100-dark" 
            variants={itemVariants}
            custom={0}
          >
            <TypingEffect text="A Product Design Manager" delay={1000} maxBlinksAfterTyping={6} />
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 3,
            }}
            className="flex items-start justify-start w-full h-full"
            style={{ transformOrigin: 'top left' }}
            custom={8}
          >
            <PersonalityScene />
          </motion.div>
          
            

          
          
        </motion.div>
      </motion.div>


    </motion.div>
  );
}

export default HeroSection;
