import React from 'react';
import { EmojiSticker } from './SectionHeading';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';
import { Frame, Stage, Swap, WireImage } from './sketch/Sketch';

// A case study card on the home page: a plain white card with a hairline
// border, per the Figma sections.
//
// Wire first: the first time the card is seen it is drawn as a wireframe. A
// pencil frame the size of the card, a squiggle where the title goes and, if
// the card has slides, boxes where they go. Then the real card takes its
// place. A card with no slides yet keeps pencil blocks inside it; those start
// drawing once the card has landed.

const SKETCH_AT = 150; // ms after the card is first seen
const HOLD = { slides: 1400, empty: 900 }; // how long the wireframe shows

// A box with no cross, for the slides after the first.
const WireBox = ({ at, className }) => (
  <span className={`sk-framed block ${className}`} style={{ '--sk-at': `${at}ms` }}>
    <Frame tone="pencil" />
  </span>
);

const CaseStudyHero = ({ title, slides, href, stickers = [], slideHeight }) => {
  const hasSlides = slides.length > 0;
  const hold = hasSlides ? HOLD.slides : HOLD.empty;

  const wire = (
    <div className="sk-wire sk-framed h-full">
      <Frame tone="pencil" />
      <span className="sk-squiggle" style={{ width: '32%', '--sk-delay': '200ms' }} />
      {/* A shorter line where "Read full study" goes. */}
      {href && <span className="sk-squiggle" style={{ width: '16%', '--sk-delay': '320ms' }} />}
      {hasSlides && (
        <div className="flex flex-1 min-h-0 gap-4 overflow-hidden px-1.5 pt-3 pb-1.5">
          <WireImage className="h-full w-[264px] shrink-0" at={SKETCH_AT + 100} />
          <WireBox className="h-full w-[264px] shrink-0" at={SKETCH_AT + 200} />
          <WireBox className="h-full w-[264px] shrink-0" at={SKETCH_AT + 300} />
        </div>
      )}
    </div>
  );

  return (
    <Stage>
      <Swap at={SKETCH_AT} hold={hold} wire={wire}>
        <div className="relative border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark
          rounded-md shadow-sm text-surface-foreground100-light dark:text-surface-foreground100-dark"
        >
          <CaseStudyContainer
            title={title}
            slides={slides}
            href={href}
            slideHeight={slideHeight}
            sketchAt={SKETCH_AT + hold}
          />
          {stickers.map((sticker) => (
            <EmojiSticker
              key={sticker.emoji}
              className={`z-10 pointer-events-none ${sticker.className}`}
              rotate={sticker.rotate}
            >
              {sticker.emoji}
            </EmojiSticker>
          ))}
        </div>
      </Swap>
    </Stage>
  );
};

export default CaseStudyHero;
