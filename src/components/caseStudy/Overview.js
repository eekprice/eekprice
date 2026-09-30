import React from 'react';
import ControlledGif from '../atoms/ControlledGif';
import { Reveal } from './Blocks';

// The high-level view at the top of a case study, laid out like Erica's Figma
// (Portfolio 2024, node 1:11519): soft grey cards in two rows.
//   Row 1: Problem card stacked on a photo | The solution (wide)
//   Row 2: Benefits | one big number | Main activities
// Content comes from the `overview` object in data/caseStudies.

const card = `rounded-xl overflow-hidden
  bg-surface-background200-light dark:bg-surface-background200-dark
  text-surface-foreground100-light dark:text-surface-foreground100-dark`;

const titleClass = 'font-inter font-normal text-xl lg:text-2xl';
const bodyText = 'font-inter text-sm lg:text-base leading-relaxed';

const bubble = `absolute z-10 max-w-[46%] rounded-md px-2.5 py-2 shadow-lg font-inter
  bg-surface-background100-light dark:bg-surface-background100-dark
  border border-surface-outline-light dark:border-surface-outline-dark`;

const StopwatchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M10 2h4M12 14l3-3M18.5 7.5L20 6M12 22a8 8 0 100-16 8 8 0 000 16z"
    />
  </svg>
);

function Problem({ problem }) {
  return (
    <div className={`${card} p-5 lg:p-6`}>
      <h2 className={titleClass}>{problem.title}</h2>
      <p className={`${bodyText} mt-4`}>"{problem.quote}"</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className={bodyText}>{problem.who}</p>
        {problem.avatar && (
          <img
            src={problem.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-foreground-light dark:border-primary-foreground-dark"
          />
        )}
      </div>
    </div>
  );
}

function Solution({ solution }) {
  return (
    <div className={`${card} relative flex flex-col h-full min-h-[300px] lg:min-h-[360px]`}>
      <h2 className={`${titleClass} px-5 pt-5 lg:px-6 lg:pt-6`}>{solution.title}</h2>
      <div className="relative flex-1 mt-6 lg:mt-8 ml-8 lg:ml-10">
        <img
          src={solution.image.src}
          alt={solution.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-[125%] max-w-none h-full object-cover object-left-top"
        />
      </div>
      {solution.quotes.map((q, i) => (
        <figure key={q.who} className={`${bubble} ${i === 0 ? 'right-[18%] top-[12%]' : 'left-3 lg:left-5 bottom-[10%]'} m-0`}>
          <blockquote className="m-0 text-[11px] lg:text-xs leading-snug">{q.text}</blockquote>
          <figcaption className="mt-1 text-[10px] text-surface-foreground400-light dark:text-surface-foreground400-dark">
            {q.who}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Benefits({ benefits }) {
  return (
    <div className={`${card} p-5 lg:p-6 h-full`}>
      <h2 className={titleClass}>{benefits.title}</h2>
      {benefits.items.map((item) => (
        <p key={item.label} className={`${bodyText} mt-4`}>
          <strong className="font-semibold">{item.label}:</strong> {item.text}
        </p>
      ))}
    </div>
  );
}

function Metric({ metric }) {
  return (
    <div className={`${card} p-5 lg:p-6 h-full flex flex-col`}>
      <h2 className={`${titleClass} flex items-center gap-2`}>
        <StopwatchIcon className="w-6 h-6 shrink-0" />
        {metric.title}
      </h2>
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <p className="font-inter font-semibold leading-none text-7xl lg:text-8xl tracking-tight">
          {metric.value}
          <span className="align-top text-xl lg:text-2xl font-normal ml-1">{metric.unit}</span>
        </p>
        <p className={`${bodyText} mt-2`}>{metric.label}</p>
      </div>
      <p className="font-inter text-xs lg:text-sm leading-relaxed">{metric.note}</p>
    </div>
  );
}

function Activities({ activities }) {
  return (
    <div className={`${card} h-full flex flex-col`}>
      <div className="p-5 lg:p-6">
        <h2 className={titleClass}>{activities.title}</h2>
        <ul className={`${bodyText} mt-4 list-disc pl-5 space-y-1`}>
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
        className="w-full flex-1 min-h-[140px] max-h-[220px] object-cover object-top"
      />
    </div>
  );
}

function Overview({ overview }) {
  const { problem, photo, solution, benefits, metric, activities } = overview;

  return (
    <section aria-label="At a glance" className="max-w-[1000px] mx-auto px-4 pb-4 space-y-3 lg:space-y-4">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-4">
          <div className="flex flex-col gap-3 lg:gap-4">
            <Problem problem={problem} />
            <div className={`${card} flex-1 min-h-[200px]`}>
              <ControlledGif
                src={photo.src}
                poster={photo.poster}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Solution solution={solution} />
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <Benefits benefits={benefits} />
          <Metric metric={metric} />
          <Activities activities={activities} />
        </div>
      </Reveal>
    </section>
  );
}

export default Overview;
