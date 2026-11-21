import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { focusRingClass } from './atoms/NavItem';

// The light and dark switch, on its own outside the floating nav (Erica,
// 2026-11-20: "theme should be outside of this nav item in all places. on
// mobile the theme would be in the top right hand corner").
//
// From 640px up it sits in the bottom right corner, level with the nav. On a
// phone it sits in the top right corner. It is on every page, all the time:
// App.js draws it once.

const ThemeIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={`${className} transition-transform duration-500 rotate-0 dark:rotate-[360deg]`}
    {...props}
  >
    {/* sun, shown in dark mode */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      className="hidden dark:block"
    />
    {/* moon, shown in light mode */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646"
      className="block dark:hidden"
    />
  </svg>
);

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`fixed z-50 right-3 top-3 sm:top-auto sm:right-6 sm:bottom-[50px] lg:right-8 lg:bottom-[52px]
        grid place-items-center w-11 h-11 rounded-2xl cursor-pointer appearance-none p-0
        bg-surface-background100-light dark:bg-surface-background100-dark
        text-surface-foreground100-light dark:text-surface-foreground100-dark
        border border-surface-outline-light dark:border-surface-outline-dark shadow-lg
        transition-colors duration-200
        hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark
        ${focusRingClass}`}
    >
      <ThemeIcon className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
