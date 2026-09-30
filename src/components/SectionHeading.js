import React from 'react';

// Centered Merriweather heading with a thin blue rule on each side.
// `lines={false}` drops the rules. Children passed as `stickers` are
// positioned absolutely around the heading (emoji, svg doodles).
function SectionHeading({ children, lines = true, stickers = null, id }) {
  const rule = 'hidden sm:block flex-1 h-px bg-blockHighlight-outlineSurface-light dark:bg-blockHighlight-outlineSurface-dark';
  return (
    <div className="relative flex items-center gap-4 mb-8 lg:mb-10">
      {lines && <span className={rule} aria-hidden="true" />}
      <h2
        id={id}
        className="w-full sm:w-auto text-center text-2xl lg:text-3xl font-merriweather font-normal
          text-surface-foreground100-light dark:text-surface-foreground100-dark"
      >
        {children}
      </h2>
      {lines && <span className={rule} aria-hidden="true" />}
      {stickers}
    </div>
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
