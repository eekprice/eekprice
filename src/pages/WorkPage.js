import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { caseStudies } from '../data/caseStudies';
import { Reveal } from '../components/caseStudy/Blocks';
import FloatingNav from '../components/FloatingNav';

// Past Work: every case study in one place. Cards pull straight from
// src/data/caseStudies, so a new study there shows up here on its own.

const chipClass = `text-xs px-1.5 py-0.5 whitespace-nowrap rounded-lg shadow-sm font-inter
  bg-surface-background200-light dark:bg-surface-background200-dark
  border border-surface-outline-light dark:border-surface-outline-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark`;

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function WorkCard({ study }) {
  return (
    <Reveal>
      <Link
        to={`/case-study/${study.slug}`}
        className="group flex flex-col sm:flex-row overflow-hidden rounded-md
          border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark
          shadow-sm hover:shadow-md transition-shadow
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-outline-light dark:focus-visible:ring-primary-outline-dark"
      >
        <div className="sm:w-[44%] shrink-0 bg-surface-background200-light dark:bg-surface-background200-dark border-b sm:border-b-0 sm:border-r border-surface-outline-light dark:border-surface-outline-dark">
          <img
            src={study.hero.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-44 sm:h-full object-cover object-left-top"
          />
        </div>

        <div className="flex flex-col p-4 lg:p-5 min-w-0">
          <p className="text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
            {study.meta.company}
          </p>
          <h2 className="mt-1 font-merriweather text-xl lg:text-2xl font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark">
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
          <span
            className="mt-4 sm:mt-auto pt-2 inline-flex items-center gap-1 text-sm font-inter font-medium underline underline-offset-2
              text-surface-foreground200-light dark:text-surface-foreground200-dark
              group-hover:text-surface-foreground100-light dark:group-hover:text-surface-foreground100-dark"
          >
            Read the case study
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function WorkPage() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.08 }}
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
              Past Work
              <StarSvg className="absolute -right-10 -top-3 w-8 h-8" aria-hidden="true" />
            </h1>
            <p className="mt-3 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              The case studies I've written up so far. Each one says what was broken, what I did, and what came out of it.
            </p>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showProfileInNav />
    </>
  );
}

export default WorkPage;
