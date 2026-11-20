import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmojiSticker } from './SectionHeading';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';
import { Frame, Stage, Swap, WireImage } from './sketch/Sketch';

// A case study card on the home page: a plain white card with a hairline
// border, per the Figma sections.
//
// Wire first: the first time the card is seen it is drawn as a wireframe. A
// pencil frame the size of the card, a squiggle where the title goes and, if
// the card has slides, boxes where they go. Then the real card takes its
// place. A card with no slides yet keeps pencil blocks inside it; those start
// drawing once the card has landed.

const SKETCH_AT = 150; // ms after the card is first seen
const HOLD = { slides: 1400, empty: 900 }; // how long the wireframe shows

// A box with no cross, for the slides after the first.
const WireBox = ({ at, className }) => (
  <span className={`sk-framed block ${className}`} style={{ '--sk-at': `${at}ms` }}>
    <Frame tone="pencil" />
  </span>
);

// A logo used as a sticker, in the same spots as the emoji ones. It pops in
// just after the sticky, while the card is the active one (`show`): the one
// under the mouse, or else the one most in view. Only one card is active at a time. The thin white edge keeps dark logo type readable on the dark card.
// Logos wait for the sticky to be most of the way out, then pop in one after
// the other. Going away, they leave at once.
const LOGOS_AFTER = 350; // ms

export const LogoSticker = ({ sticker, show, order = 0 }) => (
  <img
    src={sticker.image}
    alt=""
    aria-hidden="true"
    className={`absolute z-10 h-auto pointer-events-none select-none
      ${sticker.shot
        // A screenshot, not a logo: a small print with a white edge.
        ? 'rounded-md border-4 border-white shadow-lg'
        : '[filter:drop-shadow(0_0_1px_rgb(255_255_255))_drop-shadow(0_0_1px_rgb(255_255_255))_drop-shadow(0_3px_4px_rgb(15_23_42/0.3))]'}
      transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      motion-reduce:transition-opacity
      ${show
        ? 'opacity-100 scale-100 [transition-delay:var(--after-sticky)]'
        : 'opacity-0 scale-50'}
      ${sticker.className}`}
    style={{ '--tw-rotate': `${sticker.rotate || 0}deg`, '--after-sticky': `${LOGOS_AFTER + order * 120}ms` }}
  />
);

// The sticky that slides out from behind the card's left edge, up by the
// title, while this card is the active one (`out`): hovered, or else the one
// most in view. Only one sticky is out at a time. It goes to the same place as that link, so it is kept out of the
// tab order and hidden from screen readers. Desktop only: there is no room
// beside the card on a phone.
// The sticky's paper. Same colors as the notes in the nav fan (StickyFan.js).
const PEEK_PAPER = {
  green: 'bg-green-300 text-slate-800',
  blue: 'bg-blue-300 text-slate-800',
  yellow:
    'bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark',
};

export const Peek = ({ peek, href, out }) => {
  const paper = `hidden lg:block absolute left-2 top-3 z-0 w-36 h-36 p-4 rounded-md shadow-lg
    ${PEEK_PAPER[peek.color] || PEEK_PAPER.green} font-inter text-[15px] leading-5 font-semibold
    transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
    ${out ? '-translate-x-[138px] -rotate-[8deg]' : '-rotate-3'}
    hover:shadow-xl hover:-translate-y-1 motion-reduce:transition-none`;
  const inside = (
    <>
      {peek.title}
      {peek.image && <img src={peek.image} alt="" className="absolute inset-x-2 bottom-2 w-[calc(100%-16px)] h-auto max-h-[76px] object-cover object-left-top rounded-sm" />}
    </>
  );
  return href ? (
    <Link to={href} tabIndex={-1} aria-hidden="true" className={paper}>{inside}</Link>
  ) : (
    <span aria-hidden="true" className={`${paper} pointer-events-none`}>{inside}</span>
  );
};

// `mostInView` is true while this card is the active one: under the mouse, or
// else with more of itself on screen than any other card (Home.js works that
// out from `data-in-view-key` with useMostInView).
const CaseStudyHero = ({ title, slides, href, stickers = [], slideHeight, peek, mostInView = false }) => {
  const navigate = useNavigate();
  const hasSlides = slides.length > 0;
  // The whole card goes to the case study (Erica, 2026-11-19). Links and
  // buttons inside it keep their own job, and so does a slide that is cut off
  // at the edge of the strip, which comes into view first.
  const openStudy = (e) => {
    if (!href || e.defaultPrevented || e.target.closest('a, button, [data-no-open]')) return;
    if (window.getSelection?.()?.toString()) return;
    navigate(href);
  };
  const hold = hasSlides ? HOLD.slides : HOLD.empty;

  const wire = (
    <div className="sk-wire sk-framed h-full">
      <Frame tone="pencil" />
      <span className="sk-squiggle" style={{ width: '32%', '--sk-delay': '200ms' }} />
      {/* A shorter line where "Read full study" goes. */}
      {href && <span className="sk-squiggle" style={{ width: '16%', '--sk-delay': '320ms' }} />}
      {hasSlides && (
        <div className="flex flex-1 min-h-0 gap-4 overflow-hidden px-1.5 pt-3 pb-1.5">
          <WireImage className="h-full w-[264px] shrink-0" at={SKETCH_AT + 100} />
          <WireBox className="h-full w-[264px] shrink-0" at={SKETCH_AT + 200} />
          <WireBox className="h-full w-[264px] shrink-0" at={SKETCH_AT + 300} />
        </div>
      )}
    </div>
  );

  return (
    <Stage>
      <Swap at={SKETCH_AT} hold={hold} wire={wire}>
        <div className="relative group/card" data-in-view-key={title}>
        {peek && <Peek peek={peek} href={href} out={mostInView} />}
        {/* A mouse convenience only: the Read Case Study link inside is the
            real link, for the keyboard and screen readers. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          onClick={openStudy}
          className={`relative z-[1] border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark
          rounded-md shadow-sm text-surface-foreground100-light dark:text-surface-foreground100-dark
          ${href ? 'cursor-pointer transition-colors hover:border-primary-outline-light dark:hover:border-primary-outline-dark' : ''}`}
        >
          <CaseStudyContainer
            title={title}
            slides={slides}
            href={href}
            slideHeight={slideHeight}
            sketchAt={SKETCH_AT + hold}
          />
          {/* Logos float around the card's header, each in its own spot
              (`className` on the sticker in data/caseStudiesData.js). */}
          {stickers.map((sticker, i) =>
            sticker.image ? (
              <LogoSticker key={sticker.name} sticker={sticker} show={mostInView} order={i} />
            ) : (
              <EmojiSticker
                key={sticker.emoji}
                className={`z-10 pointer-events-none ${sticker.className}`}
                rotate={sticker.rotate}
              >
                {sticker.emoji}
              </EmojiSticker>
            )
          )}
        </div>
        </div>
      </Swap>
    </Stage>
  );
};

export default CaseStudyHero;
