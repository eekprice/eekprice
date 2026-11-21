import React from 'react';
import { Link } from 'react-router-dom';
import ReadStudy from '../components/ReadStudy';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { caseStudies } from '../data/caseStudies';
import { chipClass } from '../components/caseStudy/Blocks';
import { Stage, Swap, Underline } from '../components/sketch/Sketch';
import Stamp from '../components/sketch/Stamp';
import FloatingNav from '../components/FloatingNav';
import useMostInView from '../hooks/useMostInView';
import SectionHeading from '../components/SectionHeading';

// Past Work: every case study in one place. Cards pull straight from
// src/data/caseStudies, so a new study there shows up here on its own.
//
// From the design system: the page sits on the dot grid, the title gets the
// marker underline, the star pops, and the first card starts as a wireframe.
// The cards themselves are finished work, so they keep straight hairlines.

// The first card's wireframe, laid out like the card: picture, then a short
// line, a title, two lines of copy and the link.
const cardWire = { row: true, lines: [22, 58, 90, 76, 34] };
// The same wireframe for a card with no picture.
const textWire = { image: false, lines: [22, 58, 90, 76, 34] };

// The product design studies come first, in the data's order. Then the
// leadership ones, newest first (Erica, 2026-11-20: "in order of how long
// ago"): CGI and the aerospace program are still going, Topstep ended in
// April 2026, Yum in September 2025. A new leadership study goes in this list.
const LEADERSHIP = ['cgi-leadership', 'aerospace-program', 'topstep', 'yum-ux-leadership'];
// Menus goes above the drive thru (Erica, 2026-11-20).
const DESIGN_FIRST = ['menu-management'];
// A study with `older: true` is kept out of the main list. It goes at the
// bottom under "Older Work" (Erica, 2026-11-20).
const olderWork = caseStudies.filter((s) => s.older);
const design = caseStudies.filter((s) => !LEADERSHIP.includes(s.slug) && !s.older);
const ordered = [
  ...design.filter((s) => DESIGN_FIRST.includes(s.slug)),
  ...design.filter((s) => !DESIGN_FIRST.includes(s.slug)),
  ...LEADERSHIP.map((slug) => caseStudies.find((s) => s.slug === slug)).filter(Boolean),
];

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

// Brand marks on a card. They pop in one after the other while the card is
// the active one (hovered, or else the one most in view), like the logos on
// the home cards (Erica, 2026-11-20: "the logos should animate in").
// `workLogo` on the study is one mark or a list. The first is the main one, on
// the card's top right corner. The rest are brands, placed around the card by
// `spot` (her sketch, same day: "logos need to be displaced"): one on the top
// edge where the picture meets the text, one hanging off the bottom left corner.
// A mark is a logo file (`src`), or an `icon` when there is no logo to show
// ('plane', 'scissors', 'search'). `chip: 'dark'` puts a white logo on a dark chip.
const SPOT = {
  main: 'right-4 top-3 lg:right-5 lg:top-4 rotate-3',
  top: 'left-[44%] -translate-x-1/2 -top-5 -rotate-6',
  bottomLeft: '-left-3 -bottom-4 lg:-left-5 rotate-6',
};
// A white rim and a soft shadow, so a logo reads on the picture and the dots.
const rim = '[filter:drop-shadow(0_0_1px_rgb(255_255_255))_drop-shadow(0_0_1px_rgb(255_255_255))_drop-shadow(0_3px_4px_rgb(15_23_42/0.3))]';

function Mark({ logo, show, order = 0, spot = 'main' }) {
  const pop = `absolute z-10 pointer-events-none select-none ${SPOT[spot] || SPOT.main}
    transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
    motion-reduce:scale-100 motion-reduce:transition-opacity
    ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`;
  const style = { transitionDelay: show ? `${150 + order * 120}ms` : '0ms' };
  if (logo.icon) {
    return (
      <span aria-hidden="true" style={style} className={`${pop} grid place-items-center w-9 h-9 rounded-full bg-primary-surface-light dark:bg-primary-surface-dark text-primary-foreground-light dark:text-primary-foreground-dark`}>
        {logo.icon === 'search' ? (
          // Forensics: a magnifying glass.
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        ) : logo.icon === 'scissors' ? (
          // Hair salon: a pair of scissors.
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        )}
      </span>
    );
  }
  return (
    <img
      src={logo.src}
      alt=""
      aria-hidden="true"
      style={style}
      className={`${pop} w-auto ${logo.h || 'h-8'}
        ${logo.chip === 'dark' ? 'bg-slate-900 rounded-md px-2 py-1.5' : `dark:bg-white dark:rounded dark:p-1 ${spot === 'main' ? '' : rim}`}`}
    />
  );
}

