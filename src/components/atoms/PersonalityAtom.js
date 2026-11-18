import React, { useRef, useState, useEffect } from 'react';
import AboutMeContent, { aboutComments } from './AtomAboutMeContent';
import CommentPins from '../comments/CommentPins';
import { cursorSay } from '../CursorTag';
import { cursorLines, heroComments } from '../../data/home';
import Button from '../Button';

// The work starts at the first section under the hero. If the page is still
// holding the sections back, a wheel event tells it to show them, then we scroll.
const seeWork = () => {
  const go = () => document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (document.getElementById('leadership')) return go();
  window.dispatchEvent(new Event('wheel'));
  setTimeout(go, 120);
};

// The outlined "selected block" that holds the about text. The text fades in
// `revealDelay` ms after the block scrolls into view. Desktop keeps the long
// pause so it lands after the hero choreography; mobile passes something short.
// The text is the last big piece of the hero to arrive, so `onRevealed` is how
// the page knows the hero is done.
//
// The rest of the bio is posted as comments once the text is in: pins on the
// box's bottom edge, each one opening a paragraph to read. The first time one
// is opened, the desktop cursor says a line about it.
const PersonalityScene = ({ revealDelay = 4000, onRevealed }) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const revealed = useRef(onRevealed);
  revealed.current = onRevealed;
  const saidIt = useRef(false);

  const onCommentOpen = () => {
    if (saidIt.current) return;
    saidIt.current = true;
    cursorSay(cursorLines.reader);
  };

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
    <div className="flex flex-col items-start justify-start w-full max-w-[600px] lg:max-w-[680px]">
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

          {/* Half on the box, half on the canvas, like a pin dropped on a frame. */}
          <CommentPins
            comments={aboutComments}
            meta={heroComments}
            show={isVisible}
            onOpen={onCommentOpen}
            className="absolute left-3 lg:left-4 bottom-0 translate-y-1/2 z-30"
          />

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

      {/* The one way into the work from the hero. It arrives a beat after the
          about text, when the sections under the hero are on the page, and
          scrolls to the first of them. It sits in the middle: the comment pins
          have the left corner and the heart has the right one. */}
      <div
        className="mt-7 w-full flex justify-center"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s 0.9s', pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <Button onClick={seeWork}>
          See my work
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6 6 6 6-6" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default PersonalityScene;
