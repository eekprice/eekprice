import { Link } from 'react-router-dom';
import React from 'react';
import ControlledGif from '../atoms/ControlledGif';
import ReadStudy from '../ReadStudy';
import { Reveal, chipClass } from './Blocks';
import { Stage, Swap } from '../sketch/Sketch';

// The summary cards for a case study. Content is from Erica's Figma (Portfolio
// 2024, nodes 17:10775 and 1:11519); the card design follows the share cards
// and carousel slides people post to Instagram and LinkedIn:
//   - every card uses the same shell (Slide)
//   - a small label sits at the top, the main thing is pinned to the bottom
//   - one idea per card, set big
//   - two cards carry color: the problem quote (tint) and the result (accent)
//
// They're used two ways:
//   - as slides in the home page strip (data/caseStudiesData.js), with `step`
//   - as a two-row grid at the top of the case study page (default export)
// Every card fills whatever box it's put in. Content comes from the
// `overview` object in data/caseStudies.

const shell = 'relative h-full w-full rounded-xl border overflow-hidden text-left font-inter';

const LOOKS = {
  plain: `bg-surface-background200-light dark:bg-surface-background200-dark
    text-surface-foreground100-light dark:text-surface-foreground100-dark
    border-surface-outline-light dark:border-surface-outline-dark`,
  tint: `bg-surface-background300-light dark:bg-surface-background300-dark
    text-surface-foreground300-light dark:text-surface-foreground300-dark
    border-surface-outline-light dark:border-surface-outline-dark`,
  accent: `bg-primary-foreground-light dark:bg-primary-foreground-dark
    text-white dark:text-teal-900
    border-primary-foreground-light dark:border-primary-foreground-dark`,
};

// Quieter text for labels, captions, and notes on each look.
const MUTED = {
  plain: 'text-surface-foreground400-light dark:text-surface-foreground400-dark',
  tint: 'text-surface-foreground400-light dark:text-surface-foreground400-dark',
  accent: 'text-teal-200 dark:text-teal-800',
};

const pad = 'p-5';
const column = 'flex flex-col justify-between gap-5';
const hairline = 'border-surface-outline-light dark:border-surface-outline-dark';

function Slide({ look = 'plain', className = '', children }) {
  return <div className={`${shell} ${LOOKS[look]} ${className}`}>{children}</div>;
}

// The small label at the top of a card: optional step number, optional icon,
// then the card's title. It's the card's heading.
function Label({ step, look = 'plain', icon = null, className = '', children }) {
  return (
    <h3 className={`m-0 flex items-center gap-1.5 text-xs font-medium leading-none ${MUTED[look]} ${className}`}>
      {step != null && <span className="opacity-70 tabular-nums">{String(step).padStart(2, '0')}</span>}
      {icon}
      <span>{children}</span>
    </h3>
  );
}

// Erica's timer icon with the little "trending up" badge on its corner.
const TimerIcon = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M20 1.33333H12V4H20V1.33333ZM14.6667 18.6667H17.3333V10.6667H14.6667V18.6667ZM25.3733 9.85333L27.2667 7.96C26.6933 7.28 26.0667 6.64 25.3867 6.08L23.4933 7.97333C21.4267 6.32 18.8267 5.33333 16 5.33333C9.37333 5.33333 4 10.7067 4 17.3333C4 23.96 9.36 29.3333 16 29.3333C22.64 29.3333 28 23.96 28 17.3333C28 14.5067 27.0133 11.9067 25.3733 9.85333ZM16 26.6667C10.84 26.6667 6.66667 22.4933 6.66667 17.3333C6.66667 12.1733 10.84 8 16 8C21.16 8 25.3333 12.1733 25.3333 17.3333C25.3333 22.4933 21.16 26.6667 16 26.6667Z" />
  </svg>
);

