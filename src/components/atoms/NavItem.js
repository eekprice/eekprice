import React from 'react';

// One shell for every item in the floating nav so they line up at any width.
// 44px tap target on phones, 48px on desktop. The text label only shows from
// `sm` up; the aria-label carries it for screen readers everywhere.
//
// Renders an <a> when `href` is given, otherwise a <button>.

const shellClass = 'group relative flex flex-col items-center cursor-pointer';

const boxClass = `w-11 h-11 lg:w-12 lg:h-12 rounded-lg
  border border-surface-outline-light dark:border-surface-outline-dark
  flex items-center justify-center
  transition-colors duration-300
  group-hover:bg-surface-background200-light dark:group-hover:bg-surface-background200-dark
  group-hover:rotate-3`;

const activeBoxClass = 'bg-surface-background200-light dark:bg-surface-background200-dark';

const iconClass = 'w-6 h-6 lg:w-8 lg:h-8 text-surface-foreground100-light dark:text-surface-foreground400-dark';

const labelClass = `hidden sm:block absolute top-full mt-1 text-sm font-inter font-normal whitespace-nowrap
  text-surface-foreground200-light dark:text-surface-foreground200-dark
  group-hover:text-surface-foreground100-light dark:group-hover:text-surface-foreground100-dark`;

const focusClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-outline-light dark:focus-visible:ring-primary-outline-dark rounded-lg';

// `label` is the accessible name. `shortLabel` is what shows under the icon on
// desktop when the accessible name is too long to fit (e.g. "Theme").
function NavItem({ icon: Icon, label, shortLabel, href, onClick, external = false, pressed, className = '' }) {
  const inner = (
    <>
      <div className={`${boxClass} ${pressed ? activeBoxClass : ''}`}>
        <Icon className={iconClass} aria-hidden="true" />
      </div>
      <span className={labelClass} aria-hidden="true">{shortLabel || label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        className={`${shellClass} ${focusClass} ${className}`}
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
      className={`${shellClass} ${focusClass} appearance-none bg-transparent border-0 p-0 ${className}`}
    >
      {inner}
    </button>
  );
}

export default NavItem;
