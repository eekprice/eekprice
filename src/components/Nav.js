import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Side Projects was off from 2026-11-19 and is back as of 2026-11-20 (Erica:
// "bring back the side project button ... and have the education item that way
// a user can find it"). The page it opens lists Education.
import SideProjectsButton from './SideProjectsButton';
import NavMenu from './NavMenu';
// Contact is off the nav at every size (Erica, 2026-11-20: it "can be found on
// resume"). The Resume page has the Email Me button. Kept so it can come back.
// import AtomContact from './atoms/atomContact';
import AtomResume from './atoms/atomResume';
import Stickies from './atoms/atomStickies.js';
import NavItem, { navFocusClass } from './atoms/NavItem';
import StickyFan from './StickyFan';
import { getCaseStudy } from '../data/caseStudies';

// The four notes in the sticky fan, back to front: pink, green, blue, yellow.
// Erica, 2026-11-20: a note for the Principal Product Consultant role (pink).
// Erica, 2026-11-16: the yellow one is the leadership study. Helix Booking
// used to be there; it is still on Past Work, behind the fan's "All" button.
const fanStudies = ['cgi-leadership', 'yum-pos', 'menu-management', 'yum-ux-leadership'].map(getCaseStudy).filter(Boolean);

// The same studies as a menu, for the Work icon on screens with no sticky
// pile. Each row has its note's color and name. The last row is the Past
// Work page.
const NOTE_SWATCH = ['bg-pink-200', 'bg-green-300', 'bg-blue-300', 'bg-yellow-200'];
const workMenu = [
  ...fanStudies.map((study, i) => ({
    title: study.note?.title || study.title,
    to: `/case-study/${study.slug}`,
    swatch: NOTE_SWATCH[i],
  })),
  { title: 'All Past Work', to: '/work', divided: true },
];

// Floating bottom nav, laid out like a FigJam toolbar: a white bar with
// groups split by thin dividers.
//   [Home] | [sticky note + Side Projects] | [About, Contact, Resume, Theme]
// The sticky note is Erica's original (atoms/atomStickies.js). Clicking it
// fans its three notes out, one per case study (StickyFan.js).
// On phones that group is hidden and a Work icon joins the icon group.
// Text labels sit under each icon, inside the bar, from `sm` up.

const HomeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 6l12 12M18 6L6 18" />
  </svg>
);

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


const Divider = () => (
  <span
    aria-hidden="true"
    className="shrink-0 w-px h-7 sm:h-9 mx-1.5 lg:mx-2.5 bg-surface-outline-light dark:bg-surface-outline-dark"
  />
);

const GridIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function Nav({ showHome = false }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const inWork = pathname === '/work' || pathname.startsWith('/case-study/');

  // On the home page the Home item is the current page, and it scrolls to the
  // top. Anywhere else it goes home.
  const homeAction = onHome ? scrollToTop : () => navigate('/');

  // On desktop the sticky pile opens a fan of the case studies. The pile's
  // notes leave the bar to make the fan, so the pile is hidden from the moment
  // it opens until the notes are back (`pileOut`), and a close button sits in
  // its place.
  const [fanOpen, setFanOpen] = useState(false);
  const [pileOut, setPileOut] = useState(false);
  const pileRef = useRef(null);
  const refocusPile = useRef(false);

  const openFan = () => {
    setPileOut(true);
    setFanOpen(true);
  };
  const closeFan = useCallback(({ refocus = false } = {}) => {
    refocusPile.current = refocus;
    setFanOpen(false);
  }, []);
  const fanExited = useCallback(() => setPileOut(false), []);

  // Once the pile is back, hand keyboard focus back to it if the fan was
  // closed with the close button or Escape.
  useEffect(() => {
    if (!pileOut && refocusPile.current) {
      refocusPile.current = false;
      pileRef.current?.focus();
    }
  }, [pileOut]);

  // A new page closes it.
  useEffect(() => {
    setFanOpen(false);
  }, [pathname]);

  return (
    <div className="relative z-50 px-2 lg:px-8">
      <motion.nav
        layout
        aria-label="Site"
        className="bg-surface-background100-light dark:bg-surface-background100-dark
          text-surface-foreground100-light dark:text-surface-foreground100-dark
          border border-surface-outline-light dark:border-surface-outline-dark
          shadow-lg
          inline-flex w-max flex-row items-center rounded-2xl px-2 lg:px-3 h-14 sm:h-16 lg:h-[4.25rem]"
      >
        <AnimatePresence>
          {showHome && (
            <motion.div
              key="nav-home"
              className="hidden lg:flex flex-row items-center"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* A plain home icon, in the same shell as every other item. */}
              <NavItem icon={HomeIcon} label="Home" onClick={homeAction} active={onHome} className="flex-shrink-0" />
              <Divider />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared container: Erica's sticky note and Side Projects. Desktop only,
            the sticky is 160px tall and doesn't fit a phone bar. */}
        <div className="hidden lg:flex flex-row items-center gap-3">
          <div className="relative ml-2">
            <div
              ref={pileRef}
              className={`relative rounded-md ${navFocusClass} ${pileOut ? 'invisible' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Case studies"
              aria-expanded={fanOpen}
              aria-controls="sticky-fan"
              onClick={openFan}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openFan();
                }
              }}
            >
              <Stickies text="Case Study" />
            </div>
            {/* While the notes are out, the close button takes the pile's place in the bar. */}
            {fanOpen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <NavItem
                  icon={CloseIcon}
                  label="Close case studies"
                  shortLabel="Close"
                  onClick={() => closeFan({ refocus: true })}
                />
              </div>
            )}
            <StickyFan
              id="sticky-fan"
              open={fanOpen}
              studies={fanStudies}
              onClose={closeFan}
              onAll={() => navigate('/work')}
              onExited={fanExited}
            />
          </div>
          <SideProjectsButton />
        </div>

        <span className="hidden lg:inline-flex">
          <Divider />
        </span>


        <ul className="flex flex-row items-center gap-1 sm:gap-2 lg:gap-3 m-0 p-0 list-none">
          {/* Under 1024px: Home, Side Projects, Work, About, Resume. Work is in
              the middle (Erica, 2026-11-20). She tried it as a raised circle
              and then a raised tile and did not like the emphasis, so it is
              a plain item like the rest; `prominent` on NavItem still draws
              the tile if it is wanted back. Home is always in the bar here,
              so Work stays in the middle on every page. There is no sticky
              pile at these sizes, so Work opens a menu of the same featured
              studies, then All Past Work. */}
          <li className="inline-flex lg:hidden m-0 p-0">
            <NavItem icon={HomeIcon} label="Home" onClick={homeAction} active={onHome} />
          </li>
          <li className="inline-flex lg:hidden m-0 p-0">
            <SideProjectsButton compact />
          </li>
          <li className="inline-flex lg:hidden m-0 p-0">
            <NavMenu id="work-menu" icon={GridIcon} label="Work" heading="Case Studies" items={workMenu} active={inWork} width="w-60" />
          </li>
          {/* About sits just left of Resume (Erica, 2026-11-20). */}
          <li className="inline-flex m-0 p-0">
            <NavItem
              icon={PersonIcon}
              // Erica, 2026-11-20: the nav says Hobbies, which is what the page is.
              // The address is still /about.
              label="Hobbies"
              onClick={() => navigate('/about')}
              active={pathname === '/about'}
            />
          </li>
          <li className="inline-flex m-0 p-0">
            <AtomResume onClick={() => navigate('/resume')} active={pathname === '/resume'} />
          </li>
          {/* Theme is not in the bar any more (Erica, 2026-11-20). It is its own
              button in a corner of the screen: components/ThemeToggle.js. */}
        </ul>
      </motion.nav>
    </div>
  );
}

export default Nav;
