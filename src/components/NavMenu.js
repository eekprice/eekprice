import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import NavItem, { focusRingClass } from './atoms/NavItem';

// A nav icon that opens a small menu above itself. Used in the floating nav
// on screens under 1024px: Work (the featured case studies, then All Past
// Work) and Side Projects.
//
// `items` is a list of rows, top to bottom:
//   { title, to }          a link to a page on the site
//   { title, soon: true }  greyed out, can't be picked
//   `swatch` (optional)    a Tailwind background class for a small square of
//                          color before the title, like a sticky note
//   `dot` (optional)       the same, as a small circle
//   `divided` (optional)   a thin line above the row
// `heading` (optional) is a small label at the top of the menu, for an icon
// whose own label is shortened (Side Projects shows as "Projects").
// `align` is which edge of the icon the menu lines up with: 'center' or
// 'start', for an icon near the left edge of a phone.
//
// Escape, a tap anywhere else, the icon again, or picking a row closes it.
function NavMenu({ id, icon, label, shortLabel, heading, items, active = false, align = 'center', width = 'w-52', prominent = false }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const first = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(({ refocus = false } = {}) => {
    setOpen(false);
    if (refocus) wrap.current?.querySelector('button')?.focus({ preventScroll: true });
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

  const row = 'flex items-center gap-2.5 w-full rounded-md px-3 py-2 font-inter text-sm text-left no-underline';
  const firstLink = items.findIndex((item) => !item.soon);
  const centered = align === 'center';
  // On a page that is one of this menu's rows, the icon shows as the current
  // page, so the visitor can see which menu they are in (Erica, 2026-11-20).
  const here = active || items.some((item) => item.to === pathname);

  return (
    <div ref={wrap} className="relative inline-flex">
      <NavItem
        icon={icon}
        label={label}
        shortLabel={shortLabel}
        onClick={() => setOpen((v) => !v)}
        active={here}
        open={open}
        prominent={prominent}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            key={id}
            id={id}
            role="menu"
            aria-label={label}
            className={`absolute z-20 bottom-full mb-4 ${width} m-0 p-1 list-none rounded-lg
              ${centered ? 'left-1/2' : '-left-2'}
              border border-surface-outline-light dark:border-surface-outline-dark
              bg-surface-background100-light dark:bg-surface-background100-dark shadow-lg`}
            style={centered ? { x: '-50%' } : undefined}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {heading && (
              <li
                role="presentation"
                className="m-0 px-3 pt-2.5 pb-1 font-inter text-xs font-medium uppercase tracking-wide
                  text-surface-foreground400-light dark:text-surface-foreground400-dark"
              >
                {heading}
              </li>
            )}
            {items.map((item, i) => (
              <li
                key={item.title}
                role="none"
                className={`m-0 p-0 ${item.divided ? 'mt-1 pt-1 border-t border-surface-outline-light dark:border-surface-outline-dark' : ''}`}
              >
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
                    aria-current={item.to === pathname ? 'page' : undefined}
                    onClick={() => close()}
                    className={`${row} font-medium text-surface-foreground100-light dark:text-surface-foreground100-dark
                      hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark ${focusRingClass}
                      ${item.to === pathname ? 'bg-surface-background200-light dark:bg-surface-background200-dark' : ''}`}
                  >
                    {item.swatch && <span aria-hidden="true" className={`shrink-0 w-3 h-3 rounded-sm ${item.swatch}`} />}
                    {item.dot && <span aria-hidden="true" className={`shrink-0 w-2.5 h-2.5 rounded-full ${item.dot}`} />}
                    <span className="min-w-0">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavMenu;
