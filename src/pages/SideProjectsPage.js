import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { Stage, Swap, Underline, WireBlock } from '../components/sketch/Sketch';
import ProjectCard from '../components/ProjectCard';
import FloatingNav from '../components/FloatingNav';
import { sideProjects } from '../data/sideProjects';

// Side Projects, as a page. The pill in the desktop nav opens a small menu of
// the same items now (components/SideProjectsButton.js), so nothing links here.
// It is kept for a direct link and for phones later.
//
// It lists Education (Erica, 2026-11-20: bring the button back "and have the
// education item that way a user can find it"). The card is built like a
// card on Past Work and sketches itself first. Under it is one pencil
// wireframe and "coming soon", for the side projects that are not written
// up yet.
// TODO(Erica): the real side projects (Ariso, SciSummary, Helix Booking...).

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

// Laid out like a card on Past Work: picture, then a short line, a title,
// two lines of copy and the link.
const cardLines = [22, 58, 90, 76, 34];

function SketchedCard({ item, at }) {
  return (
    <Stage>
      <Swap at={at} hold={900} wire={{ row: true, lines: cardLines }}>
        <ProjectCard item={item} />
      </Swap>
    </Stage>
  );
}

function SideProjectsPage() {
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mt-6 inline-block text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground100-light dark:text-surface-foreground100-dark">
              <Underline bold tone="teal" delay={reduce ? 0 : 450}>
                Side Projects
              </Underline>
            </h1>
          </motion.div>
        </header>
      </div>

      <main className="max-w-[800px] mx-auto px-4 pb-12">
        <div className="space-y-6">
          {sideProjects.filter((item) => item.image).map((item, i) => (
            <SketchedCard key={item.to} item={item} at={500 + i * 220} />
          ))}
          <Stage className="space-y-6">
            <WireBlock row lines={cardLines} at={900} className="h-72 sm:h-48" />
            <p className="sk-annotation px-1" style={{ '--sk-delay': '2000ms' }}>
              more coming soon
            </p>
          </Stage>
        </div>
        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default SideProjectsPage;
