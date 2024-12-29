import React from 'react';
import CaseStudyPreview from './CaseStudySlides';

const CaseStudyContainer = ({ title, slides, onReadFullStudy }) => {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-normal text-text-primary">{title}</h3>
          <p className="text-sm text-gray-500">{slides.length} slides</p>
        </div>
        <button
          onClick={onReadFullStudy}
          className="text-blue-500 hover:underline"
        >
          Read full study
        </button>
      </div>
      <CaseStudyPreview slides={slides} onReadFullStudy={onReadFullStudy} />
    </div>
  );
};

export default CaseStudyContainer; 