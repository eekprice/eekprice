import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

// The one way into a case study. Erica, 2026-11-19: the "read the case study"
// links were "all over the place" and should be consistent across the studies.
// So every card that leads to a study uses this: the outline Button, small,
// with the same words and this arrow.
//
// The words are short and in title case (her ask the same day: "those buttons
// need to be shorter" and "consistent caps at start of word"). They used to
// name the study ("Read the menu case study"). `about` keeps that for screen
// readers: it is the study's name, read after the words and not shown.
//
// Inside a card that is already a link, pass `inside` and it draws the same
// button as a span, so there is no link in a link.

export const READ_LABEL = 'Read Case Study';

// It slides right when the button, or the card around it, is hovered.
export const ArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    className={`${className} shrink-0 transition-transform duration-300
      group-hover:translate-x-1 group-hover/exp:translate-x-1 group-hover/read:translate-x-1`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
);

// `label` is for the same button on a card that leads somewhere other than a
// case study (the Education card on Side Projects).
function ReadStudy({ to, about, inside = false, label = READ_LABEL, className = '' }) {
  const link = inside ? { as: 'span' } : { as: Link, to };
  return (
    <Button {...link} variant="outline" size="sm" className={`group/read ${className}`}>
      {label}
      {about && !inside && <span className="sr-only">: {about}</span>}
      <ArrowRight />
    </Button>
  );
}

export default ReadStudy;
