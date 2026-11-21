import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { Reveal, chipClass } from '../components/caseStudy/Blocks';
import { Underline } from '../components/sketch/Sketch';
import Stamp from '../components/sketch/Stamp';
import Button from '../components/Button';
import ExternalLink, { NewTabIcon } from '../components/ExternalLink';
import FloatingNav from '../components/FloatingNav';
import { MAILTO, LINKEDIN_URL } from '../data/links';
import { education, intro, roles, sideProjects, skills } from '../data/resume';

// Resume: every role in one place, newest first. Content is data/resume.js,
// a site-ready cut of Canon/resume.md. Same canvas and title treatment as
// Past Work. The roles are plain cards so the page prints cleanly.

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4 text-primary-outline-light dark:text-primary-outline-dark">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m18 0v-2a4 4 0 00-3-3.87M14 3.13a4 4 0 010 7.75M14 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const eyebrow = 'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';
const ink = 'text-surface-foreground100-light dark:text-surface-foreground100-dark';
const linkClass = `underline underline-offset-2 font-inter text-sm ${ink}
  hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark`;
const cardClass = `rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
  bg-surface-background100-light dark:bg-surface-background100-dark p-5 lg:p-6`;

// A logo with its client marks placed around it, for a role that has no
// ready-made collage picture. The box keeps one shape, and every mark is
// placed in percent of it, so it scales with the column. In dark mode the
// whole box sits on a white chip.
const place = ({ left, top, width, tilt = 0 }) => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  transform: tilt ? `rotate(${tilt}deg)` : undefined,
});
function Scatter({ logo }) {
  return (
    <div className="relative w-full aspect-[5/4] dark:bg-white dark:rounded-md dark:outline dark:outline-8 dark:outline-white">
      <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="absolute h-auto" style={place(logo.at)} />
      {logo.clients.map((c) => (
        <img
          key={c.alt}
          src={c.src}
          alt={c.alt}
          loading="lazy"
          decoding="async"
          className={`absolute h-auto ${c.chip === 'dark' ? 'bg-slate-900 rounded px-1 py-0.5' : ''}`}
          style={place(c.at)}
        />
      ))}
    </div>
  );
}

