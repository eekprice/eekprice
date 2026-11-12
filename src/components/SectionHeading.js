import React from 'react';
import { Stage } from './sketch/Sketch';

// Centered Merriweather heading with a thin blue rule on each side.
// `lines={false}` drops the rules. Children passed as `stickers` are
// positioned absolutely around the heading (emoji, svg doodles).
//
// Wire first (design system): the first time it is seen, a pencil squiggle
// wipes in where the words go and both rules grow outward. Then the squiggle
// fades and the real heading rises into its place. The motion is the sk-
// classes in styles/sketch.css. With reduced motion on, the heading is
// simply there.
const SKETCH = { '--sk-at': '0ms', '--sk-hold': '700ms' };

function SectionHeading({ children, lines = true, stickers = null, id }) {
  const rule = 'hidden sm:block sk-heading__rule';

  return (
    <Stage className="relative flex items-center gap-4 mb-8 lg:mb-10" amount={0.6}>
      {lines && <span className={`${rule} sk-heading__rule--left`} aria-hidden="true" />}
      <div className="sk-swap w-full sm:w-auto" style={SKETCH}>
        <span className="sk-swap__wire flex items-center justify-center" aria-hidden="true">
          {/* About as wide as the words: the box is full width on a phone and hugs the text from 640px up. */}
          <span className="sk-squiggle w-[70%] sm:w-[88%]" style={{ '--sk-delay': '100ms' }} />
        </span>
        <h2
          id={id}
          className="sk-swap__real text-center text-2xl lg:text-3xl font-merriweather font-normal
            text-surface-foreground100-light dark:text-surface-foreground100-dark"
        >
          {children}
        </h2>
      </div>
      {lines && <span className={`${rule} sk-heading__rule--right`} aria-hidden="true" />}
      {stickers}
    </Stage>
  );
}

// An emoji used as a sticker: tilted, with a soft shadow.
export function EmojiSticker({ children, className = '', rotate = 0 }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute select-none text-2xl lg:text-3xl drop-shadow-md ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

export default SectionHeading;
