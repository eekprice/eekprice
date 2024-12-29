import React, { useState, useEffect } from 'react';

function Stickie({ text, className }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-36 w-36">
      <div className={`absolute top-8 left-0 w-full h-full pl-4 pr-4 group hover:cursor-pointer transition-transform duration-500 ${isScrolled ? 'transform translate-y-0' : ''} ${className}`}>
        {/* Frame: Main container with relative positioning and transition effects / Negitive padding added so the stickies stayed in the box....the struggle is real */}
        
        <div className="absolute left-0 w-32 h-32 bg-green-300 transform rotate-[-8deg] shadow-md transition-transform duration-300 group-hover:rotate-[-10deg] rounded-md"></div>
        {/* Layer: Background layer with rotation and shadow */}
        
        <div className="absolute left-2 w-32 h-32 bg-blue-300 transform rotate-[-5deg] shadow-md transition-transform duration-300 group-hover:rotate-[-7deg] rounded-md"></div>
        {/* Layer: Middle layer with rotation and shadow */}
        
        <div className="relative w-32 h-32 bg-yellow-300 p-4 shadow-lgtransition-transform duration-300 group-hover:-translate-y-2 rounded-md">
          {/* Layer: Foreground layer with padding, shadow, and hover effect */}
          
          <span className="text-m font-bold text-text-primary">{text}</span>
          {/* Typography: Styled text */}
        </div>
      </div>
    </div>
  );
}

export default Stickie; 