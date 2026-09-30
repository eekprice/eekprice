import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyPage from './pages/CaseStudyPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';

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

function App() {
  return (
    <div className="App min-h-screen bg-backdrop-background-light dark:bg-backdrop-background-dark dotted-background overflow-x-hidden">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