// A quote with who said it. Tinted by default (the problem card); pass
// look="plain" when the quote isn't the problem.
export function ProblemCard({ problem, step, look = 'tint' }) {
  return (
    <Slide look={look} className={`${pad} ${column}`}>
      <Label step={step} look={look}>{problem.title}</Label>
      <figure className="m-0">
        <blockquote className="m-0 font-merriweather font-light text-lg leading-snug">
          “{problem.quote}”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2.5 text-sm">
          {problem.avatar && (
            <img
              src={problem.avatar}
              alt=""
              className="w-10 h-10 shrink-0 rounded-full object-cover border-2 border-primary-foreground-light dark:border-primary-foreground-dark"
            />
          )}
          {problem.who}
        </figcaption>
      </figure>
    </Slide>
  );
}

// A clip behind a play button. It fills the card, cropped to fit. With
// `photo.contain` the whole picture shows on black, for a screen recording
// that shouldn't lose its edges.
export function PhotoCard({ photo, step }) {
  const fit = photo.contain ? 'object-contain bg-black' : 'object-cover';
  return (
    <Slide>
      <ControlledGif src={photo.src} poster={photo.poster} alt={photo.alt} className={`w-full h-full ${fit}`} />
      {photo.title && (
        <Label
          step={step}
          className="absolute left-3 top-3 px-2 py-1.5 rounded-md shadow-sm
            bg-surface-background100-light/90 dark:bg-surface-background100-dark/90"
        >
          {photo.title}
        </Label>
      )}
      {photo.emoji && (
        <span aria-hidden="true" className="absolute left-4 bottom-5 text-2xl leading-none select-none">
          {photo.emoji}
        </span>
      )}
    </Slide>
  );
}

// The research numbers: one row along the bottom, under a hairline.
export function ResearchCard({ research, step }) {
  return (
    <Slide className={`${pad} ${column}`}>
      <Label step={step}>{research.title}</Label>
      {research.photo && (
        <div className="relative flex-1 min-h-0">
          <img
            src={research.photo.src}
            alt={research.photo.alt}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover rounded-md ${research.photo.position || 'object-center'}`}
          />
        </div>
      )}
      {/* The line above the numbers is only for a card with no photo. */}
      <dl className={`m-0 ${research.photo ? '' : `pt-4 border-t ${hairline}`} grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-4`}>
        {research.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className={`mt-1.5 text-xs whitespace-nowrap ${MUTED.plain}`}>{stat.label}</dt>
            <dd className="m-0 font-medium text-4xl leading-none tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Slide>
  );
}

// A labelled card that holds any picture or illustration (the wireframes slide).
// Pass `image` ({ src, alt, position?, framed? }) with an optional one-line
// `caption` under it, or pass children for anything else. Images sit straight
// on the card, whole, with no box: the photo collages are cut-out PNGs. Set
// `framed: true` for a plain screenshot, which fills the space inside a
// hairline box so its white edges don't melt into the card.
// A screenshot shown whole, with one part circled in red marker and a short
// note beside the circle (Erica, 2026-11-19: show the full screen, circle the
// action panel, add a note). `image.ratio` is the picture's width / height:
// the box takes the biggest size of that shape that fits the card, whatever
// the card's own shape, so the circle always lands on the same part.
// `image.mark` is { left, top, width, height } in percent of the picture, and
// `note` the words.
function MarkedImage({ image }) {
  const { mark, ratio } = image;
  return (
    // Picture on the left, the note on the right (Erica drew this on a
    // screenshot, 2026-11-19). On a phone the note goes under the picture.
    <div className="absolute inset-0 flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center">
      <div className="relative flex-1 min-w-0 min-h-0 sm:h-full">
        <div className="absolute inset-0 flex items-center justify-start" style={{ containerType: 'size' }}>
          <div
            className="relative"
            style={{ width: `min(100cqw, calc(100cqh * ${ratio}))`, aspectRatio: `${ratio}` }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`block w-full h-full rounded-md border ${hairline}`}
            />
            <svg
              viewBox="0 0 200 80"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              className="absolute overflow-visible pointer-events-none"
              style={{ left: `${mark.left}%`, top: `${mark.top}%`, width: `${mark.width}%`, height: `${mark.height}%` }}
            >
              <path
                // The box is stretched to the panel's shape, so the line keeps its
                // own width. No draw-on: dashes and a stretched path don't mix.
                className="sk-ink sk-ink--red"
                vectorEffect="non-scaling-stroke"
                d="M118 7 C 70 3, 14 12, 8 38 C 3 62, 52 76, 104 75 C 156 74, 196 62, 193 38 C 190 14, 140 6, 92 8 C 78 8.6, 66 10.4, 56 13"
              />
            </svg>
          </div>
        </div>
      </div>
      {mark.note && (
        <p className="m-0 sm:w-[30%] shrink-0 text-sm sm:text-base leading-snug font-medium">
          {/* A small red ring, so the words read as the label for the circle. */}
          <span aria-hidden="true" className="inline-block w-2.5 h-2.5 mr-1.5 rounded-full border-2 border-red-600 align-baseline" />
          {mark.note}
        </p>
      )}
    </div>
  );
}

export function ArtCard({ title, step, image, caption, children }) {
  return (
    <Slide className={`${pad} flex flex-col`}>
      <Label step={step}>{title}</Label>
      <div className="relative flex-1 min-h-0 mt-3">
        {image?.mark ? (
          <MarkedImage image={image} />
        ) : image ? (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full ${image.position || 'object-center'} ${
              image.framed ? `object-cover rounded-md border ${hairline}` : 'object-contain'
            }`}
          />
        ) : (
          children
        )}
      </div>
      {caption && <p className="m-0 mt-3 text-sm leading-snug">{caption}</p>}
    </Slide>
  );
}

