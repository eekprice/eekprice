import React, { useRef, useState, useEffect } from 'react';
import AboutMeContent from './AtomAboutMeContent';

// The outlined "selected block" that holds the about text. The text fades in
// `revealDelay` ms after the block scrolls into view. Desktop keeps the long
// pause so it lands after the hero choreography; mobile passes something short.
// The text is the last big piece of the hero to arrive, so `onRevealed` is how
// the page knows the hero is done.
const PersonalityScene = ({ revealDelay = 4000, onRevealed }) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const revealed = useRef(onRevealed);
  revealed.current = onRevealed;

  useEffect(() => {
    const node = textRef.current;
    if (!node) return undefined;
    let timer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setTimeout(() => {
            setIsVisible(true);
            revealed.current?.();
          }, revealDelay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [revealDelay]);

  return (
    <div className="flex items-start justify-start w-full max-w-[600px] lg:max-w-[680px]">
      <div className="flex flex-row items-start w-full">
        <div
          ref={textRef}
          className="bg-surface-background300-light dark:bg-surface-background300-dark border-2
          border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
          relative flex items-center justify-center mt-0 lg:mt-4 w-full"
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
