import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { Stage, Underline, WireBlock } from '../components/sketch/Sketch';
import { Reveal, bodyClass, chipClass } from '../components/caseStudy/Blocks';
import { SectionHeading } from './CaseStudyPage';
import ExternalLink from '../components/ExternalLink';
import ReadStudy from '../components/ReadStudy';
import FloatingNav from '../components/FloatingNav';
import { founding } from '../data/founding';

// Founding Designer: the products Erica helped start. The Side Projects menu
// links here. A first draft, 2026-11-20, from the "Co-founding Tech" page of
// her Framer site. Copy and pictures are in data/founding.js, with the open
// questions at the top of that file.
//
// A title with the teal marker underline, tags and an opening paragraph, then
// one section per product: the case study heading, a line about the product,
// and a bento grid of boxes (the quote that started it, the screens, what she
// did). The last section is a pencil wireframe for a product that is not
// written up yet.

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ease = [0.22, 1, 0.36, 1];
const ink = 'text-surface-foreground100-light dark:text-surface-foreground100-dark';
const labelClass =
  'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';
const linkClass = `${ink} hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark`;

// One box in a project's grid: a small label on top, then whatever goes in
// it. `tint` is the soft teal panel, for a quote.
const boxClass = `rounded-lg border border-surface-outline-light dark:border-surface-outline-dark p-4 lg:p-5 h-full`;
function Box({ label, tint = false, className = '', children }) {
  return (
    <Reveal className={className}>
      <div
        className={`${boxClass} ${tint
          ? 'bg-surface-background300-light dark:bg-surface-background300-dark'
          : 'bg-surface-background100-light dark:bg-surface-background100-dark'}`}
      >
        {label && <p className={`m-0 mb-3 ${labelClass}`}>{label}</p>}
        {children}
      </div>
    </Reveal>
  );
}

// What someone said, with their face and who they are.
function QuoteBox({ quote, className }) {
  return (
    <Box label={quote.label} tint className={className}>
      <figure className="m-0 flex flex-col h-[calc(100%-1.75rem)]">
        <blockquote className={`m-0 font-merriweather font-light text-base lg:text-lg leading-relaxed ${ink}`}>
          “{quote.text}”
        </blockquote>
        <figcaption className="mt-auto pt-4 flex items-center gap-3">
          <img src={quote.photo} alt="" loading="lazy" decoding="async" className="w-11 h-11 rounded-full object-cover" />
          <span className="font-inter text-sm">
            <span className={`block font-medium ${ink}`}>{quote.who}</span>
            <span className="block text-surface-foreground300-light dark:text-surface-foreground300-dark">{quote.role}</span>
          </span>
        </figcaption>
      </figure>
    </Box>
  );
}

function ListBox({ list, className }) {
  return (
    <Box label={list.label} className={className}>
      <ul className="m-0 pl-5 list-disc space-y-2 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark marker:text-primary-outline-light dark:marker:text-primary-outline-dark">
        {list.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Box>
  );
}

// A picture in a box. With `ratio`, only the top of the picture shows, at
// that shape.
function PictureBox({ figure, className }) {
  return (
    <Box label={figure.caption} className={className}>
      <img
        src={figure.src}
        alt={figure.alt}
        loading="lazy"
        decoding="async"
        className={`block w-full rounded-md ${figure.ratio ? 'object-cover object-top' : 'h-auto'}`}
        style={figure.ratio ? { aspectRatio: `${figure.ratio}` } : undefined}
      />
    </Box>
  );
}

// A product as a bento grid, for easy scanning (Erica, 2026-11-20: "should
// look more like the bento box style"). The heading and a line about the
// product, then boxes: the quote, the screens, what she did, what was planned.
// Twelve columns from 640px; every box is full width on a phone. Each
// project's `layout` in the data says how wide its boxes are.
function Project({ project }) {
  const span = project.layout;
  return (
    <section className="mt-14">
      <p className={`mb-1 ${labelClass}`}>{project.where}</p>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <SectionHeading>{project.title}</SectionHeading>
        </div>
        {project.study && (
          <ReadStudy
            to={project.study}
            about={project.title}
            className="shrink-0 self-start sm:self-center !bg-surface-background100-light dark:!bg-surface-background100-dark
              hover:!bg-surface-background200-light dark:hover:!bg-surface-background200-dark"
          />
        )}
      </div>
      {/* The way into the case study is up in the title's row, and the logo
          sits beside the line about the product (Erica swapped them,
          2026-11-20). The button has a solid fill so the dot grid does not
          show through it. */}
      <Reveal>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className={`${bodyClass} m-0`}>
            {project.text}
            {project.site && (
              <>
                {' '}
                <ExternalLink href={project.site.href} preview={project.site.preview} className={linkClass}>
                  {project.site.label}
                </ExternalLink>
              </>
            )}
          </p>
          {project.logo && (
            <img
              src={project.logo.src}
              alt={project.logo.alt}
              loading="lazy"
              decoding="async"
              className={`shrink-0 self-start sm:self-center block h-10 lg:h-12 w-auto ${project.logo.invert ? 'dark:invert' : ''}`}
            />
          )}
        </div>
      </Reveal>

      <div className="grid gap-3 lg:gap-4 sm:grid-cols-12">
        <QuoteBox quote={project.quote} className={span.quote} />
        {project.figures.map((f) => (
          <PictureBox key={f.src} figure={f} className={span.figure} />
        ))}
        {(project.lists || []).map((list, n) => (
          <ListBox key={list.label} list={list} className={span.lists[n]} />
        ))}
      </div>

      {project.soon && <p className={`m-0 mt-4 ${labelClass}`}>{project.soon}</p>}
    </section>
  );
}

function FoundingDesignerPage() {
  const reduce = useReducedMotion();

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
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <h1 className={`mt-6 text-3xl lg:text-5xl font-merriweather font-light leading-tight ${ink}`}>
              <Underline bold lines tone="teal" delay={reduce ? 0 : 450}>
                {founding.title}
              </Underline>
            </h1>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {founding.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
              {founding.tags.map((t) => (
                <li key={t} className={chipClass}>{t}</li>
              ))}
            </ul>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <Reveal>
          <p className={`${bodyClass} text-base lg:text-lg`}>{founding.intro}</p>
        </Reveal>

        {/* Ariso first (Erica, 2026-11-20), as a placeholder until she adds it.
            Then the projects in the data's order: SciSummary, Helix Booking. */}
        {founding.next && (
          <section className="mt-14">
            <SectionHeading>{founding.next.title}</SectionHeading>
            <Stage className="space-y-4">
              <WireBlock row lines={[22, 58, 90, 76, 34]} at={150} className="h-72 sm:h-48" />
              <p className="sk-annotation px-1" style={{ '--sk-delay': '1400ms' }}>
                coming soon
              </p>
            </Stage>
          </section>
        )}

        {founding.projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}

        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default FoundingDesignerPage;
