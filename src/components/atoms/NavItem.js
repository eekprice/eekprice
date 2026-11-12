import React from 'react';

// One shell for every icon in the floating nav, in the style of a FigJam
// toolbar: no outline, a soft fill on hover, a solid fill when active.
// 40px tap target on phones, 44px on desktop. The text label sits under the
// icon inside the bar from `sm` up; the aria-label carries it for screen
// readers everywhere.
//
// Renders an <a> when `href` is given, otherwise a <button>.
//   active  - visual "you are here" state (solid fill)
//   pressed - aria-pressed for toggles like the theme button

const shellClass = 'group relative flex flex-col items-center cursor-pointer';

const boxClass = `w-10 h-10 sm:w-11 sm:h-8 lg:h-9 rounded-lg
  flex items-center justify-center
  transition-colors duration-200`;

const idleBoxClass = `text-surface-foreground100-light dark:text-surface-foreground100-dark
  group-hover:bg-surface-background200-light dark:group-hover:bg-surface-background200-dark`;

const activeBoxClass = `bg-primary-foreground-light text-white
  dark:bg-primary-foreground-dark dark:text-teal-900`;

const iconClass = 'w-6 h-6';

// Shared with the sticky pile in Nav.js so every label sits on one baseline.
export const navLabelClass = `hidden sm:block text-xs font-inter font-normal whitespace-nowrap leading-tight
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
function NavItem({ icon: Icon, label, shortLabel, href, onClick, external = false, active = false, pressed, className = '' }) {
  const inner = (
    <>
      <span className={`${boxClass} ${active ? activeBoxClass : idleBoxClass}`}>
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
      aria-current={active ? 'page' : undefined}
      className={`${shellClass} ${navFocusClass} appearance-none bg-transparent border-0 p-0 ${className}`}
    >
      {inner}
    </button>
  );
}

export default NavItem;
