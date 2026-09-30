import React from 'react';
import { Reveal } from './Blocks';

// The high-level view at the top of a case study: a masonry wall of photos,
// numbers, quotes, and sticky notes. CSS columns do the masonry, so tiles keep
// their natural height and just stack down each column.
//
// Tile types (set in data/caseStudies):
//   image  { src, alt, label? }
//   stat   { value, label }
//   quote  { text, who }
//   note   { text }

const card = `rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
  bg-surface-background100-light dark:bg-surface-background100-dark shadow-sm`;

const labelClass =
  'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';

const NOTE_TILT = [-1.5, 1, -0.75];

function Tile({ tile, index }) {
  if (tile.type === 'image') {
    return (
      <figure className={`${card} overflow-hidden m-0`}>
        <img src={tile.src} alt={tile.alt} loading="lazy" decoding="async" className="block w-full h-auto" />
        {tile.label && <figcaption className={`${labelClass} px-3 py-2`}>{tile.label}</figcaption>}
      </figure>
    );
  }

  if (tile.type === 'stat') {
    return (
      <div className={`${card} px-4 py-4`}>
        <p className="font-merriweather text-3xl lg:text-4xl text-surface-foreground100-light dark:text-surface-foreground100-dark">
          {tile.value}
        </p>
        <p className="mt-1 font-inter text-sm text-surface-foreground300-light dark:text-surface-foreground300-dark">
          {tile.label}
        </p>
      </div>
    );
  }

  if (tile.type === 'quote') {
    return (
      <blockquote className={`${card} px-4 py-4 m-0 bg-surface-background200-light dark:bg-surface-background200-dark`}>
        <p className="font-inter text-sm italic leading-relaxed border-l-4 pl-3
          border-surface-outline-light dark:border-surface-outline-dark
          text-surface-foreground100-light dark:text-surface-foreground100-dark">
          "{tile.text}"
        </p>
        <footer className="mt-2 font-inter text-sm text-surface-foreground300-light dark:text-surface-foreground300-dark">
          {tile.who}
        </footer>
      </blockquote>
    );
  }

  if (tile.type === 'note') {
    return (
      <div
        className="rounded-md px-4 py-4 shadow-md font-inter text-sm leading-relaxed
          bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark
          text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark"
        style={{ transform: `rotate(${NOTE_TILT[index % NOTE_TILT.length]}deg)` }}
      >
        {tile.text}
      </div>
    );
  }

  return null;
}

function Overview({ tiles }) {
  return (
    <section aria-label="At a glance" className="max-w-[1000px] mx-auto px-4 pb-4">
      <div className="columns-2 lg:columns-3 gap-3 lg:gap-4">
        {tiles.map((tile, i) => (
          <Reveal key={i} className="mb-3 lg:mb-4 break-inside-avoid">
            <Tile tile={tile} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Overview;