// One statement, set big, with a smaller line under it. Label on top, words
// pinned to the bottom. Works in any look: `tint` for a challenge, `accent`
// for the one dark card in a set.
export function TextCard({ title, step, look = 'plain', big, small }) {
  return (
    <Slide look={look} className={`${pad} ${column}`}>
      <Label step={step} look={look}>{title}</Label>
      <div>
        <p className="m-0 font-merriweather font-light text-2xl leading-snug">{big}</p>
        {small && <p className={`m-0 mt-3 text-sm leading-normal ${MUTED[look]}`}>{small}</p>}
      </div>
    </Slide>
  );
}

// The last slide of a home strip: the whole card is a link to the full case
// study. A picture of the work, tilted like a print, then the study's name
// and a solid button, so it reads as the thing to click. On hover the card
// lifts, the picture straightens and the arrow moves.
export function ReadFullCard({ to, title, image }) {
  return (
    <Link
      to={to}
      className="group/read block h-full rounded-xl transition-transform duration-300 ease-out
        motion-safe:hover:-translate-y-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark"
    >
      <Slide
        look="tint"
        className={`${pad} flex flex-col gap-4 transition-[border-color,box-shadow] duration-300
          group-hover/read:shadow-lg
          group-hover/read:border-primary-foreground-light dark:group-hover/read:border-primary-foreground-dark`}
      >
        <Label look="tint">The whole story</Label>
        {image && (
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain -rotate-3 transition-transform duration-300 ease-out
                motion-safe:group-hover/read:rotate-0 motion-safe:group-hover/read:scale-105"
            />
          </div>
        )}
        <div className={image ? '' : 'mt-auto'}>
          <p className="m-0 font-merriweather font-light text-lg leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {title}
          </p>
          <ReadStudy inside className="mt-3 w-full justify-center" />
        </div>
      </Slide>
    </Link>
  );
}

const bubble = `absolute z-10 w-[44%] max-w-[172px] m-0 px-2.5 py-2 rounded-md backdrop-blur-md shadow-sm
  bg-white/90 dark:bg-surface-background100-dark/90
  border border-surface-outline-light dark:border-surface-outline-dark`;

// Where each quote bubble floats over the screens.
const BUBBLE_SPOT = [
  'hidden sm:block left-[25%] top-[4%]',
  'right-[3%] top-[13%]',
  'right-[3%] bottom-[5%]',
];

