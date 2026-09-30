import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Horizontal strip of slides. On phones every slide is 85vw wide and snaps,
// so the next one peeks in from the right as a hint to swipe.
const CaseStudySlides = ({ slides, heightClass = 'h-64' }) => {
  const scrollContainerRef = useRef(null);
  const isMobile = useIsMobile();
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftOverlay(scrollLeft > 4);
      setShowRightOverlay(scrollLeft < scrollWidth - clientWidth - 4);
    };

    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeBase = 'absolute top-0 h-full w-8 lg:w-16 pointer-events-none to-transparent';

  return (
    <motion.div
      className="max-w-[1200px] mx-auto relative pb-2 lg:pb-4"
      initial="hidden"
      animate="visible"
      variants={slideVariants}
    >
      <div
        ref={scrollContainerRef}
        className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-3 lg:scroll-px-4 px-3 lg:px-4 py-3
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`${isMobile ? 'w-[85vw]' : (slide.width || 'w-64')} ${heightClass} shrink-0 snap-start rounded-lg flex items-center justify-center`}
            whileHover={isMobile ? undefined : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {slide.content}
          </motion.div>
        ))}
      </div>

      {showLeftOverlay && (
        <div className={`${fadeBase} left-0 bg-gradient-to-r from-surface-background100-light dark:from-surface-background100-dark`} />
      )}
      {showRightOverlay && (
        <div className={`${fadeBase} right-0 bg-gradient-to-l from-surface-background100-light dark:from-surface-background100-dark`} />
      )}
    </motion.div>
  );
};

export default CaseStudySlides;
