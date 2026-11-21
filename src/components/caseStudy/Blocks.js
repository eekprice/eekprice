import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { land } from '../sketch/motion';
import Diagram from './Diagrams';
import ExternalLink from '../ExternalLink';
import MenuPrototype from './MenuPrototype';
import ControlledGif from '../atoms/ControlledGif';

// Building blocks for a case study page, styled like the rest of the site:
// Merriweather body, outlined "selected" boxes, sticky notes, quote callouts.

export const bodyClass =
  'font-merriweather text-[15px] lg:text-base leading-relaxed text-surface-foreground300-light dark:text-surface-foreground300-dark';

// Small tag chip, used for case study tags and the activity list on slides.
export const chipClass = `text-xs px-1.5 py-0.5 whitespace-nowrap rounded-lg shadow-sm font-inter
  bg-surface-background200-light dark:bg-surface-background200-dark
  border border-surface-outline-light dark:border-surface-outline-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark`;

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Fades a block in the first time it reaches the viewport. Anything already
// at or above the bottom edge counts as reached, so a fast fling past a block
// never leaves it invisible.
function useReached(ref) {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reached) return undefined;

    const check = () => {
      const top = node.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.95) setReached(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setReached(true); },
      { threshold: 0 }
    );
    observer.observe(node);
    window.addEventListener('scroll', check, { passive: true });
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', check);
    };
  }, [ref, reached]);

  return reached;
}

