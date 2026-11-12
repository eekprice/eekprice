import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button from './Button';
import { focusRingClass } from './atoms/NavItem';

// The sticky pile in the nav, fanned out. Clicking the pile sends its three
// notes out of the bar and spreads them above it, one per case study, each a
// link to that study. An "All" button sits between them for the full list.
// While the notes are out, Nav.js hides the pile and puts a close button in
// its place. Closing sends the notes back. Desktop only, like the pile.
//
// Render it inside the `position: relative` box around the pile. Everything
// is placed from one point just above the top of the pile.

// For each note: `from` is where it sits in the pile (the same place, tilt and
// size as the pile's own note in atoms/atomStickies.js), `to` is where it
// comes to rest. Green is the back note, blue the middle, yellow the front.
const NOTES = [
  {
    from: { x: -16, y: 96, rotate: -8, scale: 0.89 },
    to: { x: -165, y: -95, rotate: -10, scale: 1 },
    paper: 'bg-green-300 text-slate-800',
  },
  {
    from: { x: -8, y: 84, rotate: -5, scale: 0.89 },
    to: { x: 0, y: -158, rotate: 1.5, scale: 1 },
    paper: 'bg-blue-300 text-slate-800',
  },
  {
    from: { x: 0, y: 72, rotate: 0, scale: 0.89 },
    to: { x: 165, y: -95, rotate: 10, scale: 1 },
    paper:
      'bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark',
  },
];

// A white patch behind an outline button, so it reads on top of the page.
const patch = 'inline-flex rounded-md bg-surface-background100-light dark:bg-surface-background100-dark shadow-md';

function StickyFan({ id, open, studies, onClose, onAll, onExited }) {
  const reduce = useReducedMotion();
  const firstNote = useRef(null);

  // Escape closes it. Opening moves keyboard focus to the first note.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose({ refocus: true });
    };
    document.addEventListener('keydown', onKey);
    const focus = setTimeout(() => firstNote.current?.focus({ preventScroll: true }), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(focus);
    };
  }, [open, onClose]);

  return (
    <>
      {/* A light haze over the page while the fan is open. Clicking it closes the fan. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="sticky-fan-haze"
              aria-hidden="true"
              onClick={() => onClose()}
              className="hidden lg:block fixed inset-0 z-40 backdrop-blur-[2px] bg-backdrop-background-light/70 dark:bg-backdrop-background-dark/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* onExitComplete tells the nav the notes are back, so the pile can show again. */}
      <AnimatePresence onExitComplete={onExited}>
        {open && (
          <motion.div
            key="sticky-fan"
            id={id}
            role="group"
            aria-label="Case studies"
            className="absolute left-1/2 top-10 w-0 h-0 z-10"
            exit={{ opacity: 1, transition: { duration: 0.25 } }}
          >
            {studies.slice(0, NOTES.length).map((study, i) => {
              const note = NOTES[i];
              return (
                <motion.div
                  key={study.slug}
                  className="absolute left-0 top-0"
                  initial={reduce ? { ...note.to, opacity: 0 } : { ...note.from, opacity: 1 }}
                  animate={{ ...note.to, opacity: 1 }}
                  exit={
                    reduce
                      ? { opacity: 0, transition: { duration: 0.15 } }
                      : { ...note.from, transition: { duration: 0.22, ease: 'easeIn' } }
                  }
                  transition={
                    reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 22, delay: i * 0.06 }
                  }
                >
                  {/* Paper on hover: lifts, turns a little, and its shadow grows. */}
                  <Link
                    ref={i === 0 ? firstNote : undefined}
                    to={`/case-study/${study.slug}`}
                    onClick={() => onClose()}
                    className={`block w-36 h-36 p-4 rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2
                      font-hand text-base leading-5 font-medium
                      transition-[transform,box-shadow] duration-300 ease-out
                      motion-safe:hover:-translate-y-[calc(50%+8px)] motion-safe:hover:rotate-2 hover:shadow-xl
                      ${focusRingClass} ${note.paper}`}
                  >
                    {/* The name writes in once the note is on its way, and goes before it lands back in the pile. */}
                    <motion.span
                      className="block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.08 } }}
                      transition={{ duration: 0.2, delay: reduce ? 0 : 0.1 + i * 0.06 }}
                    >
                      {study.title}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}

            {/* "All" sits just above the bar, in the middle of the fan. */}
            <motion.div
              className="absolute left-0 top-0 is-in"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2, delay: reduce ? 0 : 0.22 }}
            >
              <div className="flex w-max flex-col items-center pb-3 -translate-x-1/2 -translate-y-full">
                <span className={patch}>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="All case studies"
                    onClick={() => {
                      onClose();
                      onAll();
                    }}
                  >
                    All
                  </Button>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default StickyFan;
