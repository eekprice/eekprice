import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AboutMeContent from './AtomAboutMeContent';
import YouTubeCard from '../atoms/youTubeThumnail';

const PersonalityScene = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

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

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="flex items-start justify-start max-w-2xl mx-auto p-6">
      <div className="flex flex-row items-start gap-6">
        <h2
          ref={textRef}
          className={`text-4xl font-bold transition-transform duration-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'opacity-0'
          }`}
        >
          <motion.div
            initial={{ scale: 0.05, opacity: 0, originX: 0, originY: 0 }}
            animate={{ scale: isVisible ? 1 : 0.05, opacity: isVisible ? 1 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 3,
            }}
            className="bg-surface-background300-light dark:bg-surface-background300-dark border-2 
            border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
            relative flex items-center justify-center p-4 m-15"
          >
            {/* Text inside the Purple Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0, delay: 3.8 }}
            >
              <AboutMeContent />
            </motion.div>

            {/* Corner Nodes */}
            <div className="absolute w-2 h-2 border-2
             bg-blockHighlight-outlineFill-light dark:bg-blockHighlight-outlineFill-dark
              border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
              rounded-full" style={{ top: '-5px', left: '-5px' }}></div>
            <div className="absolute w-2 h-2 border-2
             bg-blockHighlight-outlineFill-light dark:bg-blockHighlight-outlineFill-dark
              border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
              rounded-full" style={{ top: '-5px', right: '-5px' }}></div>
            <div className="absolute w-2 h-2 border-2
             bg-blockHighlight-outlineFill-light dark:bg-blockHighlight-outlineFill-dark
              border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
              rounded-full" style={{ bottom: '-5px', left: '-5px' }}></div>
            <div className="absolute w-2 h-2 border-2
             bg-blockHighlight-outlineFill-light dark:bg-blockHighlight-outlineFill-dark
              border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
              rounded-full" style={{ bottom: '-5px', right: '-5px' }}></div>
          </motion.div>
        </h2>
        <YouTubeCard 
          videoId="X6M0LBz8Xv8" 
          title="Sample Video Title" 
          thumbnailUrl="https://img.youtube.com/vi/X6M0LBz8Xv8/0.jpg" 
        />
      </div>
    </div>
  );
};

export default PersonalityScene; 