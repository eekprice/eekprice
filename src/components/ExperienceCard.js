import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Reveal, chipClass } from './caseStudy/Blocks';
import { Peek } from './caseStudyHero';

// A card for the Leadership Experience section on Home. It reads like a line
// of work history: where and when, the role as the title, a sentence, a few
// points, and a link to the write-up. Content is `leadershipCards` in
// data/home.js. A card with `soon: true` is a pencil outline with a
// handwritten "coming soon", for a role that has no write-up yet.

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4 transition-transform group-hover/exp:translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
);

const eyebrowClass =
  'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';
const titleClass =
  'mt-1 font-merriweather font-light text-2xl lg:text-3xl leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark';

// `mostInView` is true while this card has more of itself on screen than any
// other card on Home. A card with a `peek` slides its sticky out then, and on
// hover, the same way the drive thru card does.
function ExperienceCard({ card, mostInView = false }) {
  if (card.soon) {
    return (
      <Reveal>
        <div className="rounded-lg border-2 border-dashed border-surface-outline-light dark:border-surface-outline-dark p-5 lg:p-6">
          {card.where && <p className={eyebrowClass}>{card.where}</p>}
          <h3 className={titleClass}>{card.role}</h3>
          <p className="mt-3 font-hand text-lg text-surface-foreground400-light dark:text-surface-foreground400-dark">coming soon</p>
        </div>
      </Reveal>
    );
  }

  // A supporting role: the same card with less in it, and a smaller title.
  if (card.size === 'small') {
    return (
      <Reveal className="h-full">
        <article
          className="h-full rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
            bg-surface-background100-light dark:bg-surface-background100-dark p-4"
        >
          <p className={eyebrowClass}>{card.where}</p>
          <h3 className="mt-1 font-merriweather font-light text-lg leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {card.role}
          </h3>
          {card.reports && (
            <p className="m-0 mt-1 font-inter text-xs font-medium text-surface-foreground300-light dark:text-surface-foreground300-dark">
              {card.reports}
            </p>
          )}
          <p className="m-0 mt-2 font-inter text-sm leading-normal text-surface-foreground200-light dark:text-surface-foreground200-dark">
            {card.text}
          </p>
          {card.href && (
            <p className="m-0 mt-3">
              <Button as={Link} to={card.href} variant="outline" size="sm">
                {card.linkLabel || 'Read the case study'}
                <Arrow />
              </Button>
            </p>
          )}
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="relative group/card" data-in-view-key={card.role}>
      {card.peek && <Peek peek={card.peek} href={card.href} out={mostInView} />}
      <article
        className="relative z-[1] group/exp rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark p-5 lg:p-6"
      >
        <p className={eyebrowClass}>{card.where}</p>
        <h3 className={titleClass}>{card.role}</h3>
        {card.reports && (
          <p className="m-0 mt-2 inline-flex items-center gap-1.5 font-inter text-sm font-medium text-surface-foreground100-light dark:text-surface-foreground100-dark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4 text-primary-outline-light dark:text-primary-outline-dark">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m18 0v-2a4 4 0 00-3-3.87M14 3.13a4 4 0 010 7.75M14 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {card.reports}
          </p>
        )}
        <p className="mt-3 font-inter text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark">
          {card.text}
        </p>

        {card.points && (
          <ul className="mt-4 grid gap-3 sm:grid-cols-3 list-none p-0 m-0">
            {card.points.map((point) => (
              <li
                key={point.title}
                className="rounded-md p-3 bg-surface-background200-light dark:bg-surface-background200-dark
                  border border-surface-outline-light dark:border-surface-outline-dark"
              >
                <p className="m-0 font-inter font-semibold text-sm text-surface-foreground100-light dark:text-surface-foreground100-dark">
                  {point.title}
                </p>
                <p className="m-0 mt-1 font-inter text-sm leading-normal text-surface-foreground300-light dark:text-surface-foreground300-dark">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {card.tags && (
            <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tags">
              {card.tags.map((t) => (
                <li key={t} className={chipClass}>{t}</li>
              ))}
            </ul>
          )}
          {card.href && (
            <Button as={Link} to={card.href} variant="outline" size="sm">
              {card.linkLabel || 'Read the case study'}
              <Arrow />
            </Button>
          )}
        </div>
      </article>
      </div>
    </Reveal>
  );
}

export default ExperienceCard;
