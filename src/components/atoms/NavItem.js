import React from 'react';

// One shell for every icon in the floating nav, in the style of a FigJam
// toolbar: no outline, a soft fill on hover, a solid fill when active.
// The text label sits under the icon inside the bar at every size (clipped
// on phones); the aria-label carries the full name for screen readers.
//
// Renders an <a> when `href` is given, otherwise a <button>.
//   active  - visual "you are here" state (solid fill)
//   pressed - aria-pressed for toggles like the theme button
//   open    - this item's menu is open (pale fill, and aria-expanded). Pass
//             true or false for an item that has a menu, nothing otherwise.

// Every item is the same width, so the bar reads as an even row whatever the
// labels say (Erica, 2026-11-20). From 640px that width fits the longest
// label shown, "Projects" (the full "Side Projects" made every item wide and
// left too much white space, so it is shortened under the icon; the full
// name is still what screen readers hear and what the desktop pill says).
// On a phone it is the icon's width.
const shellClass = 'group relative flex flex-col items-center cursor-pointer w-11 sm:w-14';

const boxClass = `w-11 h-8 lg:h-9 rounded-lg
  flex items-center justify-center
  transition-colors duration-200`;

const idleBoxClass = `text-surface-foreground100-light dark:text-surface-foreground100-dark
  group-hover:bg-surface-background200-light dark:group-hover:bg-surface-background200-dark`;

const activeBoxClass = `bg-primary-foreground-light text-white
  dark:bg-primary-foreground-dark dark:text-teal-900`;

// A menu that is open above this item. Lighter than "you are here": a pale
// teal fill with a teal edge, so the two never look the same (Erica,
// 2026-11-20: "the active state on popover should be different from the
// selected state").
const openBoxClass = `bg-primary-surface-light text-primary-foreground-light ring-1 ring-inset ring-primary-outline-light
  dark:bg-primary-surface-dark dark:text-primary-foreground-dark dark:ring-primary-outline-dark`;

// The main item of the bar on small screens (Work): a rounded square tile
// that holds the icon and its label together, a little taller than the bar
// and raised, so it breaks the bar's top edge like a tab cut out of it
// (Erica, 2026-11-20: "this whole thing should be in the container and make it
// rounded square"). It is white like the bar, with the bar's border and a
// shadow, so it stands out by shape and does not compete with the page you
// are on. It only turns solid teal on the Work page, like any other item.
// With its menu open it gets the pale teal "open" look.
// After Otter, Docusign, Pangea and Hypelist on Mobbin
// (Canon/design-references.md, "Center nav button").
const tileClass = `flex flex-col items-center justify-center gap-0.5 sm:gap-1
  w-12 h-[60px] sm:w-16 sm:h-[68px] -translate-y-2 rounded-2xl border shadow-md
  transition-[transform,background-color,color] duration-200 group-hover:-translate-y-2.5 group-active:-translate-y-1.5`;
const tileIdleClass = `bg-surface-background100-light dark:bg-surface-background100-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark
  border-surface-outline-light dark:border-surface-outline-dark
  group-hover:bg-surface-background200-light dark:group-hover:bg-surface-background200-dark`;
const tileActiveClass = `bg-primary-foreground-light text-white border-primary-foreground-light
  dark:bg-primary-foreground-dark dark:text-teal-900 dark:border-primary-foreground-dark`;
const tileOpenClass = `bg-primary-surface-light text-primary-foreground-light border-primary-outline-light
  dark:bg-primary-surface-dark dark:text-primary-foreground-dark dark:border-primary-outline-dark`;
// The label inside the tile takes the tile's text color.
const tileLabelClass = 'block text-[10px] sm:text-xs font-inter font-normal whitespace-nowrap leading-tight';

const iconClass = 'w-6 h-6';

// Shared with the sticky pile in Nav.js so every label sits on one baseline.
// On a phone the label is small and cut off with an ellipsis at the icon's
// width, so a long one reads "Side Pro…" (Erica, 2026-11-20). From 640px it
// shows in full.
export const navLabelClass = `block max-w-[2.75rem] truncate sm:max-w-none mt-0.5 sm:mt-0
  text-[10px] sm:text-xs font-inter font-normal whitespace-nowrap leading-tight
  text-surface-foreground200-light dark:text-surface-foreground200-dark
  group-hover:text-surface-foreground100-light dark:group-hover:text-surface-foreground100-dark`;

// The design system's focus ring: a 2px gap in the page color, then 2px of
// solid dark teal. The old light teal ring was 1.8:1 on white.
export const focusRingClass = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark
  focus-visible:ring-offset-backdrop-background-light dark:focus-visible:ring-offset-backdrop-background-dark`;

export const navFocusClass = `${focusRingClass} rounded-lg`;

// `label` is the accessible name. `shortLabel` is what shows under the icon
// when the accessible name is too long to fit (e.g. "Theme").
//   prominent - the raised tile, for the bar's main item
function NavItem({ icon: Icon, label, shortLabel, href, onClick, external = false, active = false, pressed, open, prominent = false, className = '' }) {
  const inner = prominent ? (
    <span className={`${tileClass} ${active ? tileActiveClass : open ? tileOpenClass : tileIdleClass}`}>
      <Icon className={iconClass} aria-hidden="true" />
      <span className={tileLabelClass} aria-hidden="true">{shortLabel || label}</span>
    </span>
  ) : (
    <>
      <span className={`${boxClass} ${active ? activeBoxClass : open ? openBoxClass : idleBoxClass}`}>
        <Icon className={iconClass} aria-hidden="true" />
      </span>
      <span className={navLabelClass} aria-hidden="true">{shortLabel || label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        className={`${shellClass} ${navFocusClass} ${className}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      aria-expanded={open}
      aria-haspopup={open === undefined ? undefined : 'menu'}
      aria-current={active ? 'page' : undefined}
      className={`${shellClass} ${navFocusClass} appearance-none bg-transparent border-0 p-0 ${className}`}
    >
      {inner}
    </button>
  );
}

export default NavItem;
