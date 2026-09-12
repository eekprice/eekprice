import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';
import { ReactComponent as Mesm } from '../assets/mesm.svg';

function Nav({ showProfileInNav = false }) {
  // Add dark mode toggle function
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center relative">
            {/* Navigation bar styled as a horizontal Auto Layout */}
            <motion.nav
             layout
             className="bg-surface-background100-light dark:bg-surface-background100-dark
             text-surface-foreground100-light dark:text-surface-foreground100-dark
             border border-1 border-surface-outline-light dark:border-surface-outline-dark
             inline-flex w-max flex-col md:flex-row items-center rounded-2xl px-3 pt-1 h-16">

              <AnimatePresence>
                {showProfileInNav && (
                  <motion.div
                    key="nav-profile"
                    role="button"
                    tabIndex={0}
                    aria-label="Back to top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="relative flex flex-col items-center flex-shrink-0 mr-2 overflow-visible cursor-pointer"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 56, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 border-[#003347] dark:border-slate-200 overflow-hidden bg-surface-background200-light dark:bg-surface-background200-dark"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5, times: [0, 0.65, 1], ease: "easeOut" }}
                    >
                      <motion.div
                        initial={{ scale: 1.7, y: 18, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.32, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Mesm className="w-12 h-12" />
                      </motion.div>
                    </motion.div>
                    <span className="absolute text-sm font-int font-normal whitespace-nowrap text-surface-foreground200-light dark:text-surface-foreground200-dark translate-y-[60px]">
                      Erica Price
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Sticky note element*/}
              <div className="relative ml-4">
                <Stickies text="Case Study" />
              </div>
              
              {/* Container for navigation items, similar to a nested Frame */}
              <div className="p-3 pb-4 h-full flex flex-col md:flex-row">
                
                {/* List of navigation items, like a horizontal Auto Layout with spacing */}
                <ul className="flex flex-col md:flex-row items-center gap-x-4">
                  
                  {/* Individual navigation item, similar to a component instance */}
                  <li className="inline-flex m-0 p-0">
                    <SideProjectsButton />
                  </li>
                  
                  {/* Group of contact and resume items, akin to a nested Auto Layout */}
                  <div className="flex flex-row items-center gap-x-4">
                    <li className="inline-flex m-0 p-0">
                      <AtomContact />
                    </li>
                    <li className="inline-flex m-0 p-0">
                      <AtomResume />
                    </li>
                  </div>
                </ul>
              </div>
            </motion.nav>
          </div>
          
          {/* Add dark mode toggle button */}
          <motion.button
            onClick={toggleDarkMode}
            className="ml-2 p-3.5 rounded-full 
                     bg-surface-background200-light dark:bg-surface-background200-dark
                     text-surface-foreground100-light dark:text-surface-foreground100-dark
                     border-2 border-surface-border100-light dark:border-surface-border100-dark
                     shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-in-out
                     flex items-center justify-center
                     group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-500 rotate-0 dark:rotate-[360deg]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                className="hidden dark:block"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646"
                className="block dark:hidden"
              />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

export default Nav; 