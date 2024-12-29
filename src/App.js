import React, { useState, useEffect } from 'react';
import Button from './components/Button'; 
import SideProjectsButton from './components/SideProjectsButton';
import { headers } from './styles/typography';
import Nav from './components/Nav';
import './App.css';
import { ReactComponent as HeroPattern } from './assets/hero-pattern.svg';
import { ReactComponent as Melg } from './assets/melg.svg';
import { ReactComponent as Mesm } from './assets/mesm.svg';
import SectionContainer from './components/SectionContainer';
import Sticky from './components/Sticky';
import YouTubePreview from './components/YouTubePreview';
import CaseStudyHero from './components/caseStudyHero';
import { caseStudies } from './data/caseStudiesData';

function App() {
  const [isSmall, setIsSmall] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500; // Adjust based on your hero section height
      if (window.scrollY > heroHeight) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReadFullStudy = () => {
    alert('Read full study clicked!');
  };

  return (
    <div className="App dotted-background">
      <div className="w-full h-[500px] flex items-center justify-center relative">
        <HeroPattern className="absolute inset-0 w-full h-full text-white opacity-10" />

        {/* hero container */}
        <div className="flex flex-row items-center space-x-8 z-10">
          {isSmall ? (
            <div className="border-2 border-[#003347] rounded-full">
              <Mesm 
                className="w-24 h-24 transition-all duration-500 ease-in-out cursor-pointer"
                onClick={() => setIsSmall(false)}
              />
            </div>
          ) : (
            <div className="">
              <Melg 
                className="transition-all duration-500 ease-in-out cursor-pointer -mt-10 -mb-10 -ml-16"
                onClick={() => setIsSmall(true)}
              />
            </div>
          )}

          {/* Outer vertical container */}
          <div className="flex flex-col space-y-4">
            {/* Text content container */}
            <div className="flex flex-col space-y-2 rounded-lg p-4">
              <h1 className="text-3xl font-merriweather font-light z-10 text-text-primary">I'm Erica</h1>
              <h2 className="text-5xl font-merriweather font-normal text-text-primary">
                A Principal Product Designer
              </h2>
            </div>
            {/* Navigation */}
            <Nav />
          </div>
        </div>
      </div>

      {/* Learn about me section */}
      <SectionContainer title="Learn about me">
        <YouTubePreview 
          videoUrl="https://youtu.be/X6M0LBz8Xv8" 
          thumbnailUrl="https://img.youtube.com/vi/X6M0LBz8Xv8/0.jpg" 
        />
        <YouTubePreview 
          videoUrl="https://youtu.be/X6M0LBz8Xv8" 
          thumbnailUrl="https://img.youtube.com/vi/j9BY-Ufpu64/0.jpg" 
        />
        <YouTubePreview 
          videoUrl="https://youtu.be/D3L5KOIaGDk" 
          thumbnailUrl="https://img.youtube.com/vi/D3L5KOIaGDk/0.jpg" 
        />
      </SectionContainer>

      {/* Case Studies Section */}
      <div className="p-4">
        <h2 className="text-4xl font-merriweather font-normal text-text-primary">Case Studies</h2>
        {caseStudies.map((study, index) => (
          <CaseStudyHero
            key={index}
            title={study.title}
            slides={study.slides}
            onReadFullStudy={handleReadFullStudy}
          />
        ))}
      </div>

      {/* Add margin between sections */}
      <div className="my-12"></div>

      {/* My Projects section */}
      
      <div className="border-2 border-red-500 p-4 flex flex-row max-w-[1000px] mx-auto">
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
    </div>
  );
}

export default App;