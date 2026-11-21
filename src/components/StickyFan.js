import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button from './Button';
import { focusRingClass } from './atoms/NavItem';

// The sticky pile in the nav, fanned out. Clicking the pile sends its four
// notes out of the bar and spreads them above it, one per case study, each a
// link to that study. An "All Past Work" button sits between them and goes
// to the Past Work page.
// While the notes are out, Nav.js hides the pile and puts a close button in
// its place. Closing sends the notes back. Desktop only, like the pile.
//
// Render it inside the `position: relative` box around the pile. Everything
// is placed from one point just above the top of the pile.

// For each note: `from` is where it sits in the pile (the same place, tilt and
// size as the pile's own note in atoms/atomStickies.js), `to` is where it
// comes to rest. Back to front: pink, green, blue, yellow. Four notes sit in
// an arc, with room under the middle two for the "All" button.
const NOTES = [
  {
    from: { x: -26, y: 104, rotate: -11, scale: 0.89 },
    to: { x: -252, y: -84, rotate: -12, scale: 1 },
    paper: 'bg-pink-200 text-slate-800',
  },
  {
    from: { x: -16, y: 96, rotate: -8, scale: 0.89 },
    to: { x: -86, y: -150, rotate: -4, scale: 1 },
    paper: 'bg-green-300 text-slate-800',
  },
  {
    from: { x: -8, y: 84, rotate: -5, scale: 0.89 },
    to: { x: 86, y: -150, rotate: 4, scale: 1 },
    paper: 'bg-blue-300 text-slate-800',
  },
  {
    from: { x: 0, y: 72, rotate: 0, scale: 0.89 },
    to: { x: 252, y: -84, rotate: 12, scale: 1 },
    paper:
      'bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark',
  },
];

// Brand logos that pop out around a note on hover or keyboard focus. Where
// each one sits, by its `spot` in the study data. Dark mode puts them on a
// white chip, because some logos have black type.
const BRAND_SPOT = {
  top: 'left-1/2 -top-8 w-12 -ml-6 -rotate-6',
  left: '-left-10 top-[56%] w-[68px] -rotate-3',
  right: '-right-5 top-[50%] w-9 rotate-6',
};
const brandClass = `absolute h-auto pointer-events-none select-none
  [filter:drop-shadow(0_0_2px_rgb(255_255_255))_drop-shadow(0_0_1px_rgb(255_255_255))_drop-shadow(0_4px_6px_rgb(15_23_42/0.45))]
  dark:bg-white dark:rounded dark:p-0.5
  opacity-0 scale-50 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
  group-hover:opacity-100 group-hover:scale-100
  group-focus-visible:opacity-100 group-focus-visible:scale-100
  motion-reduce:scale-100 motion-reduce:transition-opacity`;

// A white patch behind an outline button, so it reads on top of the page.
// The patch draws the edge itself, a plain 1px border, and the button's
// hand-drawn loop is hidden: the loop sits a little inside the button, which
// left a rim of white outside the line (Erica, 2026-11-20).
const patch = `inline-flex rounded-md overflow-hidden shadow-md
  bg-surface-background100-light dark:bg-surface-background100-dark
  border border-surface-outline-light dark:border-surface-outline-dark
  [&_.sk-frame]:hidden`;

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
                    className={`group relative block w-36 h-36 p-4 rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2
                      font-inter text-[15px] leading-5 font-semibold
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
                      {study.note?.title || study.title}
                    </motion.span>
                    {/* A picture of the work, always on the note. It fades in with the name. */}
                    {study.note?.image && (
                      <motion.img
                        src={study.note.image}
                        alt=""
                        className="absolute inset-x-2 bottom-2 w-[calc(100%-16px)] h-auto max-h-[76px] object-cover object-left-top rounded-sm pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.08 } }}
                        transition={{ duration: 0.2, delay: reduce ? 0 : 0.1 + i * 0.06 }}
                      />
                    )}
                    {/* The brands, on hover. Each one a beat after the last. */}
                    {study.note?.brands?.map((brand, b) => (
                      <img
                        key={brand.name}
                        src={brand.src}
                        alt=""
                        aria-hidden="true"
                        className={`${brandClass} ${BRAND_SPOT[brand.spot]}`}
                        style={{ transitionDelay: `${b * 60}ms` }}
                      />
                    ))}
                    {study.note?.brands && (
                      <span className="sr-only">, {study.note.brands.map((b) => b.name).join(', ')}</span>
                    )}
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
                    onClick={() => {
                      onClose();
                      onAll();
                    }}
                  >
                    All Past Work
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