export function Reveal({ children, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const reached = useReached(ref);
  const show = reduce || reached;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={rise}
      initial={reduce ? 'visible' : 'hidden'}
      animate={show ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

// The blue outlined block with corner nodes, same as the about box on the home page.
export function OutlinedBlock({ children, className = '' }) {
  const node =
    'absolute w-2 h-2 border-2 rounded-full bg-blockHighlight-outlineFill-light dark:bg-blockHighlight-outlineFill-dark border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark';
  return (
    <div
      className={`relative border-2 border-blockHighlight-outlineSurface-light dark:border-blockHighlight-outlineSurface-dark
        bg-surface-background300-light dark:bg-surface-background300-dark ${className}`}
    >
      {children}
      <span className={node} style={{ top: -5, left: -5 }} aria-hidden="true" />
      <span className={node} style={{ top: -5, right: -5 }} aria-hidden="true" />
      <span className={node} style={{ bottom: -5, left: -5 }} aria-hidden="true" />
      <span className={node} style={{ bottom: -5, right: -5 }} aria-hidden="true" />
    </div>
  );
}

// `link` adds a link after the words: { label, href, preview }. It leaves
// the site, so it gets the new-tab icon, and a hover preview when it has one.
export function Paragraph({ text, link }) {
  return (
    <p className={bodyClass}>
      {text}
      {link && (
        <>
          {' '}
          <ExternalLink
            href={link.href}
            preview={link.preview}
            className="text-surface-foreground100-light dark:text-surface-foreground100-dark
              hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark"
          >
            {link.label}
          </ExternalLink>
        </>
      )}
    </p>
  );
}

// No box, border or drop shadow (Erica's call): most of these are cut-out
// PNG collages, and a box around them showed up as an empty white panel.
// `invert` flips a black-on-transparent graphic to light in dark mode.
// `maxWidth` (px) keeps a tall screenshot from filling the column, and
// `frame` gives a white screenshot a thin edge so it reads on the dot grid.
export function Figure({ src, alt, caption, invert = false, maxWidth, frame = false }) {
  return (
    <Reveal>
      <figure className={`my-2 ${maxWidth ? 'mx-auto' : ''}`} style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-auto rounded-lg ${invert ? 'dark:invert' : ''}
            ${frame ? 'border border-surface-outline-light dark:border-surface-outline-dark' : ''}`}
        />
        {caption && (
          <figcaption className={`mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark ${maxWidth ? 'text-center' : ''}`}>
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

// Two or more pictures side by side at the same height (Erica, 2026-11-21:
// "make these two photos horizontal aligned"). Each item is a figure with a
// `ratio` (width / height), which sets how much of the row it takes. On a
// phone they stack.
export function FigureRow({ items }) {
  return (
    <Reveal>
      <div className="my-2 flex flex-col sm:flex-row sm:items-start gap-4">
        {items.map((item) => (
          <figure key={item.src} className="m-0 min-w-0 sm:[flex:var(--r)_1_0%]" style={{ '--r': item.ratio || 1 }}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="block w-full h-auto rounded-lg" />
            {item.caption && (
              <figcaption className="mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

// A screen recording in the write-up. It shows a still frame and a play
// button, and plays on a tap, so it does not run while someone is reading.
// `ratio` is the recording's width / height. Shown whole, on black, no wider
// than `maxWidth` (the recording's own width) so it is not blown up.
// `center` puts a narrow recording, like a phone, in the middle of the column.
export function Clip({ src, poster, alt, caption, ratio = 16 / 9, maxWidth, center = false }) {
  return (
    <Reveal>
      <figure className="my-2">
        <div
          className={`relative w-full overflow-hidden rounded-lg bg-black ${center ? 'mx-auto' : ''}`}
          style={{ aspectRatio: `${ratio}`, maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
        >
          <ControlledGif src={src} poster={poster} alt={alt} className="w-full h-full object-contain" />
        </div>
        {caption && (
          <figcaption className={`mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark ${center ? 'text-center' : ''}`}>
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

const PersonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z" />
  </svg>
);

// A quote with a named person, the Framer page treatment Erica liked: a soft
// gray panel, a teal quote mark, the words set large, and the person's Teams
// contact card (the real screenshot, at its own size) tucked into the bottom
// right. `person` is { card, alt }.
function PersonQuote({ text, person }) {
  return (
    <Reveal>
      <figure
        className="relative mt-6 rounded-3xl px-5 py-6 sm:px-8 sm:py-8
          bg-surface-background200-light dark:bg-surface-background200-dark"
      >
        <div className="flex gap-3 sm:gap-4">
          <span className="shrink-0 font-inter font-bold text-4xl leading-none text-teal-400 select-none" aria-hidden="true">
            "
          </span>
          <blockquote className="m-0 font-inter text-lg lg:text-xl leading-loose text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {text}&rdquo;
          </blockquote>
        </div>
        <figcaption className="mt-5">
          <img src={person.card} alt={person.alt} className="block w-full h-auto max-w-[574px] sm:ml-auto" />
        </figcaption>
      </figure>
    </Reveal>
  );
}

// Quote callout: bordered card with a little avatar badge, like the old site.
// With a `person` ({ card, alt }) it uses the panel and the contact card image.
export function Quote({ text, who, person }) {
  if (person) return <PersonQuote text={text} person={person} />;
  return (
    <Reveal>
      <blockquote
        className="relative mt-6 rounded-lg border-2 border-primary-outline-light dark:border-primary-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark
          px-5 pt-7 pb-4 shadow-sm"
      >
        <span
          className="absolute -top-5 left-4 w-10 h-10 rounded-full flex items-center justify-center
            bg-surface-background100-light dark:bg-surface-background100-dark
            border-2 border-primary-outline-light dark:border-primary-outline-dark
            text-surface-foreground100-light dark:text-surface-foreground100-dark"
          aria-hidden="true"
        >
          <PersonIcon className="w-5 h-5" />
        </span>
        <p className="font-inter text-sm lg:text-base leading-relaxed text-surface-foreground100-light dark:text-surface-foreground100-dark">
          &ldquo;{text}&rdquo;
        </p>
        <footer className="mt-2 text-xs font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {who}
        </footer>
      </blockquote>
    </Reveal>
  );
}

export function QuoteGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
      {items.map((q) => (
        <Quote key={q.text} text={q.text} who={q.who} />
      ))}
    </div>
  );
}

// Yellow sticky note for an aside. Slight tilt, like the stickies elsewhere.
// It is paper, so it lands: drops in from above and settles with a spring.
// Centered in the column at every width (Erica, 2026-11-21).
export function Note({ text }) {
  const reduce = useReducedMotion();
  return (
    <div className="my-2 flex justify-center">
      <motion.div
        variants={land()}
        initial={reduce ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className="max-w-md rounded-md px-5 py-4 shadow-md
            bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark
            text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark
            font-inter text-sm leading-relaxed"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          {text}
        </div>
      </motion.div>
    </div>
  );
}

// A row of yellow sticky notes, one short point each. Used for "In short" and
// for lessons. Paper lands: each note drops in and settles, one after the other.
export function Stickies({ items }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item}
          variants={land(i)}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            className="h-full rounded-md px-4 py-4 shadow-md font-inter text-sm leading-relaxed
              bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark
              text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark"
            style={{ transform: `rotate(${[-1.5, 1, -0.5][i % 3]}deg)` }}
          >
            {item}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function List({ items }) {
  return (
    <ul className={`${bodyClass} list-disc pl-5 space-y-2 marker:text-primary-outline-light dark:marker:text-primary-outline-dark`}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

export function Steps({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((step, i) => (
        <li key={step.title} className="flex gap-3">
          <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-inter font-medium text-sm
              bg-primary-surface-light dark:bg-primary-surface-dark
              text-primary-foreground-light dark:text-primary-foreground-dark
              border border-primary-outline-light dark:border-primary-outline-dark"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div>
            <h4 className="font-inter font-semibold text-base text-surface-foreground100-light dark:text-surface-foreground100-dark">
              {step.title}
            </h4>
            <p className={`${bodyClass} text-base lg:text-base leading-relaxed`}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// A step inside a section, like "Research" under "What I did". Same font as
// the section headings (Merriweather light), one size down.
export function Subheading({ text }) {
  return (
    <h3 className="pt-3 font-merriweather font-light text-xl lg:text-2xl text-surface-foreground100-light dark:text-surface-foreground100-dark">
      {text}
    </h3>
  );
}

// A list where each item opens with a bold lead-in, like "Design came in late."
export function Points({ items, ordered = false }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`${bodyClass} ${ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-2 marker:text-primary-outline-light dark:marker:text-primary-outline-dark`}>
      {items.map((it) => (
        <li key={it.title}>
          <strong className="font-semibold text-surface-foreground100-light dark:text-surface-foreground100-dark">{it.title}</strong>{' '}
          {it.text}
        </li>
      ))}
    </Tag>
  );
}

// A small plain table. `head` is the header row, `rows` the rest.
export function Table({ head, rows, caption }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-inter text-sm lg:text-base text-left text-surface-foreground100-light dark:text-surface-foreground100-dark">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-4 text-xs uppercase tracking-wide font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark border-b border-surface-outline-light dark:border-surface-outline-dark">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} className="py-2 pr-4 border-b border-surface-outline-light/60 dark:border-surface-outline-dark/60">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <Paragraph text={block.text} link={block.link} />;
    case 'heading':
      return <Subheading text={block.text} />;
    case 'figure':
      return <Figure src={block.src} alt={block.alt} caption={block.caption} invert={block.invert} maxWidth={block.maxWidth} frame={block.frame} />;
    case 'figures':
      return <FigureRow items={block.items} />;
    case 'clip':
      return <Clip src={block.src} poster={block.poster} alt={block.alt} caption={block.caption} ratio={block.ratio} maxWidth={block.maxWidth} center={block.center} />;
    case 'quote':
      return <Quote text={block.text} who={block.who} person={block.person} />;
    case 'quotes':
      return <QuoteGrid items={block.items} />;
    case 'note':
      return <Note text={block.text} />;
    case 'list':
      return <List items={block.items} />;
    case 'stickies':
      return <Stickies items={block.items} />;
    case 'steps':
      return <Steps items={block.items} />;
    case 'points':
      return <Points items={block.items} ordered={block.ordered} />;
    case 'table':
      return <Table head={block.head} rows={block.rows} caption={block.caption} />;
    // Something a reader can click around in. Only one so far: the menu
    // action panel (MenuPrototype.js).
    case 'prototype':
      return (
        <Reveal>
          <MenuPrototype caption={block.caption} />
        </Reveal>
      );
    case 'diagram':
      return (
        <Reveal>
          <Diagram name={block.name} caption={block.caption} />
        </Reveal>
      );
    default:
      return null;
  }
}
