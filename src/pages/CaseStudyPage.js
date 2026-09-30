import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as ArrowSvg } from '../assets/Arrow.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../assets/Stars.svg';
import { getCaseStudy, nextCaseStudy } from '../data/caseStudies';
import { Block, OutlinedBlock, Reveal, bodyClass } from '../components/caseStudy/Blocks';
import Overview from '../components/caseStudy/Overview';
import FloatingNav from '../components/FloatingNav';

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

function MetaRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2 border-b last:border-b-0 border-blockHighlight-outlineSurface-light/40 dark:border-blockHighlight-outlineSurface-dark/30">
      <dt className="sm:w-24 shrink-0 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark pt-0.5">
        {label}
      </dt>
      <dd className="font-inter text-sm lg:text-base text-surface-foreground100-light dark:text-surface-foreground100-dark">
        {children}
      </dd>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="relative flex items-center mb-4">
      <motion.div
        className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2"
        whileHover={{ scale: 1.1, rotate: 10 }}
        aria-hidden="true"
      >
        <ArrowSvg className="w-12 h-12 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
      </motion.div>
      <h2 className="text-2xl lg:text-3xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark">
        {children}
      </h2>
    </div>
  );
}

function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const reduce = useReducedMotion();

  if (!study) return <Navigate to="/" replace />;

  const next = nextCaseStudy(slug);

  const pop = (delay) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: [0, 1.15, 1], opacity: 1, rotate: [0, 8, 0] },
          transition: { delay, duration: 0.4, ease: 'easeOut' },
        };

  return (
    <>
      {/* Faint doodle behind the header, same as home */}
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.08 }}
          aria-hidden="true"
        />

        <header className="relative max-w-[760px] mx-auto px-4 lg:px-0 pt-8 lg:pt-14 pb-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-sm font-inter underline underline-offset-2
              text-surface-foreground200-light dark:text-surface-foreground200-dark
              hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
          >
            <ChevronLeft className="w-4 h-4" />
            Past Work
          </Link>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-6 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
              Case study
            </p>
            <h1 className="mt-1 text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground100-light dark:text-surface-foreground100-dark">
              {study.title}
            </h1>
            <p className="mt-3 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {study.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
              {study.meta.tags.map((t) => (
                <li key={t} className={chipClass}>{t}</li>
              ))}
            </ul>
          </motion.div>

          <div className="relative mt-8">
            <motion.div className="absolute -left-3 -top-4 z-10" aria-hidden="true" {...pop(0.5)}>
              <StarSvg className="w-8 h-8" />
            </motion.div>
            <motion.div className="absolute -right-3 -top-4 z-10" aria-hidden="true" {...pop(0.6)}>
              <StarsSvg className="w-8 h-8 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </motion.div>
            <OutlinedBlock className="px-4 py-3 lg:px-6 lg:py-4">
              <dl>
                <MetaRow label="Role">{study.meta.role}</MetaRow>
                <MetaRow label="Company">{study.meta.company}</MetaRow>
                <MetaRow label="Team">{study.meta.team}</MetaRow>
              </dl>
            </OutlinedBlock>
          </div>
        </header>
      </div>

      {/* High-level view first: the masonry wall, then the write-up. */}
      {study.overview && <Overview tiles={study.overview} />}

      <main className={`max-w-[760px] mx-auto px-4 lg:px-0 pb-12 ${study.overview ? 'pt-8' : ''}`}>
        <Reveal>
          <p className={`${bodyClass} text-lg lg:text-xl`}>{study.summary}</p>
        </Reveal>

        {!study.overview && (
          <Reveal>
            <img
              src={study.hero.src}
              alt={study.hero.alt}
              className="mt-8 w-full h-auto rounded-lg border border-surface-outline-light dark:border-surface-outline-dark shadow-lg"
            />
          </Reveal>
        )}

        {study.sections.map((section) => (
          <section key={section.heading} className="mt-14">
            <SectionHeading>{section.heading}</SectionHeading>
            <div className="space-y-5">
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        <section className="mt-14">
          <SectionHeading>In short</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {study.highlights.map((h, i) => (
              <Reveal key={h}>
                <div
                  className="h-full rounded-md px-4 py-4 shadow-md font-inter text-sm leading-relaxed
                    bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark
                    text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark"
                  style={{ transform: `rotate(${[-1.5, 1, -0.5][i % 3]}deg)` }}
                >
                  {h}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {next && (
          <Reveal className="mt-16">
            <Link
              to={`/case-study/${next.slug}`}
              className="group block rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
                bg-surface-background100-light dark:bg-surface-background100-dark p-4 lg:p-5 shadow-md
                hover:shadow-lg transition-shadow"
            >
              <p className="text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
                Next case study
              </p>
              <p className="mt-1 flex items-center justify-between gap-3 font-merriweather text-xl lg:text-2xl text-surface-foreground100-light dark:text-surface-foreground100-dark">
                {next.title}
                <ChevronRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </Reveal>
        )}

        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showProfileInNav />
    </>
  );
}

export default CaseStudyPage;
