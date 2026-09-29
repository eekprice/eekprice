import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as ArrowSvg } from '../assets/Arrow.svg';
import SectionContainer from '../components/SectionContainer';
import Sticky from '../components/Sticky';
import CaseStudyHero from '../components/caseStudyHero';
import FloatingNav from '../components/FloatingNav';
import { caseStudies } from '../data/caseStudiesData';
import HeroSectionMobile from '../components/section/HeroSectionMobile.js';
import TypingEffect from '../components/TypingEffect';
import EmergencyStop from '../components/EmergencyStop';
import { useIsMobile } from '../hooks/useMediaQuery';

// The desktop hero is its own chunk so phones never download it.
const HeroSection = lazy(() => import('../components/section/HeroSectionDesktop.js'));

function Home() {
  const isMobile = useIsMobile();

  const heroRef = useRef(null);
  const caseStudiesSectionRef = useRef(null);
  const hasTriggeredTyping = useRef(false);

  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [doodleOpacity, setDoodleOpacity] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // Track whether the hero is on screen so the nav can show the avatar.
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Loading choreography. Phones get a much shorter version.
  useEffect(() => {
    const t = isMobile
      ? { doodle: 400, minimum: 500, nav: 1200 }
      : { doodle: 1000, minimum: 1500, nav: 2000 };

    const timers = [
      setTimeout(() => {
        setDoodleOpacity(0.1);
        setLoadingComplete(true);
      }, t.doodle),
      setTimeout(() => setMinLoadingTimePassed(true), t.minimum),
      setTimeout(() => setShowNav(true), t.nav),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isMobile]);

  useEffect(() => {
    if (loadingComplete && minLoadingTimePassed) {
      setShowHeroSection(true);
    }
  }, [loadingComplete, minLoadingTimePassed]);

  // Type the "Case Studies" heading once it scrolls into view.
  useEffect(() => {
    if (!showHeroSection) return undefined;
    const node = caseStudiesSectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggeredTyping.current) {
        setStartTyping(true);
        hasTriggeredTyping.current = true;
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [showHeroSection]);

  // Jump to a section when arriving with a hash (e.g. back from a case study).
  useEffect(() => {
    if (!showHeroSection) return;
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start' });
  }, [showHeroSection]);

  const publishedStudies = caseStudies.filter((study) => study.published);

  return (
    <>
      {/* Desktop-only gag. On touch there's no hover warning and one tap blocks the page. */}
      <header className="hidden lg:flex p-4 justify-end items-center gap-4 fixed top-0 right-0 z-50">
        <EmergencyStop />
      </header>

      <div ref={heroRef} className="w-full min-h-[500px] flex items-start justify-center relative">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark"
          aria-hidden="true"
          style={{
            opacity: doodleOpacity,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        {showHeroSection && (
          isMobile ? (
            <HeroSectionMobile />
          ) : (
            <Suspense fallback={null}>
              <HeroSection />
            </Suspense>
          )
        )}
      </div>

      {showHeroSection && (
        <>
          {/* Case Studies */}
          <div id="case-studies" className="relative max-w-[1000px] mx-auto px-3 lg:px-4 py-8 scroll-mt-24">
            <div
              ref={caseStudiesSectionRef}
              className="flex items-center mb-8 relative"
              style={{ minHeight: '50px' }}
            >
              <motion.div
                className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <ArrowSvg className="w-12 h-12 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark pl-0 lg:pl-4">
                {startTyping ? (
                  <TypingEffect
                    key="typing-effect"
                    text="Case Studies"
                    maxBlinksAfterTyping={2}
                  />
                ) : (
                  <span className="opacity-0">Case Studies</span>
                )}
              </h2>
            </div>
            <div className="space-y-8">
              {publishedStudies.map((study) => (
                <CaseStudyHero
                  key={study.title}
                  title={study.title}
                  slides={study.slides.filter((slide) => !slide.placeholder)}
                  href={study.href}
                />
              ))}
            </div>
          </div>

          <div className="my-12"></div>

          {/* My Projects */}
          <div className="p-4 flex max-w-[1000px] mx-auto">
            <SectionContainer id="projects" title="My Projects">
              {/* TODO(Erica): real side projects */}
              <Sticky text="Project 1" />
              <Sticky text="Project 2" />
              <Sticky text="Project 3" />
            </SectionContainer>
          </div>

          <div className="my-12"></div>

          {/* Bottom spacer so the last content clears the floating nav */}
          <div className="h-48 lg:h-64"></div>

          <FloatingNav show={showNav} showProfileInNav={!isHeroVisible} />
        </>
      )}
    </>
  );
}

export default Home;
