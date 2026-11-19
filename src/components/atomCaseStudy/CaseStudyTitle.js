import React from 'react';
import CaseStudyPreview from './CaseStudySlides';
import { WireBlock } from '../sketch/Sketch';
import { ReadFullCard } from '../caseStudy/Overview';
import { getCaseStudy } from '../../data/caseStudies';
import ReadStudy from '../ReadStudy';

// A work card: title top-left, optional slide strip, optional link.
// With no slides it shows a wireframe of the strip (design system: wire
// first), and with no link either, a handwritten "coming soon".
// `sketchAt` is when those pencil blocks start drawing, in ms after the card
// is first seen. The card (caseStudyHero.js) sets it so they follow its own
// wireframe entrance.
const CaseStudyContainer = ({ title, slides = [], href, slideHeight, sketchAt = 0 }) => {
  const hasSlides = slides.length > 0;
  // The picture on that last slide: the study's note picture if it has one,
  // or its hero image.
  const study = href ? getCaseStudy(href.split('/').pop()) : null;
  const picture = study?.note?.image || study?.hero?.src;
  // Every strip ends on a slide that links to the full case study. It isn't
  // counted in "N slides".
  const strip =
    hasSlides && href
      ? [...slides, { content: <ReadFullCard to={href} title={title} image={picture} />, width: 'w-[264px]' }]
      : slides;

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
          <ReadStudy to={href} about={title} className="mt-2 lg:mt-0 self-start shrink-0" />
        )}
      </div>

      {hasSlides ? (
        <div className="mt-3">
          <CaseStudyPreview slides={strip} heightClass={slideHeight} />
        </div>
      ) : (
        // No slides yet, so the card shows its wireframe: three pencil blocks
        // where the slides will go. They sketch themselves once the card has
        // arrived. Decorative, so hidden from screen readers.
        <div className="mt-3">
          <div className="flex gap-4 overflow-hidden p-2">
            <WireBlock className="w-[264px] h-40 shrink-0" lines={[38, 82, 64, 72]} image={false} at={sketchAt} />
            <WireBlock className="w-[264px] h-40 shrink-0" lines={[46, 70]} at={sketchAt + 300} />
            <WireBlock className="w-[544px] h-40 shrink-0" lines={[24, 52, 40]} image={false} at={sketchAt + 600} />
          </div>
          {!href && (
            <p className="sk-annotation mt-1 px-2" style={{ '--sk-delay': `${sketchAt + 1500}ms` }}>
              coming soon
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseStudyContainer;
