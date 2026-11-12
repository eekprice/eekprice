import React from 'react';
import ControlledGif from '../atoms/ControlledGif';
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

export function ProblemCard({ problem, step }) {
  return (
    <Slide look="tint" className={`${pad} ${column}`}>
      <Label step={step} look="tint">{problem.title}</Label>
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

export function PhotoCard({ photo, step }) {
  return (
    <Slide>
      <ControlledGif src={photo.src} poster={photo.poster} alt={photo.alt} className="w-full h-full object-cover" />
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
      <dl className={`m-0 pt-4 border-t ${hairline} grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-4`}>
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
export function ArtCard({ title, step, children }) {
  return (
    <Slide className={`${pad} flex flex-col`}>
      <Label step={step}>{title}</Label>
      <div className="relative flex-1 min-h-0 mt-3">{children}</div>
    </Slide>
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

// The grid at the top of the case study page.
//   Row 1: Problem stacked on the photo | The solution (wide)
//   Row 2: Benefits | the big number | Main activities
function Overview({ overview }) {
  const { problem, photo, solution, benefits, metric, activities } = overview;

  return (
    <section aria-label="At a glance" className="max-w-[1000px] mx-auto px-4 pb-4 space-y-3 lg:space-y-4">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-4">
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* Wire to real, once per screen: the first card sketches itself, then the real card takes its place. */}
            <Stage>
              <Swap at={150} wire={{ lines: [22, 92, 84, 70, 40], image: false }}>
                <ProblemCard problem={problem} />
              </Swap>
            </Stage>
            <div className="flex-1 min-h-[220px]">
              <PhotoCard photo={photo} />
            </div>
          </div>
          <SolutionCard solution={solution} />
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <BenefitsCard benefits={benefits} />
          <div className="min-h-[332px]">
            <MetricCard metric={metric} />
          </div>
          <ActivitiesCard activities={activities} />
        </div>
      </Reveal>
    </section>
  );
}

export default Overview;
