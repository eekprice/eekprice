import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useIsPhone } from '../../hooks/useMediaQuery';

// Horizontal strip of slides. On phones every slide is 85vw wide and snaps,
// so the next one peeks in from the right as a hint to swipe. From 640px up
// each slide keeps its own designed width, so nothing gets stretched on a
// tablet or a narrow window.

// Where slides run off the side of the strip they blur out. No white wash over
// the slide: two blur layers, a wide light one and a narrow stronger one, each
// masked so it fades toward the middle. The blur builds up toward the edge.
// They are kept narrow, about the width of the strip's side padding, so a
// slide that is sitting still stays sharp and only what is leaving gets soft.
const SIDE = {
  left: { at: 'left-0', mask: 'linear-gradient(to right, black, transparent)' },
  right: { at: 'right-0', mask: 'linear-gradient(to left, black, transparent)' },
};

const fade = 'linear-gradient(to right, transparent, black var(--edge), black calc(100% - var(--edge)), transparent)';
const EDGE_FADE = { WebkitMaskImage: fade, maskImage: fade };

function EdgeBlur({ side }) {
  const { at, mask } = SIDE[side];
  const style = { WebkitMaskImage: mask, maskImage: mask };
  const base = `absolute inset-y-0 ${at} pointer-events-none`;
  return (
    <>
      <div aria-hidden="true" className={`${base} w-8 lg:w-12 backdrop-blur-[2px]`} style={style} />
      <div aria-hidden="true" className={`${base} w-4 lg:w-6 backdrop-blur-[6px]`} style={style} />
    </>
  );
}

const CaseStudySlides = ({ slides, heightClass = 'h-64' }) => {
  const scrollContainerRef = useRef(null);
  const isMobile = useIsMobile();
  const isPhone = useIsPhone();
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
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [--edge:12px] lg:[--edge:16px]"
        // Inside the side padding the slides also thin out to nothing, so
        // there is no hard cut where the strip ends.
        style={EDGE_FADE}
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`${isPhone ? 'w-[85vw]' : `${slide.width || 'w-64'} max-w-full`} ${heightClass} shrink-0 snap-start rounded-xl`}
            whileHover={isMobile ? undefined : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {slide.content}
          </motion.div>
        ))}
      </div>

      {showLeftOverlay && <EdgeBlur side="left" />}
      {showRightOverlay && <EdgeBlur side="right" />}
    </motion.div>
  );
};

export default CaseStudySlides;
