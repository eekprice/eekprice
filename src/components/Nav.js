import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import NavItem, { navLabelClass, navFocusClass } from './atoms/NavItem';
import { ReactComponent as Mesm } from '../assets/mesm.svg';
import { useTheme } from '../hooks/useTheme';

// Floating bottom nav, laid out like a FigJam toolbar: a white bar with
// groups split by thin dividers.
//   [avatar] | [sticky pile + Side Projects] | [About, Contact, Resume, Theme]
// The sticky pile pokes up out of the bar and is the way in to the work.
// Text labels sit under the bar from `sm` up.

const PersonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

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

const Divider = () => (
  <span
    aria-hidden="true"
    className="shrink-0 w-px h-7 mx-1.5 lg:mx-2.5 bg-surface-outline-light dark:bg-surface-outline-dark"
  />
);

// Three sticky notes poking up out of the bar, clipped at its bottom edge.
// They lift on hover. This is the Work button.
function StickyPile({ onClick, active }) {
  const note = 'absolute w-10 h-20 rounded-sm shadow transition-transform duration-300 ease-out';
  const lift = active ? '-translate-y-1.5' : '';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Work"
      aria-current={active ? 'page' : undefined}
      className={`group relative shrink-0 w-14 h-10 lg:h-11 appearance-none bg-transparent border-0 p-0 cursor-pointer ${navFocusClass}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-2 lg:-bottom-[10px] h-[84px] overflow-hidden pointer-events-none"
      >
        <span className={`${note} left-0.5 top-5 bg-green-300 -rotate-[9deg] group-hover:-translate-y-1 ${lift}`} />
        <span className={`${note} left-2 top-[18px] bg-blue-300 -rotate-[3deg] group-hover:-translate-y-1.5 ${lift}`} />
        <span
          className={`${note} left-3.5 top-4 shadow-md rotate-[4deg] group-hover:-translate-y-2.5 ${lift}
            bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark`}
        />
      </span>
      <span className={`${navLabelClass} left-1/2 -translate-x-1/2`} aria-hidden="true">Work</span>
    </button>
  );
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const goToWork = () => {
  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Nav({ showProfileInNav = false }) {
  const { isDark, toggle } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const inWork = pathname === '/work' || pathname.startsWith('/case-study/');

  // On the home page the avatar scrolls to the top. Anywhere else it goes home.
  const avatarAction = onHome ? scrollToTop : () => navigate('/');
  const avatarLabel = onHome ? 'Back to top' : 'Home';

  // On the home page the stickies scroll to the case studies. Anywhere else
  // they open the Past Work page.
  const workAction = onHome ? goToWork : () => navigate('/work');

  return (
    <div className="relative z-50 px-2 lg:px-8">
      <motion.nav
        layout
        aria-label="Site"
        className="bg-surface-background100-light dark:bg-surface-background100-dark
          text-surface-foreground100-light dark:text-surface-foreground100-dark
          border border-surface-outline-light dark:border-surface-outline-dark
          shadow-lg
          inline-flex w-max flex-row items-center rounded-2xl px-2 lg:px-3 h-14 lg:h-16"
      >
        <AnimatePresence>
          {showProfileInNav && (
            <motion.div
              key="nav-profile"
              className="flex flex-row items-center"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={avatarLabel}
                onClick={avatarAction}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    avatarAction();
                  }
                }}
                className={`group relative flex flex-col items-center flex-shrink-0 overflow-visible cursor-pointer rounded-full ${navFocusClass}`}
              >
                <motion.div
                  className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border-2 border-[#003347] dark:border-slate-200 overflow-hidden bg-surface-background200-light dark:bg-surface-background200-dark"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, times: [0, 0.65, 1], ease: 'easeOut' }}
                >
                  <motion.div
                    initial={{ scale: 1.7, y: 18, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.32, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Mesm className="w-10 h-10 lg:w-11 lg:h-11" />
                  </motion.div>
                </motion.div>
                <span aria-hidden="true" className={navLabelClass}>
                  {onHome ? 'Top' : 'Home'}
                </span>
              </div>
              <Divider />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared container: the playful bits */}
        <div className="flex flex-row items-center gap-2 lg:gap-3">
          <StickyPile onClick={workAction} active={inWork} />
          <SideProjectsButton />
        </div>

        <Divider />

        <ul className="flex flex-row items-center gap-1 sm:gap-4 lg:gap-5 m-0 p-0 list-none">
          <li className="inline-flex m-0 p-0">
            <NavItem
              icon={PersonIcon}
              label="About"
              onClick={() => navigate('/about')}
              active={pathname === '/about'}
            />
          </li>
          <li className="inline-flex m-0 p-0">
            <AtomContact />
          </li>
          <li className="inline-flex m-0 p-0">
            <AtomResume />
          </li>
          <li className="inline-flex m-0 p-0">
            <NavItem
              icon={ThemeIcon}
              label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              shortLabel="Theme"
              onClick={toggle}
              pressed={isDark}
            />
          </li>
        </ul>
      </motion.nav>
    </div>
  );
}

export default Nav;
