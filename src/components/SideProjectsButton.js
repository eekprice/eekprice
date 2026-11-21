import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { focusRingClass } from './atoms/NavItem';
import NavMenu from './NavMenu';
import { sideProjects } from '../data/sideProjects';

// The Side Projects pill in the floating nav, desktop only.
//
// It opens a plain menu above the pill (Erica, 2026-11-20: the card popover
// was "too busy make it a generic pop over menu with education as an item and
// add a coming soon one too"). Each item in data/sideProjects.js is a row: a
// page on the site is a link, and one with `soon: true` is greyed out and
// can't be picked.
//
// Escape, a click anywhere else, the pill again, or picking an item closes it.
//
// `compact` is the same menu behind a plain nav icon, for screens under
// 1024px where the pill doesn't fit (Erica, 2026-11-20: "need to add a side
// project item"). Nav.js shows one or the other, never both.
const SparkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const SideProjectsButton = ({ compact = false }) => {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const button = useRef(null);
  const first = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(({ refocus = false } = {}) => {
    setOpen(false);
    if (refocus) button.current?.focus({ preventScroll: true });
  }, []);

  // Going to another page closes it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close({ refocus: true });
    };
    const onDown = (e) => {
      if (!wrap.current?.contains(e.target)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    const focus = setTimeout(() => first.current?.focus({ preventScroll: true }), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      clearTimeout(focus);
    };
  }, [open, close]);

  // Under 1024px it is a plain nav icon with the same menu (components/NavMenu.js).
  if (compact) {
    return <NavMenu id="side-projects-menu-compact" icon={SparkIcon} label="Side Projects" shortLabel="Projects" heading="Side Projects" items={sideProjects} />;
  }

  const dot =
    'bg-surface-foreground100-light dark:bg-surface-foreground100-dark rounded-full absolute border-2 border-white dark:border-slate-800 w-2 h-2 top-1/2 -translate-y-1/2';
  const row = 'flex items-center justify-between gap-3 w-full rounded-md px-3 py-2 font-inter text-sm text-left no-underline';
  const firstLink = sideProjects.findIndex((item) => !item.soon);
  // On one of the menu's pages the pill shows as current (Erica, 2026-11-20).
  const here = sideProjects.some((item) => item.to === pathname);

  return (
    <div ref={wrap} className="relative hidden lg:inline-flex">
      <button
        ref={button}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="side-projects-menu"
        aria-current={here ? 'page' : undefined}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-stretch rounded-lg border relative p-0 cursor-pointer
          border-surface-outline-light dark:border-surface-outline-dark
          hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark
          transition-transform duration-300 hover:rotate-2 ${focusRingClass}
          ${open ? 'bg-surface-background200-light dark:bg-surface-background200-dark' : here ? 'bg-teal-50 dark:bg-teal-900 !border-teal-700 dark:!border-teal-400' : ''}`}
      >
        <span className={`${dot} -left-1`} aria-hidden="true" />
        <span className="flex items-center border-r border-surface-outline-light dark:border-surface-outline-dark px-2 py-2.5 pl-4 text-surface-foreground100-light dark:text-surface-foreground100-dark font-medium text-sm leading-[150%] font-inter whitespace-nowrap">
          Side Projects
        </span>
        <span className="flex items-center justify-center px-2 py-2.5" aria-hidden="true">
          {/* Points down when closed, up when the menu is out above it. */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`w-3 h-3 text-surface-foreground100-light dark:text-surface-foreground100-dark transition-transform duration-200 ${open ? '-rotate-90' : 'rotate-90'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span className={`${dot} -right-1`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="side-projects-menu"
            id="side-projects-menu"
            role="menu"
            aria-label="Side projects"
            className="absolute z-20 bottom-full left-1/2 mb-4 w-52 m-0 p-1 list-none rounded-lg
              border border-surface-outline-light dark:border-surface-outline-dark
              bg-surface-background100-light dark:bg-surface-background100-dark shadow-lg"
            style={{ x: '-50%' }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {sideProjects.map((item, i) => (
              <li key={item.title} role="none" className="m-0 p-0">
                {item.soon ? (
                  <span
                    role="menuitem"
                    aria-disabled="true"
                    className={`${row} cursor-default text-surface-foreground400-light dark:text-surface-foreground400-dark`}
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link
                    ref={i === firstLink ? first : undefined}
                    role="menuitem"
                    to={item.to}
                    onClick={() => close()}
                    className={`${row} font-medium text-surface-foreground100-light dark:text-surface-foreground100-dark
                      hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark ${focusRingClass}`}
                  >
                    <span className="flex items-center gap-2.5">
                      {item.dot && <span aria-hidden="true" className={`shrink-0 w-2.5 h-2.5 rounded-full ${item.dot}`} />}
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideProjectsButton;
