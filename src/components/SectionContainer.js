import React from 'react';

function SectionContainer({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md border outline-surface-outlinePrimary  w-96 mx-auto relative">
      {/* Frame: Main container with background, padding, margin, rounded corners, and shadow */}
      
      <div className="bg-surface-BackSecondary outline outline-1 outline-surface-outlinePrimary p-2 rounded-lg inline-block absolute -top-6 left-2">
        {/* Nested Frame: Text container for the section header with its own styles */}
        
        <h2 className="text-m font-bold text-text-primary mb-0">{title}</h2>
        {/* Typography: Styled text for the section title */}
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Auto Layout: Flexbox layout for children elements with 16px gap */}
        {children}
      </div>
    </div>
  );
}

export default SectionContainer;