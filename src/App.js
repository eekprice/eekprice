import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button'; 
import SideProjectsButton from './components/SideProjectsButton';
import { headers } from './styles/typography';
import Nav from './components/Nav';
import { ReactComponent as HeroDoodle } from './assets/doodle.svg';
import { ReactComponent as Melg } from './assets/melg.svg';
import { ReactComponent as Mesm } from './assets/mesm.svg';
import SectionContainer from './components/SectionContainer';
import Sticky from './components/Sticky';
import YouTubePreview from './components/YouTubePreview';
import CaseStudyHero from './components/caseStudyHero';
import { caseStudies } from './data/caseStudiesData';
import PersonalityScene from './components/atoms/PersonalityAtom.js';
import ADHDScene from './components/ADHDScene';
import HeroSection from './components/section/HeroSectionDesktop.js';
import HeroSectionMobile from './components/section/HeroSectionMobile.js';
import AboutMeSection from './components/atoms/AtomAboutMeContent.js';
import './styles/fonts.css';
import DarkModeToggle from './components/DarkModeToggle';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { ReactComponent as ArrowSvg } from './assets/Arrow.svg';
import TypingEffect from './components/TypingEffect';

function App() {
  const [isSmall, setIsSmall] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [textStyle, setTextStyle] = useState({ opacity: 1 }); // Simplified style for "I'm Erica"
  const [imageStyle, setImageStyle] = useState({ opacity: 1 });
  const [subTextStyle, setSubTextStyle] = useState({ opacity: 1 });
  const [showContent, setShowContent] = useState(false);
  const [animationStage, setAnimationStage] = useState(0); // Stage 0: Initial state, text is not shown
  const [aboutMeAnimationStage, setAboutMeAnimationStage] = useState(0);
  const [greyBoxAnimationStage, setGreyBoxAnimationStage] = useState(0);
  const [doodleOpacity, setDoodleOpacity] = useState(1); // New state for HeroDoodle opacity
  const [showHeroSection, setShowHeroSection] = useState(false); // New state to control HeroSection visibility
  const [loadingComplete, setLoadingComplete] = useState(false); // New state to track loading completion
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false); // New state for minimum loading time
  const caseStudiesSectionRef = useRef(null); // Add this ref
  const [startTyping, setStartTyping] = useState(false); // Add this state
  const hasTriggeredTyping = useRef(false); // Add this to track if animation has played

  // Define media queries
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Set styles for "I'm Erica" without animation
          setTextStyle({ opacity: 1 });
          setSubTextStyle({ opacity: 1 });
          setImageStyle({ opacity: 1 });
        } else {
          // Reset styles when not visible
          setTextStyle({ opacity: 0 });
          setSubTextStyle({ opacity: 0 });
          setImageStyle({ opacity: 0 });
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStage(1), 200), // Stage 1: Fly in from top
      setTimeout(() => setAnimationStage(2), 1000), // Stage 2: Move to final position
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAboutMeAnimationStage(1);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreyBoxAnimationStage(1);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setDoodleOpacity(0.1);
      setLoadingComplete(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (loadingComplete && minLoadingTimePassed) {
      setShowHeroSection(true);
    }
  }, [loadingComplete, minLoadingTimePassed]);

  useEffect(() => {
    if (!showHeroSection) return; // Only run when showHeroSection is true

    console.log('Setting up observer');

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Intersection:', entry.isIntersecting);
        console.log('Has triggered:', hasTriggeredTyping.current);

        if (entry.isIntersecting && !hasTriggeredTyping.current) {
          console.log('Starting typing animation');
          setStartTyping(true);
          hasTriggeredTyping.current = true;
          observer.disconnect();
        }
      },
      { 
        threshold: 0,
        rootMargin: '0px'
      }
    );

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (caseStudiesSectionRef.current) {
        console.log('Observer attached to:', caseStudiesSectionRef.current);
        observer.observe(caseStudiesSectionRef.current);
      } else {
        console.log('No ref element found');
      }
    }, 100);

    return () => observer.disconnect();
  }, [showHeroSection]); // Add showHeroSection as dependency

  const handleReadFullStudy = () => {
    alert('Read full study clicked!');
  };

  return (
    <div className="App bg-backdrop-background-light dark:bg-backdrop-background-dark dotted-background">
      <header className="p-4">
        <DarkModeToggle />
      </header>
      <div ref={heroRef} className="w-full min-h-[500px] flex items-start justify-center relative">
        <HeroDoodle
          className="absolute text-surface-foreground100-light dark:text-surface-foreground100-dark mx-auto my-auto"
          style={{
            opacity: doodleOpacity,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        {showHeroSection && (
          <>
            {isDesktop && <HeroSection />}
            {isMobile && <HeroSectionMobile />}
          </>
        )}
      </div>

      {/* Conditionally render the rest of the content */}
      {showHeroSection && (
        <>
          {/* Case Studies Section */}
          <div className="relative max-w-[1000px] mx-auto px-4 py-8">
            <div 
              ref={caseStudiesSectionRef}
              className="flex items-center mb-8 relative"
              style={{ minHeight: '50px' }}
            >
              <motion.div 
                className="absolute -left-16 top-1/2 -translate-y-1/2"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  rotate: 0
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <ArrowSvg className="w-12 h-12 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current" />
              </motion.div>
              <h2 className="text-3xl font-merriweather font-light text-surface-foreground100-light dark:text-surface-foreground100-dark pl-4">
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
              {caseStudies.map((study, index) => (
                <CaseStudyHero
                  key={index}
                  title={study.title}
                  slides={study.slides}
                  onReadFullStudy={handleReadFullStudy}
                  delay={index * 1000}
                />
              ))}
            </div>
          </div>

          {/* Add margin between sections */}
          <div className="my-12"></div>

          {/* My Projects section */}
          <div className="p-4 flex flex-row max-w-[1000px] mx-auto">
            <div className="border-2 border-blue-500 p-4" style={{ width: '60%' }}></div>
            <SectionContainer title="My Projects">
              <Sticky text="Project 1" />
              <Sticky text="Project 2" />
              <Sticky text="Project 3" />
            </SectionContainer>
          </div>

          {/* Add margin between sections */}
          <div className="my-12"></div>

          {/* New bottom spacer */}
          <div className="h-64"></div>

          {/* Floating Nav with slide-in animation */}
          <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ${
              showNav ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            } m-2`}
          >
            <Nav />
          </div>
        </>
      )}
    </div>
  );
}

export default App;