function WorkCard({ study, at = 150, active = false }) {
  // The first mark is the main one, in the top right corner. Any others are
  // the brands, placed around the card.
  const [mainLogo, ...logos] = study.workLogo ? [].concat(study.workLogo) : [];
  const card = (
    <div className="relative">
    <Link
      to={`/case-study/${study.slug}`}
      data-in-view-key={study.slug}
      className="group relative flex flex-col sm:flex-row overflow-hidden rounded-md
        border border-surface-outline-light dark:border-surface-outline-dark
        bg-surface-background100-light dark:bg-surface-background100-dark
        shadow-sm hover:shadow-md transition-shadow
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark
        focus-visible:ring-offset-backdrop-background-light dark:focus-visible:ring-offset-backdrop-background-dark"
    >
      {mainLogo && <Mark logo={mainLogo} show={active} />}
      {/* A study with no picture yet, like a leadership story, is a text card. */}
      {study.hero && (
        <div className={`sm:w-[44%] shrink-0 bg-surface-background200-light dark:bg-surface-background200-dark border-b sm:border-b-0 sm:border-r border-surface-outline-light dark:border-surface-outline-dark
          ${study.workImage ? 'flex items-center justify-center p-6 lg:p-8' : ''}`}>
          {study.workImage ? (
            // A plain screenshot that floats on the grey with a small tilt
            // (Erica, 2026-11-20). Nothing happens to it on hover: no other
            // card's picture moves, so this one doesn't either (her call).
            <img
              src={study.workImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="block w-full h-auto rounded border border-surface-outline-light dark:border-surface-outline-dark
                -rotate-3"
            />
          ) : (
          <img
            src={study.hero.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`w-full h-44 sm:h-full object-cover ${study.hero.position === 'center' ? 'object-center' : 'object-left-top'}`}
          />
          )}
        </div>
      )}

      {/* flex-1: the text fills the card, so the button reaches the right edge
          even when every line of text is short. */}
      <div className="flex flex-1 flex-col p-4 lg:p-5 min-w-0">
        <p className="text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {study.meta.company}
        </p>
        {/* Room on the right for the main mark, so a long title wraps before it. */}
        <h2 className={`mt-1 font-merriweather text-xl lg:text-2xl font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark ${mainLogo ? (mainLogo.chip ? 'pr-24' : 'pr-14') : ''}`}>
          {study.title}
        </h2>
        <p className="mt-2 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark">
          {study.tagline}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
          {study.meta.tags.map((t) => (
            <li key={t} className={chipClass}>{t}</li>
          ))}
        </ul>
        {/* Right aligned, like the read buttons on Home (Erica, 2026-11-20). */}
        <span className="mt-4 sm:mt-auto pt-2 flex justify-end">
          <ReadStudy inside />
        </span>
      </div>
    </Link>
    {/* Outside the link, which clips: the brands hang off the card's edges. */}
    {logos.map((logo, i) => (
      <Mark key={logo.name} logo={logo} show={active} order={i + 1} spot={logo.spot || (i === 0 ? 'top' : 'bottomLeft')} />
    ))}
    </div>
  );

  // Wire to real, top down (Erica, 2026-11-20: the first card was still a
  // sketch while the second was already there). Every card sketches itself,
  // then the real card takes its place, like the cards on Home. The cards on
  // screen at load go one after the other from the top, after the title. A
  // card further down sketches when it is scrolled to. The link is in the
  // page the whole time.
  return (
    <Stage>
      <Swap at={at} hold={900} wire={study.hero ? cardWire : textWire}>
        {card}
      </Swap>
    </Stage>
  );
}

// When each card starts to sketch, in ms after it is first seen. The first
// three are the ones on screen at load, so they wait for the title and then
// follow each other. The rest are met by scrolling and start right away.
const FIRST_AT = 500;
const STEP = 220;
const sketchAt = (i) => (i < 3 ? FIRST_AT + i * STEP : 150);

function WorkPage() {
  const reduce = useReducedMotion();
  // One card is active at a time: the one under the mouse, or else the one
  // with the most of itself on screen. Its brand marks are the ones showing.
  const activeCard = useMostInView('[data-in-view-key]');

  return (
    <div className="sk-canvas min-h-screen">
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        />

        <header className="relative max-w-[800px] mx-auto px-4 pt-8 lg:pt-14 pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-inter underline underline-offset-2
              text-surface-foreground200-light dark:text-surface-foreground200-dark
              hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>

          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mt-6 inline-block relative text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground100-light dark:text-surface-foreground100-dark">
              <Underline bold tone="teal" delay={reduce ? 0 : 450}>
                Past Work
              </Underline>
              <Stamp className="absolute -right-10 -top-3 w-8 h-8" delay={1}>
                <StarSvg className="w-full h-full" />
              </Stamp>
            </h1>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              The case studies I've written up so far. Each one says what was broken, what I did, and what came out of it.
            </p>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <div className="space-y-6">
          {ordered.map((study, i) => (
            <WorkCard key={study.slug} study={study} at={sketchAt(i)} active={activeCard === study.slug} />
          ))}
        </div>

        {olderWork.length > 0 && (
          <section aria-labelledby="older-work" className="mt-14 lg:mt-16">
            <SectionHeading id="older-work">A Peek Into the Past</SectionHeading>
            {/* Erica, 2026-11-20: "maybe call it a peak into the past and mention, what
                time to be in UX". The first sentence says how old the work is. */}
            <p className="-mt-4 lg:-mt-5 mb-8 text-center font-inter text-sm lg:text-base text-surface-foreground200-light dark:text-surface-foreground200-dark">
              More than five years old. What a time to be in UX.
            </p>
            <div className="space-y-6">
              {olderWork.map((study) => (
                <WorkCard key={study.slug} study={study} active={activeCard === study.slug} />
              ))}
            </div>
          </section>
        )}
        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default WorkPage;
