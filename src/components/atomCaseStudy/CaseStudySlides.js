import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CaseStudySlides = ({ slides, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftOverlay(scrollLeft > 0);
        setShowRightOverlay(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="max-w-[1200px] mx-auto relative pb-4"
      initial="hidden"
      animate="visible"
      variants={slideVariants}
    >
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 relative"
      >
        <div className="flex space-x-4 w-max p-4">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`${slide.width || 'w-64'} h-64 flex-shrink-0 rounded-lg flex items-center justify-center cursor-pointer transition-shadow`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {slide.content}
            </motion.div>
          ))}
        </div>
      </div>
      
      {showLeftOverlay && (
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      )}
      {showRightOverlay && (
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
};

export default CaseStudySlides;
