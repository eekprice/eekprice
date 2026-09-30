import React from 'react';
import { Link } from 'react-router-dom';
import CaseStudyPreview from './CaseStudySlides';

const ChevronIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// A work card: title top-left, optional slide strip, optional link.
// With no slides and no link it shows a quiet "coming soon" line so an
// unwritten card doesn't look broken.
const CaseStudyContainer = ({ title, slides = [], href, slideHeight }) => {
  const hasSlides = slides.length > 0;

  return (
    <div className="p-3 lg:p-4">
      <div className="flex flex-col gap-1 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="font-merriweather text-lg lg:text-xl font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {title}
          </h3>
          {hasSlides && (
            <p className="text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
              {slides.length} slides
            </p>
          )}
        </div>
        {href && (
          <Link
            to={href}
            className="mt-1 lg:mt-0 inline-flex items-center gap-1 shrink-0
              text-sm font-inter font-medium underline underline-offset-2
              text-surface-foreground200-light dark:text-surface-foreground200-dark
              hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
          >
            Read full study
            <ChevronIcon className="w-4 h-4" />
          </Link>
        )}
      </div>

      {hasSlides ? (
        <div className="mt-3">
          <CaseStudyPreview slides={slides} heightClass={slideHeight} />
        </div>
      ) : (
        <div className="min-h-[88px] lg:min-h-[120px] flex items-end">
          {!href && (
            <p className="text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
              Coming soon.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseStudyContainer;
