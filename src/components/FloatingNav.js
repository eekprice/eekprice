import React from 'react';
import Nav from './Nav';

// The floating bottom nav plus the haze behind it. Used by every page.
// `show` slides it in; `showProfileInNav` shows the avatar in the pill.
function FloatingNav({ show = true, showProfileInNav = false }) {
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 h-28 lg:h-40 z-40 pointer-events-none backdrop-blur-sm bg-backdrop-background-light/60 dark:bg-backdrop-background-dark/60 transition-opacity duration-500 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 25%, transparent)',
          maskImage: 'linear-gradient(to top, black 25%, transparent)',
        }}
      />
      <div
        className={`fixed bottom-0 left-1/2 z-50 transform -translate-x-1/2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-10 transition-transform duration-500 ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <Nav showProfileInNav={showProfileInNav} />
      </div>
    </>
  );
}

export default FloatingNav;