export function SolutionCard({ solution, step }) {
  return (
    <Slide className={`${pad} min-h-[332px]`}>
      <Label step={step}>{solution.title}</Label>
      <img
        src={solution.image.src}
        alt={solution.image.alt}
        loading="lazy"
        decoding="async"
        className="absolute left-5 top-14 w-[520px] max-w-none h-auto"
      />
      {solution.quotes.map((q, i) => (
        <figure key={q.who} className={`${bubble} ${BUBBLE_SPOT[i % BUBBLE_SPOT.length]}`}>
          <blockquote className="m-0 text-xs leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {q.text}
          </blockquote>
          <figcaption className={`mt-1 text-[11px] leading-tight ${MUTED.plain}`}>{q.who}</figcaption>
        </figure>
      ))}
    </Slide>
  );
}

export function BenefitsCard({ benefits, step }) {
  return (
    <Slide className={`${pad} ${column}`}>
      <Label step={step}>{benefits.title}</Label>
      {benefits.image && (
        <img
          src={benefits.image.src}
          alt={benefits.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute -right-5 -top-7 w-28 h-auto pointer-events-none"
        />
      )}
      <div className="divide-y divide-surface-outline-light dark:divide-surface-outline-dark">
        {benefits.items.map((item) => (
          <div key={item.label} className="py-3 first:pt-0 last:pb-0">
            <p className="m-0 text-sm font-medium">{item.label}</p>
            <p className="m-0 mt-0.5 text-sm leading-normal text-surface-foreground200-light dark:text-surface-foreground200-dark">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// The result. The one dark card in the set.
export function MetricCard({ metric, step }) {
  return (
    <Slide look="accent" className={`${pad} ${column}`}>
      <Label step={step} look="accent" icon={<TimerIcon />}>{metric.title}</Label>
      <div>
        <p className="m-0 font-medium text-8xl leading-[0.9] tracking-[-4px]">
          {metric.value}
          <span className="align-top ml-1.5 text-2xl tracking-normal">{metric.unit}</span>
        </p>
        <p className="m-0 mt-3 text-sm">{metric.label}</p>
        <p className={`m-0 mt-2 text-xs leading-normal ${MUTED.accent}`}>{metric.note}</p>
      </div>
    </Slide>
  );
}

export function ActivitiesCard({ activities, step }) {
  return (
    <Slide className="flex flex-col">
      <div className={`${pad} pb-4`}>
        <Label step={step}>{activities.title}</Label>
        <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0 m-0">
          {activities.items.map((item) => (
            <li key={item} className={chipClass}>{item}</li>
          ))}
        </ul>
      </div>
      <img
        src={activities.image.src}
        alt={activities.image.alt}
        loading="lazy"
        decoding="async"
        className={`flex-1 min-h-[120px] w-full object-cover object-left-top border-t ${hairline}`}
      />
    </Slide>
  );
}

// One story card from a study's `slides` list (see menu-management in
// data/caseStudies). `type` picks the card.
export function SlideCard({ slide, step }) {
  const { type, look, title } = slide;
  if (type === 'art') {
    return <ArtCard title={title} step={step} image={slide.image} caption={slide.caption} />;
  }
  if (type === 'quote') {
    return <ProblemCard problem={slide} look={look || 'plain'} step={step} />;
  }
  return <TextCard title={title} step={step} look={look} big={slide.big} small={slide.small} />;
}

// Columns out of 12 for each card from 1024px up. Full class names so
// Tailwind keeps them.
const SPAN = {
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  12: 'lg:col-span-12',
};

// Wire to real for one card: it sketches itself as a pencil wireframe the
// first time it's seen, holds, then the real card rises in. `at` is when the
// sketch starts (ms after the card is seen), so cards in a row can follow
// each other. `wire` is WireBlock options shaped like the card.
const FIRST = 150; // ms before the first card in a row starts sketching
const STAGGER = 150; // ms between cards in the same row

function Sketched({ at = FIRST, wire, className = 'h-full', children }) {
  return (
    <Stage className={className}>
      <Swap at={at} className="h-full" wire={{ image: false, ...wire, at }}>
        {children}
      </Swap>
    </Stage>
  );
}

// The wireframe for each kind of story card: a squiggle for the label, then
// lines for words or a crossed box for a picture.
const WIRE = {
  text: { lines: [22, 92, 84, 70] },
  quote: { lines: [22, 92, 88, 84, 76, 40] },
  art: { lines: [24, 70], image: true },
  artNoCaption: { lines: [24], image: true },
};

const wireFor = (slide) => {
  if (slide.type === 'art') return slide.caption ? WIRE.art : WIRE.artNoCaption;
  return WIRE[slide.type] || WIRE.text;
};

// A bento grid of a study's story cards at the top of its page, read left to
// right, top to bottom, in story order. Each card's `span` sets its width;
// rows are spans that add up to 12. Under 1024px the cards stack, and picture
// cards get a fixed height since the picture has none of its own. Every card
// is sketched first, and cards in the same row sketch one after another.
export function StoryGrid({ slides }) {
  let used = 0; // columns used so far in the current row
  let position = -1; // this card's place in its row: 0, 1, 2
  return (
    <section aria-label="At a glance" className="max-w-[1000px] mx-auto px-4 pb-4">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {slides.map((slide, i) => {
            const span = slide.span || 12;
            if (used === 0 || used + span > 12) {
              used = 0;
              position = 0;
            } else {
              position += 1;
            }
            used = (used + span) % 12;
            const size = slide.type === 'art' ? 'h-[280px] sm:h-[340px] lg:h-auto' : 'min-h-[240px]';
            return (
              <div key={slide.title} className={`${SPAN[span] || SPAN[12]} ${size} lg:min-h-[320px]`}>
                <Sketched at={FIRST + position * STAGGER} wire={wireFor(slide)}>
                  <SlideCard slide={slide} step={i + 1} />
                </Sketched>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

// The grid at the top of the case study page.
//   Row 1: Problem | The solution (wide)
//   Row 2: the before, side by side: the old POS in use | its screen
//   Row 3: Benefits | the big number | Main activities
// Rows 1 and 2 share the same two columns so their edges line up.
// Every card is sketched first, left to right.
const TWO_COLUMNS = 'grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-4';
const BEFORE_ROW = 'grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-3 lg:gap-4';

function Overview({ overview }) {
  const { problem, photo, screen, solution, benefits, metric, activities } = overview;

  return (
    <section aria-label="At a glance" className="max-w-[1000px] mx-auto px-4 pb-4 space-y-3 lg:space-y-4">
      <Reveal>
        <div className={TWO_COLUMNS}>
          <Sketched wire={{ lines: [22, 92, 84, 70, 40] }}>
            <ProblemCard problem={problem} />
          </Sketched>
          <Sketched at={FIRST + STAGGER} className="h-full min-h-[332px]" wire={{ lines: [22], image: true }}>
            <SolutionCard solution={solution} />
          </Sketched>
        </div>
      </Reveal>

      {/* The before. Erica asked for the recording smaller, so the two clips
          sit side by side from 640px up, in a row 280px tall (332px on
          desktop, like the other rows). The recording shows whole, on black.
          Only phones stack them, and there its cell keeps the recording's shape. */}
      <Reveal>
        <div className={screen ? BEFORE_ROW : ''}>
          <div className="h-[240px] sm:h-auto">
            <Sketched wire={{ lines: [30], image: true }}>
              <PhotoCard photo={photo} />
            </Sketched>
          </div>
          {screen && (
            <div className="aspect-[604/418] sm:aspect-auto sm:h-[280px] lg:h-[332px]">
              <Sketched at={FIRST + STAGGER} wire={{ lines: [30], image: true }}>
                <PhotoCard photo={screen} />
              </Sketched>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <Sketched wire={{ lines: [22, 60, 92, 84, 60, 92, 70] }}>
            <BenefitsCard benefits={benefits} />
          </Sketched>
          <div className="min-h-[332px]">
            <Sketched at={FIRST + STAGGER} wire={{ lines: [30, 50, 40, 80] }}>
              <MetricCard metric={metric} />
            </Sketched>
          </div>
          <Sketched at={FIRST + STAGGER * 2} wire={{ lines: [36, 70], image: true }}>
            <ActivitiesCard activities={activities} />
          </Sketched>
        </div>
      </Reveal>
    </section>
  );
}

export default Overview;
