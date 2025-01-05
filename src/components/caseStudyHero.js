import React from 'react';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';

const CaseStudyHero = ({ title, slides, onReadFullStudy }) => {
  return (
    <div className="max-w-[1200px] mx-auto 
      border border-surface-outline-light dark:border-surface-outline-dark
      bg-surface-background100-light dark:bg-surface-background100-dark
      rounded-lg shadow-lg"
    >
      <div className="mt-4 text-surface-foreground100-light dark:text-surface-foreground100-dark">
        <CaseStudyContainer title={title} slides={slides} onReadFullStudy={onReadFullStudy} />
      </div>
    </div>
  );
};

export default CaseStudyHero;
