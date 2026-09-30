import React from 'react';
import { EmojiSticker } from './SectionHeading';
import CaseStudyContainer from './atomCaseStudy/CaseStudyTitle';

// Plain white card with a hairline border, per the Figma sections.
const CaseStudyHero = ({ title, slides, href, stickers = [] }) => {
  return (
    <div className="relative border border-surface-outline-light dark:border-surface-outline-dark
      bg-surface-background100-light dark:bg-surface-background100-dark
      rounded-md shadow-sm text-surface-foreground100-light dark:text-surface-foreground100-dark"
    >
      <CaseStudyContainer title={title} slides={slides} href={href} />
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
  );
};

export default CaseStudyHero;
