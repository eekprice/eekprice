import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import CaseStudyHero from '../components/caseStudyHero';
import FloatingNav from '../components/FloatingNav';
import SectionHeading from '../components/SectionHeading';
import KindConnections from '../components/KindConnections';
import StillHere from '../components/StillHere';
import Button from '../components/Button';
import { caseStudies } from '../data/caseStudiesData';
import { deliveryCards, sectionTitles } from '../data/home';
import HeroSectionMobile from '../components/section/HeroSectionMobile.js';
import EmergencyStop from '../components/EmergencyStop';
import { useIsMobile } from '../hooks/useMediaQuery';

// The desktop hero is its own chunk so phones never download it.
const HeroSection = lazy(() => import('../components/section/HeroSectionDesktop.js'));

// Layout follows the Figma frame "iPad mini 8.3 - 1": hero, two work sections
// with line-flanked headings and stickers, kind connections, sign-off.
//
// Opening order: the doodle, then the hero plays on an empty canvas, then the
// rest of the page and the nav arrive together. On a large screen the case
// studies sit right under the hero, so showing them early left them floating
// under a half-built hero.

const AFTER_HERO_MS = 700; // a beat after the about text, so the star and heart land first
const HERO_MAX_MS = 7000; // never hold the page longer than this, whatever the hero does

function Home() {
  const isMobile = useIsMobile();
  const heroRef = useRef(null);

  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [doodleOpacity, setDoodleOpacity] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [heroDone, setHeroDone] = useState(false);
  const reduce = useReducedMotion();
  // Arriving with a hash (a link straight to a section) still shows the hero
  // first. It just skips the hero's choreography, so the sections follow
  // within a second and the page jumps to the section.
  const arrivedWithHash = useRef(!!window.location.hash).current;
  const showSections = showHeroSection && heroDone;
  const onHeroReady = useCallback(() => setHeroRevealed(true), []);

  // Track whether the hero is on screen. Once it scrolls away the nav shows
  // its Home item, which scrolls back to the top.
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

  // Loading choreography, in ms after the page mounts. `doodle` is how long
  // the illustration stays at full strength before it fades back (the fade
  // takes 500ms). `minimum` is when the hero may appear. `nav` is the earliest
  // the nav may show; it also waits for the sections.
  useEffect(() => {
    const t = isMobile
      ? { doodle: 400, minimum: 500, nav: 1200 }
      : { doodle: 400, minimum: 800, nav: 1200 };

    const timers = [
      setTimeout(() => {
        // The doodle is the loading moment. Once the hero arrives it fades back
        // to a faint illustration behind the hero and stays there.
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

  // The hero says when its about text is in. A beat later the page follows.
  useEffect(() => {
    if (!heroRevealed) return undefined;
    const timer = setTimeout(() => setHeroDone(true), AFTER_HERO_MS);
    return () => clearTimeout(timer);
  }, [heroRevealed]);

  // While the hero is still playing: a visitor who tries to scroll gets the
  // page right away, and there is a ceiling on the wait.
  useEffect(() => {
    if (!showHeroSection || heroDone) return undefined;
    const skip = () => setHeroDone(true);
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(e.key)) skip();
    };
    // The ceiling only counts while the page is being looked at. A tab opened
    // in the background would otherwise run it out before the hero ever plays.
    let timer;
    const arm = () => {
      clearTimeout(timer);
      if (document.visibilityState === 'visible') timer = setTimeout(skip, HERO_MAX_MS);
    };
    arm();
    document.addEventListener('visibilitychange', arm);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', arm);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', onKey);
    };
  }, [showHeroSection, heroDone]);

  // Jump to a section when arriving with a hash (e.g. back from a case study).
  useEffect(() => {
    if (!showSections) return;
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start' });
  }, [showSections]);

  const publishedStudies = caseStudies.filter((study) => study.published);

  return (
    // The home page sits on the dot grid canvas from the design system.
    <div className="sk-canvas min-h-screen">
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
            <HeroSectionMobile onReady={onHeroReady} instant={arrivedWithHash} />
          ) : (
            <Suspense fallback={null}>
              <HeroSection onReady={onHeroReady} instant={arrivedWithHash} />
            </Suspense>
          )
        )}
      </div>

      {showSections && (
        // Everything under the hero rises in together, once the hero is done.
        <motion.div
          initial={reduce || arrivedWithHash ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Product design case studies */}
          <section id="case-studies" className="relative max-w-[800px] mx-auto px-4 pt-10 pb-6 scroll-mt-24">
            <SectionHeading>{sectionTitles.caseStudies}</SectionHeading>

            <div className="relative space-y-6">
              {publishedStudies.map((study) => (
                <CaseStudyHero
                  key={study.title}
                  title={study.title}
                  stickers={study.stickers}
                  slides={study.slides.filter((slide) => !slide.placeholder)}
                  slideHeight={study.slideHeight}
                  href={study.href}
                />
              ))}
            </div>

            <p className="mt-6 text-center">
              <Button as={Link} to="/work" variant="outline">
                Past Work
              </Button>
            </p>
          </section>

          {/* Program and delivery */}
          <section id="delivery" className="relative max-w-[800px] mx-auto px-4 pt-10 pb-6 scroll-mt-24">
            <SectionHeading>{sectionTitles.delivery}</SectionHeading>
            <div className="relative space-y-6">
              <span
                aria-hidden="true"
                className="absolute -right-8 top-[38%] hidden lg:block z-10 select-none font-inter font-extrabold text-2xl text-purple-500 drop-shadow-md"
                style={{ transform: 'rotate(-6deg)' }}
              >
                +1
              </span>
              {deliveryCards.map((card) => (
                <CaseStudyHero key={card.title} title={card.title} slides={[]} href={card.href} />
              ))}
            </div>
          </section>

          <div className="h-8 lg:h-12" />

          <KindConnections />

          <StillHere />

          {/* Bottom spacer so the last content clears the floating nav */}
          <div className="h-48 lg:h-56"></div>
        </motion.div>
      )}

      {/* The nav is fixed, so it stays outside the block that rises. It arrives
          with the rest of the page, so its Work links always have somewhere to go. */}
      {showHeroSection && <FloatingNav show={showNav && showSections} showHome={!isHeroVisible} />}
    </div>
  );
}

export default Home;
