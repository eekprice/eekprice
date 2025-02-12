import React from 'react';
import { motion } from 'framer-motion';
import SideProjectsButton from './SideProjectsButton';
import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';
import { ReactComponent as Mustache } from '../assets/mustache.svg';

function Nav() {
  // Add dark mode toggle function
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-surface-background100-light dark:bg-surface-background100-dark py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center relative">
            {/* Add mustache with absolute positioning */}
            <div className="absolute left-[45px] top-[45px] z-10 w-8">
              <Mustache className="text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
            </div>
            
            {/* Navigation bar styled as a horizontal Auto Layout */}
            <nav className="bg-surface-background100-light dark:bg-surface-background100-dark
             text-surface-foreground100-light dark:text-surface-foreground100-dark 
             border border-1 border-surface-outline-light dark:border-surface-outline-dark 
             inline-flex flex-col md:flex-row items-center rounded-2xl overflow-hidden pl-5 h-auto md:h-16 ">
              
              {/* Sticky note element*/}
              <Stickies text="Case Study" />
              
              {/* Container for navigation items, similar to a nested Frame */}
              <div className="p-3 pb-4 border-l border border-1 border-surface-outline-light dark:border-surface-outline-dark h-full flex flex-col md:flex-row">
                
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
            </nav>
          </div>
          
          {/* Add dark mode toggle button */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-3 rounded-full 
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