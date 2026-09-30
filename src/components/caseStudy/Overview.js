import React from 'react';
import ControlledGif from '../atoms/ControlledGif';
import { Reveal } from './Blocks';

// The six summary cards for a case study, from Erica's Figma (Portfolio 2024,
// nodes 17:10775 and 1:11519). They're used two ways:
//   - as slides in the home page strip (data/caseStudiesData.js)
//   - as a two-row grid at the top of the case study page (default export)
// Every card fills whatever box it's put in. Content comes from the
// `overview` object in data/caseStudies.

const card = `relative h-full w-full rounded-lg overflow-hidden text-left
  bg-surface-background200-light dark:bg-surface-background200-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark`;

const pad = 'p-6 lg:p-8';
const titleClass = 'font-inter font-medium text-2xl leading-normal tracking-tight';
const bodyText = 'font-inter font-medium text-sm lg:text-base leading-normal';

const TimerIcon = () => (
  <span className="relative inline-block w-8 h-8 shrink-0" aria-hidden="true">
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor">
      <path d="M20 1.33333H12V4H20V1.33333ZM14.6667 18.6667H17.3333V10.6667H14.6667V18.6667ZM25.3733 9.85333L27.2667 7.96C26.6933 7.28 26.0667 6.64 25.3867 6.08L23.4933 7.97333C21.4267 6.32 18.8267 5.33333 16 5.33333C9.37333 5.33333 4 10.7067 4 17.3333C4 23.96 9.36 29.3333 16 29.3333C22.64 29.3333 28 23.96 28 17.3333C28 14.5067 27.0133 11.9067 25.3733 9.85333ZM16 26.6667C10.84 26.6667 6.66667 22.4933 6.66667 17.3333C6.66667 12.1733 10.84 8 16 8C21.16 8 25.3333 12.1733 25.3333 17.3333C25.3333 22.4933 21.16 26.6667 16 26.6667Z" />
    </svg>
    {/* little "trending up" badge on the corner of the timer */}
    <svg
      viewBox="0 0 11.7546 11.6747"
      className="absolute -right-0.5 top-[18px] w-3 h-3 -scale-y-100"
      fill="none"
    >
      <rect
        x="0.47" y="0.47" width="10.81" height="10.73" rx="5.37"
        className="fill-surface-background200-light dark:fill-surface-background200-dark stroke-primary-foreground-light dark:stroke-primary-foreground-dark"
        strokeWidth="0.94"
      />
      <path
        d="M7.25541 8.18767V7.49861H8.15119L6.35963 5.72427L4.98151 7.1024L2.43198 4.53564L2.91432 4.0533L4.98151 6.12048L6.35963 4.74236L8.63353 7.01626V6.12048H9.32259V8.18767H7.25541Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

export function ProblemCard({ problem, showAvatar = false }) {
  return (
    <div className={`${card} ${pad}`}>
      <h3 className={titleClass}>{problem.title}</h3>
      <p className={`${bodyText} mt-4`}>“{problem.quote}”</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className={bodyText}>{problem.who}</p>
        {showAvatar && problem.avatar && (
          <img
            src={problem.avatar}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-primary-foreground-light dark:border-primary-foreground-dark"
          />
        )}
      </div>
    </div>
  );
}

export function PhotoCard({ photo }) {
  return (
    <div className={card}>
      <ControlledGif src={photo.src} poster={photo.poster} alt={photo.alt} className="w-full h-full object-cover" />
      {photo.emoji && (
        <span aria-hidden="true" className="absolute left-4 bottom-5 text-2xl leading-none select-none">
          {photo.emoji}
        </span>
      )}
    </div>
  );
}

const bubble = `absolute z-10 w-[44%] max-w-[160px] m-0 p-2 rounded-md backdrop-blur-md font-inter font-medium
  bg-white/85 dark:bg-surface-background100-dark/85
  border border-surface-outline-light dark:border-surface-outline-dark`;

// Where each quote bubble floats over the screens.
const BUBBLE_SPOT = [
  'hidden sm:block left-[28%] top-[8%]',
  'right-[6%] top-[9%]',
  'right-[2.5%] bottom-[4%]',
];

export function SolutionCard({ solution }) {
  return (
    <div className={`${card} ${pad} min-h-[332px]`}>
      <h3 className={titleClass}>{solution.title}</h3>
      <img
        src={solution.image.src}
        alt={solution.image.alt}
        loading="lazy"
        decoding="async"
        className="absolute left-6 lg:left-8 top-[84px] w-[514px] max-w-none h-auto"
      />
      {solution.quotes.map((q, i) => (
        <figure key={q.who} className={`${bubble} ${BUBBLE_SPOT[i % BUBBLE_SPOT.length]}`}>
          <blockquote className="m-0 text-[10px] leading-[15px] text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {q.text}
          </blockquote>
          <figcaption className="text-[8px] leading-[17px] tracking-wide text-surface-foreground400-light dark:text-surface-foreground400-dark">
            {q.who}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function BenefitsCard({ benefits }) {
  return (
    <div className={`${card} ${pad} pb-28 lg:pb-28`}>
      <h3 className={titleClass}>{benefits.title}</h3>
      {benefits.items.map((item) => (
        <p key={item.label} className={`${bodyText} mt-4 first-of-type:mt-4 relative z-10`}>
          <strong className="font-bold">{item.label}:</strong> {item.text}
        </p>
      ))}
      {benefits.image && (
        <img
          src={benefits.image.src}
          alt={benefits.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute left-[33%] -bottom-[105px] w-[246px] max-w-none h-auto"
        />
      )}
    </div>
  );
}

export function MetricCard({ metric }) {
  return (
    <div className={`${card} ${pad} flex flex-col justify-between gap-4`}>
      <h3 className={`${titleClass} flex items-start gap-2`}>
        <TimerIcon />
        {metric.title}
      </h3>
      <div className="text-center">
        <p className="relative inline-block font-inter font-medium text-[112px] lg:text-[128px] leading-none tracking-[-8px] pr-2">
          {metric.value}
          <span className="absolute left-full top-3 text-2xl tracking-normal font-medium">{metric.unit}</span>
        </p>
        <p className={`${bodyText} mt-1`}>{metric.label}</p>
      </div>
      <p className="font-inter font-medium text-xs leading-normal">{metric.note}</p>
    </div>
  );
}

export function ActivitiesCard({ activities }) {
  return (
    <div className={`${card} flex flex-col`}>
      <div className={`${pad} pb-4 lg:pb-4`}>
        <h3 className={titleClass}>{activities.title}</h3>
        <ul className={`${bodyText} mt-4 list-disc pl-6 m-0`}>
          {activities.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <img
        src={activities.image.src}
        alt={activities.image.alt}
        loading="lazy"
        decoding="async"
        className="mt-auto ml-3 w-[323px] max-w-none h-auto"
      />
    </div>
  );
}

// Erica's original Research slide: a row of big numbers.
export function ResearchCard({ research }) {
  return (
    <div className={`${card} ${pad} flex flex-col`}>
      <h3 className={titleClass}>{research.title}</h3>
      <dl className="flex-1 m-0 mt-4 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-5 content-center">
        {research.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse text-center">
            <dt className={bodyText}>{stat.label}</dt>
            <dd className="m-0 font-inter font-medium text-4xl lg:text-5xl leading-none tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// A titled card that holds any picture or illustration (the wireframes slide).
export function ArtCard({ title, children }) {
  return (
    <div className={`${card} ${pad} flex flex-col`}>
      <h3 className={titleClass}>{title}</h3>
      <div className="relative flex-1 min-h-0 mt-4">{children}</div>
    </div>
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
            <div>
              <ProblemCard problem={problem} showAvatar />
            </div>
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