// A role's logo art: a collage picture, a scattered group, or a logo with
// client marks under it. It fills the width of whatever box it is put in.
function RoleLogo({ logo }) {
  return (
    <>
      {logo && logo.scatter && <Scatter logo={logo} />}
      {logo && !logo.scatter && (
        <div className="flex flex-col items-end gap-2 sm:items-start sm:gap-2.5">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className={`block w-auto dark:bg-white dark:rounded-md dark:p-2
              ${logo.small ? 'h-auto w-[58%]' : 'h-auto w-full'}`}
          />
          {/* Client marks under a plain logo, for a role whose picture is
              not a ready-made collage. */}
          {logo.clients && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 dark:bg-white dark:rounded-md dark:p-2">
              {logo.clients.map((c) =>
                c.icon ? (
                  <span
                    key={c.alt}
                    role="img"
                    aria-label={c.alt}
                    className="grid place-items-center w-7 h-7 rounded-full bg-primary-surface-light dark:bg-primary-surface-dark text-primary-foreground-light dark:text-primary-foreground-dark"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </span>
                ) : (
                  <img
                    key={c.alt}
                    src={c.src}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    className={`block w-auto ${c.h || 'h-6'} ${c.chip === 'dark' ? 'bg-slate-900 rounded px-1.5 py-1' : ''}`}
                  />
                )
              )}
            </div>
          )}
          {/* The company's own clients, under a label that says so. */}
          {logo.also && (
            <div className="w-full sm:mt-1.5 sm:pt-2.5 sm:border-t border-surface-outline-light dark:border-surface-outline-dark">
              <p className="m-0 mb-2 text-[10px] uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
                {logo.also.label}
              </p>
              <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-2.5 dark:bg-white dark:rounded-md dark:p-2">
                {logo.also.items.map((c) => (
                  <img key={c.alt} src={c.src} alt={c.alt} loading="lazy" decoding="async" className={`block w-auto ${c.h || 'h-4'}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// The company's logo on the left, the role's card on the right (Erica,
// 2026-11-20, as on her Framer resume). From 1024px the logo hangs in the
// margin left of the column, so the cards keep their width and still line up
// with the title. Between 640px and 1024px it takes a narrow column inside.
// On a phone it sits inside its card, top right. The logo pictures have black in them, so
// in dark mode they get a white chip.
function Role({ item }) {
  return (
    <Reveal>
      <div className="grid gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-[104px_minmax(0,1fr)] lg:grid-cols-[136px_minmax(0,1fr)] lg:-ml-[160px]">
        {/* From 640px the logo has its own column. On a phone it sits inside
            the card, top right (Erica, 2026-11-21). */}
        <div className="hidden sm:block sm:pt-4">
          <RoleLogo logo={item.logo} />
        </div>
      <article className={`min-w-0 ${cardClass}`}>
        {item.logo && (
          <div className="sm:hidden float-right w-28 ml-3 mb-2">
            <RoleLogo logo={item.logo} />
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
          <p className={`m-0 ${eyebrow}`}>{[item.company, item.place].filter(Boolean).join(' · ')}</p>
          <p className={`m-0 shrink-0 hidden sm:block ${eyebrow}`}>{item.when}</p>
        </div>
        <h2 className={`m-0 mt-1 font-merriweather font-light text-xl lg:text-2xl leading-snug ${ink}`}>{item.role}</h2>
        {/* On a phone the dates go under the title (Erica, 2026-11-21). */}
        <p className={`m-0 mt-1 sm:hidden ${eyebrow}`}>{item.when}</p>
        {item.reports && (
          <p className={`m-0 mt-2 inline-flex items-center gap-1.5 font-inter text-sm font-medium ${ink}`}>
            <PeopleIcon />
            {item.reports}
          </p>
        )}
        <ul className="clear-both mt-3 pl-5 list-disc space-y-2 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark marker:text-primary-outline-light dark:marker:text-primary-outline-dark">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {item.links && (
          <p className="m-0 mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className={eyebrow}>Case studies</span>
            {item.links.map((l) => (
              <Link key={l.to} to={l.to} className={linkClass}>{l.label}</Link>
            ))}
          </p>
        )}
      </article>
      </div>
    </Reveal>
  );
}

const solidButton = `!bg-surface-background100-light dark:!bg-surface-background100-dark
  hover:!bg-surface-background200-light dark:hover:!bg-surface-background200-dark`;

function ResumePage() {
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
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* The title on the left, Email Me on the right, level with it
                (Erica, 2026-11-20: "email should be top right"). On a phone the two
                buttons don't fit beside the title, so they sit under it. */}
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className={`inline-block relative text-3xl lg:text-5xl font-merriweather font-light leading-tight ${ink}`}>
                <Underline bold tone="teal" delay={reduce ? 0 : 450}>
                  Resume
                </Underline>
                <Stamp className="absolute -right-10 -top-3 w-8 h-8" delay={1}>
                  <StarSvg className="w-full h-full" />
                </Stamp>
              </h1>
              {/* Both leave the site, so both carry the new-tab icon (Erica,
                  2026-11-20). LinkedIn opens in a new tab; Email opens the
                  mail app. A solid fill, so the doodle behind the header does
                  not show through them. */}
              <div className="shrink-0 flex flex-wrap gap-2 sm:justify-end">
                <Button as="a" href={MAILTO} variant="outline" size="sm" className={solidButton}>
                  Email Me
                  <NewTabIcon />
                  <span className="sr-only"> (opens your mail app)</span>
                </Button>
                <Button
                  as="a"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  className={solidButton}
                >
                  LinkedIn
                  <NewTabIcon />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              </div>
            </div>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {intro}
            </p>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <div className="space-y-6 sm:space-y-4">
          {roles.map((item) => (
            <Role key={`${item.company} ${item.when}`} item={item} />
          ))}
        </div>

        <section className="mt-12" aria-labelledby="resume-side">
          <h2 id="resume-side" className={`m-0 mb-4 font-merriweather font-light text-2xl lg:text-3xl ${ink}`}>
            Side projects
          </h2>
          <Reveal>
            <ul className={`${cardClass} list-none m-0 divide-y divide-surface-outline-light dark:divide-surface-outline-dark`}>
              {sideProjects.map((p) => (
                <li key={p.name} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <span className="font-inter text-sm lg:text-base text-surface-foreground200-light dark:text-surface-foreground200-dark">
                    {p.to ? (
                      <Link to={p.to} className={`${linkClass} lg:text-base font-medium`}>{p.name}</Link>
                    ) : !p.href ? (
                      <span className={`font-medium ${ink}`}>{p.name}</span>
                    ) : (
                      <ExternalLink href={p.href} preview={p.preview} className={`font-inter text-sm lg:text-base font-medium ${ink} hover:text-primary-foreground-light dark:hover:text-primary-foreground-dark`}>{p.name}</ExternalLink>
                    )}
                    {'. '}
                    {p.role}
                  </span>
                  {p.when && <span className={`shrink-0 ${eyebrow}`}>{p.when}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-12" aria-labelledby="resume-edu">
          <h2 id="resume-edu" className={`m-0 mb-4 font-merriweather font-light text-2xl lg:text-3xl ${ink}`}>
            Education
          </h2>
          <Reveal>
            <ul className={`${cardClass} list-none m-0 divide-y divide-surface-outline-light dark:divide-surface-outline-dark`}>
              {education.map((e) => (
                <li key={e.name} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <span className="font-inter text-sm lg:text-base text-surface-foreground200-light dark:text-surface-foreground200-dark">
                    <span className={`font-medium ${ink}`}>{e.name}</span>
                    {'. '}
                    {e.detail}
                  </span>
                  <span className={`shrink-0 ${eyebrow}`}>{e.when}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-12" aria-labelledby="resume-skills">
          <h2 id="resume-skills" className={`m-0 mb-4 font-merriweather font-light text-2xl lg:text-3xl ${ink}`}>
            Skills
          </h2>
          <Reveal>
            <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
              {skills.map((skill) => (
                <li key={skill} className={chipClass}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default ResumePage;
