import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReadStudy from './ReadStudy';
import { Reveal, chipClass } from './caseStudy/Blocks';
import { Peek, LogoSticker } from './caseStudyHero';
import { Frame, Stage, Swap } from './sketch/Sketch';

// A card for the Leadership Experience section on Home. It reads like a line
// of work history: where and when, the role as the title, a sentence, a few
// points, and a link to the write-up. Content is `leadershipCards` in
// data/home.js. A card with `soon: true` is a pencil outline with a
// handwritten "coming soon", for a role that has no write-up yet.

// Wire first, like the case study cards (Erica, 2026-11-19: the leadership
// section should get the wireframe effect on load too). Each card is drawn as
// a pencil wireframe of itself the first time it is seen, then the real card
// takes its place.
const SKETCH_AT = 150; // ms after the card is first seen
const HOLD = 1100; // how long the wireframe shows
// Cards in the same section do not load together (Erica, 2026-11-20: "should
// animate a little bit off in timing making it more organic"). Each card
// after the first starts its sketch this much later, and holds its wireframe
// a touch longer, so the real cards arrive one after the other.
export const CARD_LAG = 280; // ms between one card's start and the next
const HOLD_LAG = 90; // extra wireframe time per card

const Squiggle = ({ width, delay }) => (
  <span className="sk-squiggle" style={{ width, '--sk-delay': `${delay}ms` }} />
);
const WireBox = ({ at, className }) => (
  <span className={`sk-framed block ${className}`} style={{ '--sk-at': `${at}ms` }}>
    <Frame tone="pencil" />
  </span>
);

// The featured card: where and when, the role, two lines of text, the three
// points, then tags and the button.
const featuredWire = (start) => (
  <div className="sk-wire sk-framed h-full">
    <Frame tone="pencil" />
    <Squiggle width="30%" delay={200} />
    <Squiggle width="62%" delay={300} />
    <Squiggle width="88%" delay={420} />
    <Squiggle width="54%" delay={520} />
    <div className="flex flex-1 min-h-[72px] gap-3 pt-2">
      <WireBox className="flex-1" at={start + 100} />
      <WireBox className="hidden sm:block flex-1" at={start + 200} />
      <WireBox className="hidden sm:block flex-1" at={start + 300} />
    </div>
    <span className="sk-squiggle self-end" style={{ width: '22%', '--sk-delay': '700ms' }} />
  </div>
);

// A supporting card: the role's lines, and one box for each case study beside
// them (under them on a phone).
const smallWire = (count, stacked, start) => (
  <div className={`sk-wire sk-framed h-full ${count && !stacked ? 'sm:!grid sm:grid-cols-2 sm:gap-4' : ''}`}>
    <Frame tone="pencil" />
    <div className="flex flex-col gap-3">
      <Squiggle width="40%" delay={200} />
      <Squiggle width="70%" delay={300} />
      {!stacked && <Squiggle width="92%" delay={420} />}
      <Squiggle width={stacked ? '30%' : '60%'} delay={520} />
    </div>
    {count > 0 && (
      <div className="flex flex-col gap-3 min-h-[120px]">
        {Array.from({ length: count }, (_, i) => (
          <WireBox key={i} className="flex-1" at={start + 100 + i * 120} />
        ))}
      </div>
    )}
  </div>
);

const eyebrowClass =
  'text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark';
const titleClass =
  'mt-1 font-merriweather font-light text-2xl lg:text-3xl leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark';

