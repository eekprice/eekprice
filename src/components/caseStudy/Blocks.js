import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { land } from '../sketch/motion';

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

export function Paragraph({ text }) {
  return <p className={bodyClass}>{text}</p>;
}

export function Figure({ src, alt, caption }) {
  return (
    <Reveal>
      <figure className="my-2">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-lg border border-surface-outline-light dark:border-surface-outline-dark shadow-md bg-surface-background100-light dark:bg-surface-background100-dark"
        />
        {caption && (
          <figcaption className="mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
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

// Quote callout: bordered card with a little avatar badge, like the old site.
export function Quote({ text, who }) {
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
export function Note({ text }) {
  const reduce = useReducedMotion();
  return (
    <div className="my-2 flex justify-center lg:justify-start">
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

export function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <Paragraph text={block.text} />;
    case 'figure':
      return <Figure src={block.src} alt={block.alt} caption={block.caption} />;
    case 'quote':
      return <Quote text={block.text} who={block.who} />;
    case 'quotes':
      return <QuoteGrid items={block.items} />;
    case 'note':
      return <Note text={block.text} />;
    case 'list':
      return <List items={block.items} />;
    case 'steps':
      return <Steps items={block.items} />;
    default:
      return null;
  }
}
