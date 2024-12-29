import React from 'react';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';

const CaseStudyHero = ({ title, slides, onReadFullStudy }) => {
  return (
    <div className="max-w-[1200px] mx-auto  outline outline-surface-outlinePrimary bg-surface-BackPrimary rounded-lg shadow-lg">
      <div className="mt-4">
        <CaseStudyContainer title={title} slides={slides} onReadFullStudy={onReadFullStudy} />
      </div>
    </div>
  );
};

export default CaseStudyHero;