// The case studies that belong to a role, as link rows inside its card.
// Erica, 2026-11-19: the role and its studies are one container. The rows
// fill the card's height with no gap between them, they are white like the
// card, and a line under each row but the last divides them.
// `stacked` puts the rows under the role, for a card that is half the width.
function StudyLinks({ studies, stacked = false }) {
  return (
    <ul
      className={`flex flex-col list-none p-0 m-0 border-t
        ${stacked ? 'flex-1' : 'h-full sm:border-t-0 sm:border-l'}
        border-surface-outline-light dark:border-surface-outline-dark`}
    >
      {studies.map(({ study, label }, i) => (
        <li
          key={study.slug}
          className={`flex-1 flex ${i < studies.length - 1 ? 'border-b border-surface-outline-light dark:border-surface-outline-dark' : ''}`}
        >
          <Link
            to={`/case-study/${study.slug}`}
            className="group/exp flex-1 flex items-center p-4
              transition-colors hover:bg-surface-background200-light dark:hover:bg-surface-background200-dark
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset
              focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark"
          >
            <span className="min-w-0 flex-1">
              <span className={`block ${eyebrowClass}`}>{label} · Case study</span>
              <span className="block mt-1 font-merriweather font-light text-base leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
                {study.title}
              </span>
              {/* Right aligned, like the button on the Yum card (Erica, 2026-11-19). */}
              <span className="flex justify-end mt-3">
                <ReadStudy inside />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// `mostInView` is true while this card has more of itself on screen than any
// other card on Home. A card with a `peek` slides its sticky out then, and on
// hover, the same way the drive thru card does.
// `studies` is a list of { study, label } for a small card: they are drawn
// inside the card, in a second column.
// `compact` draws any card as a small one that is half the section's width,
// with its studies under the role. Home uses it so the roles sit side by side
// (Erica, 2026-11-19); /leadership keeps the big featured card.
// `peekSide` is the edge a small card's sticky comes out of.
// `order` is the card's place in its section (0 is first). Later cards start
// sketching later.
function ExperienceCard({ card, mostInView = false, studies = [], compact = false, peekSide = 'left', order = 0 }) {
  const navigate = useNavigate();
  const start = SKETCH_AT + order * CARD_LAG;
  const hold = HOLD + order * HOLD_LAG;
  // The whole card goes to the role's case study, not just the button (Erica,
  // 2026-11-19). Links and buttons inside keep their own job. A mouse
  // convenience: the Read Case Study link is the real link for the keyboard.
  const openStudy = (e) => {
    if (!card.href || e.defaultPrevented || e.target.closest('a, button')) return;
    if (window.getSelection?.()?.toString()) return;
    navigate(card.href);
  };
  const clickable = card.href
    ? 'cursor-pointer transition-colors hover:border-primary-outline-light dark:hover:border-primary-outline-dark'
    : '';
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
  if (card.size === 'small' || compact) {
    const hasStudies = studies.length > 0;
    const wide = hasStudies && !compact;
    return (
      <Stage className={`h-full ${wide ? 'sm:col-span-2' : ''}`}>
        <Swap at={start} hold={hold} wire={smallWire(studies.length, compact, start)}>
        {/* Small cards have a sticky too, on wide screens (Erica, 2026-11-20):
            yellow for Yum, pink for CGI. It comes out on the side the card is on. */}
        <div className="relative h-full" data-in-view-key={card.role}>
        {card.peek && <Peek peek={card.peek} href={card.href} out={mostInView} side={peekSide} flat />}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <article
          onClick={openStudy}
          className={`relative z-[1] h-full rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
            bg-surface-background100-light dark:bg-surface-background100-dark ${clickable}
            ${wide ? 'grid sm:grid-cols-2 overflow-hidden' : ''}
            ${compact ? 'flex flex-col overflow-hidden' : ''}
            ${!hasStudies && !compact ? 'p-4' : ''}`}
        >
          <div className={`${hasStudies || compact ? 'p-4' : ''} ${compact && !hasStudies ? 'flex-1 flex flex-col' : ''}`}>
            <p className={eyebrowClass}>{card.where}</p>
            <h3 className="mt-1 font-merriweather font-light text-lg leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
              {card.role}
            </h3>
            {compact ? (
              // Home: no sentence. Direct reports and the button share the
              // last line (Erica, 2026-11-19: these cards looked too busy).
              <p className="m-0 mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="font-inter text-sm text-surface-foreground300-light dark:text-surface-foreground300-dark">
                  {card.reports}
                </span>
                {card.href && <ReadStudy to={card.href} about={card.role} />}
              </p>
            ) : (
              <>
            {card.reports && (
              <p className="m-0 mt-1 font-inter text-xs font-medium text-surface-foreground300-light dark:text-surface-foreground300-dark">
                {card.reports}
              </p>
            )}
            <p className="m-0 mt-2 font-inter text-sm leading-normal text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {card.text}
            </p>
            {card.href && (
              <p className="m-0 mt-3 flex justify-end">
                <ReadStudy to={card.href} about={card.role} />
              </p>
            )}
              </>
            )}
          </div>
          {hasStudies && <StudyLinks studies={studies} stacked={compact} />}
        </article>
        {/* The brand logo pops in with the sticky. */}
        {card.stickers?.map((sticker, i) => (
          <LogoSticker key={sticker.name} sticker={sticker} show={mostInView} order={i} />
        ))}
        </div>
        </Swap>
      </Stage>
    );
  }

  return (
    <Stage>
      <Swap at={start} hold={hold} wire={featuredWire(start)}>
      <div className="relative group/card" data-in-view-key={card.role}>
      {card.peek && <Peek peek={card.peek} href={card.href} out={mostInView} />}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <article
        onClick={openStudy}
        className={`relative z-[1] group/exp rounded-lg border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark p-5 lg:p-6 ${clickable}`}
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
            <ReadStudy to={card.href} about={card.role} />
          )}
        </div>
      </article>
      {/* Brand logos that pop in with the sticky, like the case study cards'. */}
      {card.stickers?.map((sticker, i) => (
        <LogoSticker key={sticker.name} sticker={sticker} show={mostInView} order={i} />
      ))}
      </div>
      </Swap>
    </Stage>
  );
}

export default ExperienceCard;
