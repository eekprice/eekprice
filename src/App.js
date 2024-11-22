import React, { useState } from 'react';
import Button from './components/Button'; 
import SideProjectsButton from './components/SideProjectsButton';
import { headers } from './styles/typography';
import Nav from './components/Nav';
import './App.css';
import { ReactComponent as HeroPattern } from './assets/hero-pattern.svg';
import { ReactComponent as Melg } from './assets/melg.svg';
import { ReactComponent as Mesm } from './assets/mesm.svg';

function App() {
  const [isSmall, setIsSmall] = useState(false);

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App dotted-background">
      <div className="flex items-center justify-center h-screen space-x-4">
        <Button onClick={handleClick}>Click Me</Button>
        <div className="font-inter text-base text-text-primary">Hello World</div>
        <SideProjectsButton />
      </div>
      
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
            <div className="border-2 border-[#003347] ">
              <Melg 
                className="transition-all duration-500 ease-in-out cursor-pointer -mt-10 -mb-10 -ml-16"
                onClick={() => setIsSmall(true)}
              />
            </div>
          )}

          {/* Outer vertical container */}
          <div className="flex flex-col space-y-4">
            {/* Text content container */}
            <div className="flex flex-col space-y-2 outline outline-2 outline-text-primary rounded-lg p-4">
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
    </div>
  );
}

export default App;