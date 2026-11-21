import React, { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyPage from './pages/CaseStudyPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import SideProjectsPage from './pages/SideProjectsPage';
import ResumePage from './pages/ResumePage';
import WorkivaPage from './pages/WorkivaPage';
import LeadershipPage from './pages/LeadershipPage';
import EducationPage from './pages/EducationPage';
import FoundingDesignerPage from './pages/FoundingDesignerPage';
import CursorTag from './components/CursorTag';
import ThemeToggle from './components/ThemeToggle';
import { SketchDefs } from './components/sketch/Sketch';
import { recordLocation } from './hooks/useTrail';
import { pageSeen, markPageSeen, holdStill } from './data/opening';

// Breakpoint contract: 1023px and under is the phone layout (Tailwind `lg`).
// Use `lg:` for layout classes so CSS and useIsMobile() agree.

// Start each new page at the top. Hash links are handled by the page itself.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// How long a visitor has to be on a page before its entrance counts as seen.
const SEEN_AFTER_MS = 1500;

function App() {
  // Note the page before it renders, so its breadcrumb knows the way here.
  const location = useLocation();
  recordLocation(location);

  // Entrances play once per visit (Erica, 2026-11-20). Coming back to a page
  // that has been seen: `sk-still` holds its sketches finished and
  // framer-motion skips its entrances. A refresh plays everything again.
  // Decided once per arrival, so the page does not change under the visitor.
  // Home looks after its own opening (pages/Home.js).
  const { pathname, key } = location;
  const still = useMemo(() => {
    const was = pageSeen(pathname);
    if (was) holdStill();
    return was;
    // `key` is not read above, but it changes on every arrival, and that is
    // what makes this run again when the visitor lands on the same address.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname]);
  useEffect(() => {
    const timer = setTimeout(() => markPageSeen(pathname), SEEN_AFTER_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="App min-h-screen bg-backdrop-background-light dark:bg-backdrop-background-dark dotted-background overflow-x-hidden">
      <ScrollToTop />
      <SketchDefs />
      <CursorTag />
      <ThemeToggle />
      <div className={still ? 'sk-still' : undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/side-projects" element={<SideProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/workiva" element={<WorkivaPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        {/* Nothing links here yet (Erica, 2026-11-20: just the page for now). */}
        <Route path="/education" element={<EducationPage />} />
        <Route path="/founding-designer" element={<FoundingDesignerPage />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
