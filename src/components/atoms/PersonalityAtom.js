import { useReducedMotion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import AboutMeContent, { aboutComments } from './AtomAboutMeContent';
import { openingSeen } from '../../data/opening';
import CommentPins from '../comments/CommentPins';
import { cursorSay } from '../CursorTag';
import { cursorLines, heroComments } from '../../data/home';
import Button from '../Button';

// Erica, 2026-11-19: the hero button says "Jump to UX Case Studies", so it
// goes to the Product Design Case Studies section. It used to say "See My
// Work" and go to the first section, Leadership Experience. If the page is
// still holding the sections back, a wheel event tells it to show them first.
const TARGET = 'case-studies';
const seeWork = () => {
  const go = () => document.getElementById(TARGET)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (document.getElementById(TARGET)) return go();
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
// The box is drawn the way a rectangle is drawn in FigJam (Erica, 2026-11-20):
// it starts at its top left corner and is dragged out to its full width and
// height. `drawDelay` is when the drag starts, in ms after the block is seen,
// and it takes DRAW_MS. The words come in after, at `revealDelay`.
const DRAW_MS = 650;
const DRAW_EASE = 'cubic-bezier(0.45, 0, 0.2, 1)';

const PersonalityScene = ({ revealDelay = 4000, drawDelay = 0, onRevealed }) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduce = useReducedMotion();
  // Back on Home after the opening has played: the text is there with no fade.
  const still = useRef(openingSeen()).current;
  const [drawn, setDrawn] = useState(still);
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
    let drawTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          drawTimer = setTimeout(() => setDrawn(true), drawDelay);
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
      clearTimeout(drawTimer);
      observer.disconnect();
    };
  }, [revealDelay, drawDelay]);

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[600px] lg:max-w-[680px]">
      <div className="flex flex-row items-start w-full">
        <div
          ref={textRef}
          // The fill, outline and corner nodes are the frame layer below. This
          // box keeps a clear border of the same width so nothing shifts.
          className="border-2 border-transparent relative flex items-center justify-center mt-0 lg:mt-4 w-full"
        >
          {/* The frame: drawn out from the top left corner to the full size. */}
          <div
            aria-hidden="true"
            className="absolute box-border pointer-events-none border-2
              bg-surface-background300-light dark:bg-surface-background300-dark
              border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark"
            style={{
              top: -2,
              left: -2,
              width: drawn ? 'calc(100% + 4px)' : 0,
              height: drawn ? 'calc(100% + 4px)' : 0,
              opacity: drawn ? 1 : 0,
              transition: still || reduce
                ? 'none'
                : `width ${DRAW_MS}ms ${DRAW_EASE}, height ${DRAW_MS}ms ${DRAW_EASE}, opacity 60ms linear`,
            }}
          >
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

          <div className="relative" style={{ opacity: isVisible ? 1 : 0, transition: still ? 'none' : 'opacity 0.5s' }}>
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
          Jump to UX Case Studies
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-6-6 6 6 6-6" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default PersonalityScene;
