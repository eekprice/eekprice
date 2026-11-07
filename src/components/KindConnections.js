import React, { useState } from 'react';
import { ReactComponent as HeartSvg } from '../assets/Heart.svg';
import { ReactComponent as ShiningStars } from '../assets/ShiningStars.svg';
import SectionHeading from './SectionHeading';
import { Reveal } from './caseStudy/Blocks';
import { kindConnections, sectionTitles } from '../data/home';

const ChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

function Avatar({ photo, name }) {
  const ring = 'w-16 h-16 rounded-full border-4 border-white shadow-md shrink-0 overflow-hidden';
  if (photo) {
    return <img src={photo} alt="" loading="lazy" decoding="async" className={`${ring} object-cover`} />;
  }
  return (
    <span
      aria-hidden="true"
      className={`${ring} flex items-center justify-center bg-surface-background200-light text-slate-600 font-inter font-medium`}
    >
      {initials(name)}
    </span>
  );
}

function ConnectionNote({ note }) {
  const [open, setOpen] = useState(false);
  const firstName = note.name.split(' ')[0];

  return (
    <Reveal>
      <figure
        className="rounded-sm shadow-md p-5
          bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark
          text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark font-inter"
      >
        <p className="text-xs text-highlight-foregroundStickyMuted-light dark:text-highlight-foregroundStickyMuted-dark">{note.from}</p>
        <blockquote className="mt-3 text-sm leading-relaxed">
          <p>{note.text}</p>
          {note.more && open && <p className="mt-3">{note.more}</p>}
        </blockquote>

        {note.more && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1 text-xs text-highlight-foregroundStickyMuted-light dark:text-highlight-foregroundStickyMuted-dark underline-offset-2 hover:underline
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900 rounded"
          >
            {open ? `Show less from ${firstName}` : `Read more of what ${firstName} has to say`}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${open ? '-rotate-90' : ''}`} />
          </button>
        )}

        <figcaption className="mt-4 flex items-end justify-between gap-3">
          <span>
            <span className="block text-lg leading-tight text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark">{note.name}</span>
            <span className="block text-xs text-highlight-foregroundStickyMuted-light dark:text-highlight-foregroundStickyMuted-dark">{note.role}</span>
          </span>
          <Avatar photo={note.photo} name={note.name} />
        </figcaption>
      </figure>
    </Reveal>
  );
}

function KindConnections() {
  return (
    <section aria-labelledby="kind-connections" className="relative max-w-[800px] mx-auto px-4 py-8">
      <SectionHeading id="kind-connections" lines={false}>
        {sectionTitles.connections}
      </SectionHeading>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
        <HeartSvg
          className="hidden sm:block absolute left-1/2 -translate-x-1/2 -top-3 w-9 h-9 z-10 drop-shadow-md"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-5">
          {kindConnections.left.map((note) => (
            <ConnectionNote key={note.name} note={note} />
          ))}
        </div>
        <div className="flex flex-col gap-5 sm:mt-16">
          {kindConnections.right.map((note) => (
            <ConnectionNote key={note.name} note={note} />
          ))}
        </div>
        <ShiningStars
          className="hidden sm:block absolute -left-10 -bottom-10 w-16 h-16 text-surface-foreground100-light dark:text-surface-foreground100-dark [&_path]:fill-current"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default KindConnections;
