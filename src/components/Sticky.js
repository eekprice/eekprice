import React from 'react';

function Stickie({ text, className = '' }) {
  return (
    <div className="relative h-40 w-36">
      <div className={`absolute top-4 left-0 w-full h-full pl-4 pr-4 group hover:cursor-pointer ${className}`}>
        {/* Back layer */}
        <div className="absolute left-0 w-32 h-32 bg-green-300 transform rotate-[-8deg] shadow-md transition-transform duration-300 group-hover:rotate-[-10deg] rounded-md"></div>

        {/* Middle layer */}
        <div className="absolute left-2 w-32 h-32 bg-blue-300 transform rotate-[-5deg] shadow-md transition-transform duration-300 group-hover:rotate-[-7deg] rounded-md"></div>

        {/* Front layer with the text */}
        <div className="relative w-32 h-32 bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark p-4 shadow-lg transition-transform duration-300 group-hover:-translate-y-2 rounded-md">
          <span className="text-base font-bold font-inter text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark">{text}</span>
        </div>
      </div>
    </div>
  );
}

export default Stickie;
