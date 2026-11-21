import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { Underline } from '../components/sketch/Sketch';
import { Reveal, bodyClass, chipClass } from '../components/caseStudy/Blocks';
import ExternalLink from '../components/ExternalLink';
import FloatingNav from '../components/FloatingNav';
import { education } from '../data/education';

// Education: teaching, course making and speaking (Erica, 2026-11-20). Nothing
// links here yet, on purpose: she asked for the page only, "it doesnt need a
// trigger yet". Copy and pictures are in data/education.js.
//
// It reads like a case study page, not a set of cards (her second ask the
// same day): the same narrow column, a title with the teal marker underline,
// tags, an opening paragraph, then one row per item: the picture on the left,
// straight on the dot grid, and the heading, words and links on the right.

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ease = [0.22, 1, 0.36, 1];
const linkClass =
  'text-surface-foreground100-light dark:text-surface-foreground100-dark hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark';
const labelClass =
  'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';

// The case study heading without its arrow, which would sit on the picture
// in a two column row: the words, and a pen underline the first time it is seen.
function RowHeading({ children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  return (
    <h2 ref={ref} className="mb-5 text-2xl lg:text-3xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark">
      <Underline lines show={seen || !!reduce} delay={reduce ? 0 : 150}>
        {children}
      </Underline>
    </h2>
  );
}

function Links({ item }) {
  return (
    <Reveal>
      <ul className={`${bodyClass} flex flex-col gap-1.5 list-none p-0 m-0`}>
        {item.links.map((l) => (
          <li key={l.label}>
            {l.prefix && `${l.prefix}: `}
            <ExternalLink href={l.href} className={linkClass}>{l.label}</ExternalLink>
          </li>
        ))}
      </ul>
      {item.papers && (
        <>
          <p className={`mt-5 ${labelClass}`}>Papers</p>
          <ul className={`${bodyClass} mt-1.5 flex flex-col gap-1.5 list-none p-0 m-0`}>
            {item.papers.map((paper) => (
              <li key={paper.label}>
                {paper.href ? (
                  <ExternalLink href={paper.href} className={linkClass}>{paper.label}</ExternalLink>
                ) : (
                  paper.label
                )}
                {paper.by && (
                  <span className="block font-inter text-sm text-surface-foreground400-light dark:text-surface-foreground400-dark">
                    {paper.by}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </Reveal>
  );
}

function EducationPage() {
  const reduce = useReducedMotion();

  return (
    <div className="sk-canvas min-h-screen">
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        />

        <header className="relative max-w-[760px] mx-auto px-4 lg:px-0 pt-8 lg:pt-14 pb-8">
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
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <h1 className="mt-6 text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground100-light dark:text-surface-foreground100-dark">
              <Underline bold lines tone="teal" delay={reduce ? 0 : 450}>
                {education.title}
              </Underline>
            </h1>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {education.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
              {education.tags.map((t) => (
                <li key={t} className={chipClass}>{t}</li>
              ))}
            </ul>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[760px] mx-auto px-4 lg:px-0 pb-12">
        <Reveal>
          <p className={`${bodyClass} text-base lg:text-lg`}>{education.intro}</p>
        </Reveal>

        {/* Picture on the left, words on the right (Erica, 2026-11-20: "i like
            the left and right layout maybe its okay if its different"). No
            cards: the collage sits straight on the dot grid. From 1024px the
            rows run wider than the text column so the picture has room. On a
            phone the picture goes under the heading's words. */}
        {education.items.map((item) => (
          <section
            key={item.id}
            className="mt-14 lg:mt-20 lg:-mx-28 grid gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-8 lg:gap-12 sm:items-start"
          >
            <Reveal className="order-2 sm:order-1">
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="block w-full h-auto" />
            </Reveal>
            <div className="order-1 sm:order-2 min-w-0">
              <p className={`mb-1 ${labelClass}`}>{item.where}</p>
              <RowHeading>{item.title}</RowHeading>
              <div className="space-y-5">
                <Reveal>
                  <p className={bodyClass}>{item.text}</p>
                </Reveal>
                <Links item={item} />
              </div>
            </div>
          </section>
        ))}

        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default EducationPage;
