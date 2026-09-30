import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';
import NavItem from './atoms/NavItem';
import { ReactComponent as Mesm } from '../assets/mesm.svg';
import { useTheme } from '../hooks/useTheme';
import { useIsMobile } from '../hooks/useMediaQuery';

// Floating bottom nav. One horizontal row at every width so it fits a phone.
// Desktop adds the sticky pile, the Side Projects pill, and text labels under
// each item (NavItem hides labels below `sm`). There is room for a fifth item.

const GridIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
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
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      className="hidden dark:block"
    />
    {/* moon, shown in light mode */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646"
      className="block dark:hidden"
    />
  </svg>
);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const goToWork = () => {
  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Nav({ showProfileInNav = false }) {
  const { isDark, toggle } = useTheme();
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';

  // On the home page the avatar scrolls to the top. Anywhere else it goes home.
  const avatarAction = onHome ? scrollToTop : () => navigate('/');
  const avatarLabel = onHome ? 'Back to top' : 'Home';

  const workAction = onHome ? goToWork : () => navigate('/#case-studies');

  return (
    <div className="relative z-50 px-2 lg:px-8">
      <motion.nav
        layout
        aria-label="Site"
        className="bg-surface-background100-light dark:bg-surface-background100-dark
          text-surface-foreground100-light dark:text-surface-foreground100-dark
          border border-surface-outline-light dark:border-surface-outline-dark
          inline-flex w-max flex-row items-center rounded-2xl px-2 lg:px-3 h-14 lg:h-16"
      >
        <AnimatePresence>
          {showProfileInNav && (
            <motion.div
              key="nav-profile"
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
              className="relative flex flex-col items-center flex-shrink-0 mr-1 lg:mr-2 overflow-visible cursor-pointer"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobile ? 48 : 56, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#003347] dark:border-slate-200 overflow-hidden bg-surface-background200-light dark:bg-surface-background200-dark"
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
                  <Mesm className="w-10 h-10 lg:w-12 lg:h-12" />
                </motion.div>
              </motion.div>
              <span className="hidden sm:block absolute text-sm font-inter font-normal whitespace-nowrap text-surface-foreground200-light dark:text-surface-foreground200-dark translate-y-[60px]">
                Erica Price
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky note pile, desktop only */}
        <div className="relative ml-4 hidden lg:block">
          <Stickies text="Case Study" />
        </div>

        <ul className="flex flex-row items-center gap-1.5 sm:gap-3 lg:gap-4 px-1 lg:px-3">
          <li className="hidden lg:inline-flex m-0 p-0">
            <SideProjectsButton />
          </li>
          <li className="inline-flex lg:hidden m-0 p-0">
            <NavItem icon={GridIcon} label="Work" onClick={workAction} />
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
          {/* Fifth slot reserved for the "Ask" assistant later */}
        </ul>
      </motion.nav>
    </div>
  );
}

export default Nav;
