import React from 'react';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';

// Plain white card with a hairline border, per the Figma sections.
const CaseStudyHero = ({ title, slides, href }) => {
  return (
    <div className="border border-surface-outline-light dark:border-surface-outline-dark
      bg-surface-background100-light dark:bg-surface-background100-dark
      rounded-md shadow-sm text-surface-foreground100-light dark:text-surface-foreground100-dark"
    >
      <CaseStudyContainer title={title} slides={slides} href={href} />
    </div>
  );
};

export default CaseStudyHero;
