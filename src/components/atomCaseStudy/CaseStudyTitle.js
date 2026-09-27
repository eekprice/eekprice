import React from 'react';
import CaseStudyPreview from './CaseStudySlides';

const ChevronIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Title on top, slide count under it. "Read full study" only renders when
// there's somewhere to go, so there's never a dead button.
const CaseStudyContainer = ({ title, slides, href }) => {
  return (
    <div className="max-w-[1200px] mx-auto p-3 lg:p-4">
      <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between mb-3 lg:mb-4">
        <div>
          <h3 className="font-merriweather text-xl lg:text-2xl font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {title}
          </h3>
          <p className="text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
            {slides.length} slides
          </p>
        </div>
        {href && (
          <a
            href={href}
            className="mt-2 lg:mt-0 inline-flex w-full lg:w-auto items-center justify-between lg:justify-start gap-1
              text-sm font-inter font-medium underline-offset-2 hover:underline
              text-primary-foreground-light dark:text-primary-foreground-dark"
          >
            Read full study
            <ChevronIcon className="w-4 h-4" />
          </a>
        )}
      </div>
      <CaseStudyPreview slides={slides} />
    </div>
  );
};

export default CaseStudyContainer;
