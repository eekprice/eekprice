import React, { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../assets/Stars.svg';
import { getCaseStudy, nextCaseStudy } from '../data/caseStudies';
import ReadStudy, { ArrowRight } from '../components/ReadStudy';
import { Block, OutlinedBlock, Reveal, Stickies, bodyClass, chipClass } from '../components/caseStudy/Blocks';
import { Linked, Mentions } from '../components/caseStudy/Mentions';
import { Stage, Swap, Underline } from '../components/sketch/Sketch';
import Stamp from '../components/sketch/Stamp';
import { ease } from '../components/sketch/motion';
import FloatingNav from '../components/FloatingNav';
import useTrail from '../hooks/useTrail';

const NO_MENTIONS = [];

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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

// The short version of a study, right under the role box, for a reader who
// won't get through the whole page. `brief` on the study is a list of
// { label, text }: problem, role, who, scope, decisions, what is supported.
// Every line is cut from the write-up below it, so change that first.
function Brief({ items }) {
  return (
    <Reveal className="mt-6">
      <section
        aria-label="The short version"
        className="rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark px-4 py-4 lg:px-6 lg:py-5"
      >
        <h2 className="m-0 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
          The short version
        </h2>
        <dl className="m-0 mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="font-inter font-semibold text-sm text-surface-foreground100-light dark:text-surface-foreground100-dark">
                {item.label}
              </dt>
              <dd className="m-0 mt-1 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark">
                <Linked text={item.text} preview={false} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Reveal>
  );
}

// A section heading in the write-up. The words are always there. The first
// time it is seen, a pen underline draws under it. The arrow doodle that used to sit
// beside it is gone (Erica, 2026-11-21: "remove on all headers").
// Exported so other long-form pages can use the same heading (pages/EducationPage.js).
export function SectionHeading({ children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative flex items-center mb-5">
      <h2 className="flex-1 text-2xl lg:text-3xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark">
        <Underline lines show={seen || !!reduce} delay={reduce ? 0 : 150}>
          {children}
        </Underline>
      </h2>
    </div>
  );
}

// Small cards for other studies, shown at the top of a study that has no
// cards of its own. Each is a thumbnail, the title, and a link. They sit in
// the same column as the write-up.
function RelatedMark({ logo }) {
  if (!logo) return null;
  const box = 'shrink-0 grid place-items-center w-20 h-14 rounded border border-surface-outline-light dark:border-surface-outline-dark';
  if (logo.icon) {
    return (
      <span aria-hidden="true" className={`${box} bg-primary-surface-light dark:bg-primary-surface-dark text-primary-foreground-light dark:text-primary-foreground-dark`}>
        {logo.icon === 'scissors' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        )}
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`${box} ${logo.chip === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <img src={logo.src} alt="" className={`w-auto h-auto max-h-8 ${logo.chip === 'dark' ? 'max-w-[64px]' : 'max-w-[52px]'}`} />
    </span>
  );
}

function RelatedStudies({ related }) {
  const studies = related.slugs.map(getCaseStudy).filter(Boolean);
  if (!studies.length) return null;
  return (
    <section aria-label={related.label} className="max-w-[760px] mx-auto px-4 lg:px-0 pb-2">
      <Reveal>
        <p className="mb-2 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {related.label}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {studies.map((s) => (
            <Link
              key={s.slug}
              to={`/case-study/${s.slug}`}
              className="group flex items-center gap-3 p-2 pr-3 rounded-lg
                border border-surface-outline-light dark:border-surface-outline-dark
                bg-surface-background100-light dark:bg-surface-background100-dark
                transition-transform duration-300 hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark
                focus-visible:ring-offset-backdrop-background-light dark:focus-visible:ring-offset-backdrop-background-dark"
            >
              {/* A study with no picture shows its mark: a logo (on a dark box
                  when the logo is white) or an icon. */}
              {!s.hero && <RelatedMark logo={[].concat(s.workLogo || [])[0]} />}
              {s.hero && (
                <img
                  src={s.hero.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="shrink-0 w-20 h-14 rounded object-cover object-left-top
                    border border-surface-outline-light dark:border-surface-outline-dark
                    bg-surface-background200-light dark:bg-surface-background200-dark"
                />
              )}
              <span className="min-w-0 flex-1 font-merriweather text-sm lg:text-base leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
                {s.title}
              </span>
              <span className="shrink-0 text-surface-foreground400-light dark:text-surface-foreground400-dark"><ArrowRight /></span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// Where a crumb's words come from.
const CRUMB_LABEL = { '/work': 'Past Work', '/resume': 'Resume', '/about': 'About', '/education': 'Education', '/founding-designer': 'Founding Designer' };
function crumbLabel(path) {
  if (CRUMB_LABEL[path]) return CRUMB_LABEL[path];
  const found = path.startsWith('/case-study/') && getCaseStudy(path.replace('/case-study/', ''));
  return found ? found.title : null;
}

// Breadcrumbs at the top of a case study (Erica, 2026-11-20). They follow the
// path the visitor took: Home, then the pages that led here (hooks/useTrail.js).
// Straight from Home it is just Home, which lands on the section the study's
// card is in (`homeSection`), as the back link always did.
function Crumbs({ study }) {
  const { home, trail } = useTrail();
  const crumbs = trail.map((path) => ({ path, label: crumbLabel(path) })).filter((c) => c.label);
  const homeTo = !crumbs.length && study.homeSection ? `${home === '/' ? '/' : home}#${study.homeSection}` : home;
  const link = `underline underline-offset-2 rounded-sm
    text-surface-foreground200-light dark:text-surface-foreground200-dark
    hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark`;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none p-0 m-0 font-inter text-sm">
        <li className="inline-flex items-center gap-1">
          <ChevronLeft className="w-4 h-4 text-surface-foreground200-light dark:text-surface-foreground200-dark" />
          <Link to={homeTo} className={link}>Home</Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.path} className="inline-flex items-center gap-2 min-w-0">
            <span aria-hidden="true" className="text-surface-foreground400-light dark:text-surface-foreground400-dark">/</span>
            <Link to={c.path} className={`${link} truncate max-w-[16rem]`}>{c.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const reduce = useReducedMotion();

  if (!study) return <Navigate to="/" replace />;

  const next = nextCaseStudy(slug);
  // The summary cards (a study's `slides` and `overview`) are for the home
  // strip only. They are not repeated on the study's page (Erica, 2026-11-19:
  // "they only show on the main page. if they clicked to the case study they
  // want to read"). Only the small related-study links still sit on top.
  const hasCards = Boolean(!study.overview && !study.slides && study.related);

  const nextCard = next && (
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
        <p className="mt-1 font-merriweather text-xl lg:text-2xl text-surface-foreground100-light dark:text-surface-foreground100-dark">
          {next.title}
        </p>
        <p className="m-0 mt-3">
          <ReadStudy inside />
        </p>
      </Link>
    </Reveal>
  );

  return (
    // Same dot grid canvas as the rest of the site. The write-up is finished
    // work, so its cards and figures keep straight hairlines.
    // Mentions: people whose names are links in this study's copy.
    <Mentions.Provider value={study.mentions || NO_MENTIONS}>
    <div className="sk-canvas min-h-screen">
      {/* Faint doodle behind the header, same as home */}
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        />

        <header className="relative max-w-[760px] mx-auto px-4 lg:px-0 pt-8 lg:pt-14 pb-6">
          <Crumbs study={study} />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="mt-6 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
              Case study
            </p>
            <h1 className="mt-1 text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground100-light dark:text-surface-foreground100-dark">
              {/* The marker underline follows the title, line by line if it wraps. */}
              <Underline lines bold tone="teal" delay={reduce ? 0 : 450}>
                {study.title}
              </Underline>
            </h1>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {study.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
              {study.meta.tags.map((t) => (
                <li key={t} className={chipClass}>{t}</li>
              ))}
            </ul>
          </motion.div>

          <div className="relative mt-8">
            <Stamp className="absolute -left-3 -top-4 z-10 w-8 h-8" delay={1.2}>
              <StarSvg className="w-full h-full" />
            </Stamp>
            <Stamp className="absolute -right-3 -top-4 z-10 w-8 h-8" delay={1.3}>
              <StarsSvg className="w-full h-full text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </Stamp>
            {/* The selection block grows from its top edge, then its text fades in. */}
            <motion.div
              style={{ transformOrigin: 'top center' }}
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.35 }}
            >
              <OutlinedBlock className="px-4 py-3 lg:px-6 lg:py-4">
                <motion.dl
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'linear', delay: 0.85 }}
                >
                  <MetaRow label="Role">{study.meta.role}</MetaRow>
                  <MetaRow label="Company">{study.meta.company}</MetaRow>
                  {study.meta.years && <MetaRow label="Years">{study.meta.years}</MetaRow>}
                  <MetaRow label="Team">{study.meta.team}</MetaRow>
                  {study.meta.scale && <MetaRow label="Scale">{study.meta.scale}</MetaRow>}
                </motion.dl>
              </OutlinedBlock>
            </motion.div>
          </div>

          {/* "In short" is the summary at the top of every study (Erica,
              2026-11-21). It used to be the last section. The result strip she
              tried the same day is gone; `results` in the data is unused. */}
          <section className="mt-10">
            <SectionHeading>In short</SectionHeading>
            <Stickies items={study.highlights} />
          </section>

          {study.brief && <Brief items={study.brief} />}
        </header>
      </div>

      {!study.overview && !study.slides && study.related && <RelatedStudies related={study.related} />}

      <main className={`max-w-[760px] mx-auto px-4 lg:px-0 pb-12 ${hasCards ? 'pt-8' : ''}`}>
        <Reveal>
          <p className={`${bodyClass} text-base lg:text-lg`}><Linked text={study.summary} /></p>
        </Reveal>

        {/* Wire to real: the first picture is sketched as a crossed box, then the real one takes its place. */}
        {!hasCards && study.hero && (
          <Stage className="mt-8">
            <Swap at={150} wire={{ lines: [] }}>
              <img
                src={study.hero.src}
                alt={study.hero.alt}
                // No outline or drop shadow (Erica, 2026-11-19), like the figures in the write-up.
                className="block w-full h-auto rounded-lg"
              />
            </Swap>
          </Stage>
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

        {nextCard}

        <div className="h-40 lg:h-48" />
      </main>


      <FloatingNav show showHome />
    </div>
    </Mentions.Provider>
  );
}

export default CaseStudyPage;
