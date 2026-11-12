import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import CaseStudyHero from '../components/caseStudyHero';
import FloatingNav from '../components/FloatingNav';
import SectionHeading from '../components/SectionHeading';
import KindConnections from '../components/KindConnections';
import StillHere from '../components/StillHere';
import { caseStudies } from '../data/caseStudiesData';
import { deliveryCards, sectionTitles } from '../data/home';
import HeroSectionMobile from '../components/section/HeroSectionMobile.js';
import EmergencyStop from '../components/EmergencyStop';
import { useIsMobile } from '../hooks/useMediaQuery';

// The desktop hero is its own chunk so phones never download it.
const HeroSection = lazy(() => import('../components/section/HeroSectionDesktop.js'));

// Layout follows the Figma frame "iPad mini 8.3 - 1": hero, two work sections
// with line-flanked headings and stickers, kind connections, sign-off.

function Home() {
  const isMobile = useIsMobile();
  const heroRef = useRef(null);

  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [doodleOpacity, setDoodleOpacity] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState(false);

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
        // The doodle is the loading moment. Once the hero arrives it fades out
        // completely so it doesn't sit behind the text.
        setDoodleOpacity(0);
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

            <p className="mt-5 text-center">
              <Link
                to="/work"
                className="text-sm font-merriweather underline underline-offset-2
                  text-surface-foreground100-light dark:text-surface-foreground100-dark"
              >
                Past Work
              </Link>
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

          <FloatingNav show={showNav} showProfileInNav={!isHeroVisible} />
        </>
      )}
    </>
  );
}

export default Home;
