import React from 'react';
import { useNavigate } from 'react-router-dom';

// Desktop-only pill in the floating nav. On phones the nav shows a plain
// "Projects" NavItem instead (see Nav.js).
const SideProjectsButton = () => {
  const navigate = useNavigate();

  const handleTextClick = () => {
    // TODO: /new-page has no Route yet (index.js only has a BrowserRouter).
    navigate('/new-page');
  };

  return (
    <div className="hidden lg:inline-flex items-center justify-center rounded-lg border relative p-0 border-surface-outline-light dark:border-surface-outline-dark hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark transition-transform duration-300 hover:rotate-2 cursor-pointer">
      {/* Left Dot */}
      <span
        className="bg-surface-foreground100-light dark:bg-surface-foreground100-dark rounded-full absolute border-2 border-white dark:border-slate-800"
        style={{
          width: '8px',
          height: '8px',
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      ></span>

      {/* Text Container */}
      <div
        className="flex-grow flex items-center justify-center border-r border-surface-outline-light dark:border-surface-outline-dark px-2 py-2.5 pl-4 cursor-pointer rounded-l-lg"
        onClick={handleTextClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleTextClick()}
        aria-label="Navigate to Side Projects page"
      >
        <span className="text-surface-foreground100-light dark:text-surface-foreground100-dark font-medium text-sm leading-[150%] font-inter whitespace-nowrap">
          Side Projects
        </span>
      </div>

      {/* Chevron */}
      <div
        className="flex items-center justify-center px-2 py-2.5 rounded-r-lg"
        role="button"
        tabIndex={0}
        aria-label="Expand menu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-3 h-3 rotate-90 text-surface-foreground100-light dark:text-surface-foreground100-dark"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Right Dot */}
      <span
        className="bg-surface-foreground100-light dark:bg-surface-foreground100-dark rounded-full absolute border-2 border-white dark:border-slate-800"
        style={{
          width: '8px',
          height: '8px',
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      ></span>
    </div>
  );
};

export default SideProjectsButton;
