import React, { useRef, useState, useEffect } from 'react';
import AboutMeContent from './AtomAboutMeContent';

const PersonalityScene = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 4000);
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
  }, []);

  return (
    <div className="flex items-start justify-start max-w-[600px] ">
      <div className="flex flex-row items-start ">
        <div
          ref={textRef}
          className="bg-surface-background300-light dark:bg-surface-background300-dark border-2 
          border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
          relative flex items-center justify-center mt-0 md:mt-4 "
        >
          <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
            <AboutMeContent />
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default PersonalityScene; 