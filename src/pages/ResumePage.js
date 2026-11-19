import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { Reveal, chipClass } from '../components/caseStudy/Blocks';
import { Underline } from '../components/sketch/Sketch';
import Stamp from '../components/sketch/Stamp';
import Button from '../components/Button';
import ExternalLink from '../components/ExternalLink';
import FloatingNav from '../components/FloatingNav';
import { MAILTO } from '../data/links';
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

function Role({ item }) {
  return (
    <Reveal>
      <article className={cardClass}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
          <p className={`m-0 ${eyebrow}`}>{[item.company, item.place].filter(Boolean).join(' · ')}</p>
          <p className={`m-0 shrink-0 ${eyebrow}`}>{item.when}</p>
        </div>
        <h2 className={`m-0 mt-1 font-merriweather font-light text-xl lg:text-2xl leading-snug ${ink}`}>{item.role}</h2>
        {item.reports && (
          <p className={`m-0 mt-2 inline-flex items-center gap-1.5 font-inter text-sm font-medium ${ink}`}>
            <PeopleIcon />
            {item.reports}
          </p>
        )}
        <ul className="mt-3 pl-5 list-disc space-y-2 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark marker:text-primary-outline-light dark:marker:text-primary-outline-dark">
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
    </Reveal>
  );
}

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
            <h1 className={`mt-6 inline-block relative text-3xl lg:text-5xl font-merriweather font-light leading-tight ${ink}`}>
              <Underline bold tone="teal" delay={reduce ? 0 : 450}>
                Resume
              </Underline>
              <Stamp className="absolute -right-10 -top-3 w-8 h-8" delay={1}>
                <StarSvg className="w-full h-full" />
              </Stamp>
            </h1>
            <p className="mt-5 font-inter text-base lg:text-lg text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {intro}
            </p>
            <p className="mt-4">
              <Button as="a" href={MAILTO} variant="outline" size="sm">Email Me</Button>
            </p>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <div className="space-y-4">
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
