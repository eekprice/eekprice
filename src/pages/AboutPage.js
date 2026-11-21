import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as StarSvg } from '../assets/Star.svg';
import { ReactComponent as StarsSvg } from '../assets/Stars.svg';
import { ReactComponent as HeartSvg } from '../assets/Heart.svg';
import selfie from '../assets/photos/p2.png';
import lake from '../assets/photos/p1.png';
import kayak from '../assets/photos/p3.png';
import couch from '../assets/photos/p4.png';
import { Reveal } from '../components/caseStudy/Blocks';
import { Circle, Stage, WireImage } from '../components/sketch/Sketch';
import Stamp from '../components/sketch/Stamp';
import { land } from '../components/sketch/motion';
import FloatingNav from '../components/FloatingNav';
import { intro, hobbies } from '../data/about';
import { pageSeen } from '../data/opening';

// From the design system: the page sits on the dot grid, the photos land like
// paper, the stickers and emoji pop, the title types itself and one word gets circled, and
// photo slots with no picture yet are drawn as a wireframe.

const ease = [0.22, 1, 0.36, 1];

const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

// The photos already have their white frame baked in, so they only need a tilt.
const collage = [
  { src: selfie, alt: 'Erica and her son, both grinning at the camera', rotate: -2 },
  { src: lake, alt: 'Erica, her husband, and their son by a mountain lake', rotate: 1.5 },
  { src: kayak, alt: 'Erica and her son in a green kayak', rotate: 1 },
  { src: couch, alt: "Erica's husband, their son, and the dog on the couch", rotate: -1.5 },
];

function PhotoCollage() {
  const reduce = useReducedMotion();
  const ink = 'text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current';

  // Smaller than it was (Erica, 2026-11-20): 300px came down to 230px.
  return (
    <div className="relative w-[220px] sm:w-[230px] shrink-0 mx-auto md:mx-0">
      {/* Set like the page's headers, same font and color (Erica, 2026-11-20).
          It keeps the tilt it had as a marker word. */}
      <div className="-ml-6 mb-2" aria-hidden="true">
        <p
          className="m-0 font-merriweather font-normal text-2xl lg:text-3xl text-surface-foreground200-light dark:text-surface-foreground100-dark"
          style={{ rotate: '-6deg', transformOrigin: 'left bottom' }}
        >
          {intro.kicker}
        </p>
      </div>

      <Stamp className="absolute left-[42%] top-7 w-7 h-7 z-10" delay={0.7}>
        <StarSvg className="w-full h-full" />
      </Stamp>
      <Stamp className="absolute left-[52%] top-11 w-7 h-7 z-10" delay={0.8}>
        <HeartSvg className="w-full h-full drop-shadow-md" />
      </Stamp>

      <div className="grid grid-cols-2 gap-2">
        {collage.map((photo, i) => (
          // Paper lands: each photo drops in from above, a bit large and
          // turned, and settles with a spring. The outer element does the
          // landing so the hover on the photo never waits for its delay.
          <motion.div
            key={photo.src}
            initial={reduce ? false : { opacity: 0, y: -28, rotate: -7, scale: 1.12 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 + i * 0.08 }}
          >
            <motion.img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-[filter] duration-300"
              style={{ rotate: photo.rotate }}
              whileHover={reduce ? undefined : { y: -8, rotate: photo.rotate + 2 }}
              transition={{ duration: 0.3, ease }}
            />
          </motion.div>
        ))}
      </div>

      <Stamp className="absolute -left-8 -bottom-7 w-10 h-10" delay={0.9}>
        <StarsSvg className={`w-full h-full ${ink}`} />
      </Stamp>
    </div>
  );
}

// The page title types itself in on load, then one word gets circled in teal
// marker (Erica, 2026-11-20). Which word is set in the copy file
// (`intro.circled`). Without it the title is typed and left plain.
//
// The whole title is laid out from the start and the letters not typed yet
// are invisible, so nothing moves as it types. Screen readers get the full
// title at once from the heading's label.
const TYPE_START = 450; // after the block has faded in
const TYPE_EVERY = 65; // ms per letter
const CIRCLE_AFTER = 250; // pause between the last letter and the circle

function Title() {
  const reduce = useReducedMotion();
  const { heading, circled } = intro;
  // Back on this page in the same visit: the title is already typed and circled.
  const [still] = useState(() => !!reduce || pageSeen());
  const [typed, setTyped] = useState(still ? heading.length : 0);
  const [circle, setCircle] = useState(still);
  const done = typed >= heading.length;

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setCircle(true), CIRCLE_AFTER);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? TYPE_START : TYPE_EVERY);
    return () => clearTimeout(t);
  }, [typed, done]);

  // A stretch of the title, from `from` to `to`: the typed letters, the
  // caret if it is in this stretch, then the letters still to come.
  const part = (from, to) => {
    const shown = Math.max(0, Math.min(typed, to) - from);
    const caretHere = !circle && typed >= from && (typed < to || to === heading.length);
    return (
      <>
        {heading.slice(from, from + shown)}
        {caretHere && (
          <span className="relative inline-block w-0 align-baseline">
            <span className="absolute left-[2px] bottom-[-0.08em] h-[0.95em] w-[2px] bg-current animate-pulse" />
          </span>
        )}
        <span className="opacity-0">{heading.slice(from + shown, to)}</span>
      </>
    );
  };

  const at = circled ? heading.indexOf(circled) : -1;
  if (at < 0) return <span aria-hidden="true">{part(0, heading.length)}</span>;
  const end = at + circled.length;
  return (
    <span aria-hidden="true">
      {part(0, at)}
      {/* The margin keeps the circle off the word before it. */}
      <Circle show={circle} tone="teal" className="ml-[0.25em]">
        {part(at, end)}
      </Circle>
      {end < heading.length && part(end, heading.length)}
    </span>
  );
}

// 2x2 grid beside each hobby. Shows photos when there are any. A slot with no
// picture yet is a wireframe: a pencil box with a cross, drawn the first time
// the row is seen.
function PhotoSlots({ photos = [], title }) {
  const slots = [0, 1, 2, 3];
  return (
    <Stage
      className="hidden sm:grid grid-cols-2 gap-5 w-[200px] shrink-0 self-start pt-2"
      aria-hidden={photos.length === 0}
    >
      {slots.map((i) =>
        photos[i] ? (
          <img
            key={i}
            src={photos[i]}
            alt={`${title}, ${i + 1} of ${photos.length}`}
            loading="lazy"
            className="w-full h-16 object-cover rounded-md"
          />
        ) : (
          <WireImage key={i} className="w-full h-16" at={150 + i * 120} />
        )
      )}
    </Stage>
  );
}

// A hobby's own photos, scattered like prints on a desk (Erica, 2026-11-21:
// "scatter the image and give them the same treatment as the hero image").
// Same treatment as the collage at the top: a white frame, a tilt, a soft
// shadow, each print lands like paper and lifts when hovered. No empty slots.
const TILT = [-4, 3, 2, -3, 4, -2, 3, -3];
const NUDGE = [0, 10, -4, 8, 2, 12, -2, 6];

function PhotoScatter({ photos, title, className = '', itemClass = '', start = 0, total = photos.length, align = 'justify-center', slide = 0 }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex flex-wrap ${align} ${className}`}>
      {photos.map((src, n) => {
        const i = start + n;
        const tilt = TILT[i % TILT.length];
        return (
          <motion.div
            key={src}
            variants={land(i)}
            initial={reduce ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`relative hover:z-10 ${itemClass}`}
            // `slide` pushes every print after the first to the right, toward
            // whatever sits beside the group.
            style={{ marginTop: NUDGE[i % NUDGE.length], marginRight: slide && n > 0 ? -slide : undefined }}
          >
            {/* The frame matches the family photos at the top: a rounded white
                border with a thin grey edge, and a rounded picture inside
                (Erica, 2026-11-21: "make sure the images have this treatment"). */}
            <motion.div
              className="bg-white p-[5px] rounded-[9px] border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ rotate: tilt }}
              whileHover={reduce ? undefined : { y: -6, rotate: tilt + 2, scale: 1.08 }}
              transition={{ duration: 0.3, ease }}
            >
              <img
                src={src}
                alt={`${title}, ${i + 1} of ${total}`}
                loading="lazy"
                className="block w-full aspect-[4/3] object-cover rounded-[5px]"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// How many prints sit beside the text. Any more go under it.
const BESIDE = 4;

function HobbyRow({ hobby }) {
  const hasPhotos = hobby.photos && hobby.photos.length > 0;
  // A hobby can set its own count with `beside`. An odd one out is centered.
  const beside = hobby.beside || BESIDE;
  const more = hasPhotos ? hobby.photos.slice(beside) : [];
  return (
    <Reveal>
      <article className="flex gap-4 sm:gap-6">
        <Stamp
          inView
          delay={0.25}
          className="shrink-0 w-12 text-3xl lg:text-4xl leading-none select-none drop-shadow-md pt-1"
        >
          <span className="block -rotate-6">{hobby.emoji}</span>
        </Stamp>
        <div className="flex-1 min-w-0">
          <h2 className="font-merriweather text-2xl lg:text-3xl font-normal text-surface-foreground200-light dark:text-surface-foreground100-dark">
            {hobby.title}
          </h2>
          <p className="mt-2 font-inter text-base leading-relaxed text-surface-foreground300-light dark:text-surface-foreground300-dark">
            {hobby.text}
          </p>
          {/* On a phone the prints go under the text. */}
          {hasPhotos && (
            <PhotoScatter photos={hobby.photos} title={hobby.title} className="sm:hidden mt-3 -ml-2" itemClass="w-[32%] -mx-[1%]" />
          )}
          {/* More than four: the rest go in the space under the text, so the
              side stack stays short (Erica, 2026-11-21). */}
          {more.length > 0 && (
            <PhotoScatter
              photos={more}
              title={hobby.title}
              start={beside}
              total={hobby.photos.length}
              // Right aligned, so they read as part of the stack beside them.
              align={hobby.moreStacked ? 'flex-col items-end' : 'justify-end'}
              // Moved over toward the stack (Erica, 2026-11-21: "move it over a
              // bit more"). A row tucks in under the stack's edge, and further
              // when the stack ends on one centered print. In a column, the
              // lower prints slide across to whatever is beside them.
              slide={hobby.moreStacked ? 78 : 0}
              className={`hidden sm:flex mt-4 ${hobby.moreStacked ? '-mr-2' : beside % 2 ? '-mr-[84px]' : '-mr-14'}`}
              itemClass="w-[122px] -mx-1"
            />
          )}
        </div>
        {hasPhotos ? (
          <PhotoScatter
            photos={hobby.photos.slice(0, beside)}
            title={hobby.title}
            total={hobby.photos.length}
            className="hidden sm:flex w-[230px] shrink-0 self-start -mt-1"
            itemClass="w-[52%] -mx-[2%]"
          />
        ) : (
          <PhotoSlots photos={hobby.photos} title={hobby.title} />
        )}
      </article>
    </Reveal>
  );
}

function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <div className="sk-canvas min-h-screen">
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        />

        <header className="relative max-w-[860px] mx-auto px-4 pt-8 lg:pt-14 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-inter underline underline-offset-2
              text-surface-foreground200-light dark:text-surface-foreground200-dark
              hover:text-surface-foreground100-light dark:hover:text-surface-foreground100-dark"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>

          {/* Photos on the left and the words on the right from 768px, where there
              is room for both (Erica, 2026-11-20). Stacked below that. */}
          <div className="mt-10 flex flex-col md:flex-row md:items-start gap-10 lg:gap-14 pl-6 md:pl-8 lg:pl-10">
            <PhotoCollage />

            <motion.div
              // Top aligned with the photos (Erica, 2026-11-20). The top padding
              // clears the "Hobbies..." label.
              className="relative max-w-md md:pt-12"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
            >
              {/* The arrow doodle that pointed here from the photos is gone (Erica, 2026-11-20). */}
              <h1 aria-label={intro.heading} className="text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground200-light dark:text-surface-foreground100-dark">
                <Title />
              </h1>
              <p className="mt-5 font-inter text-base lg:text-lg leading-relaxed text-surface-foreground300-light dark:text-surface-foreground300-dark">
                {intro.text}
              </p>
            </motion.div>
          </div>
        </header>
      </div>

      <main className="max-w-[860px] mx-auto px-4 pb-12">
        <div className="space-y-12 lg:space-y-16">
          {hobbies.map((hobby) => (
            <HobbyRow key={hobby.title} hobby={hobby} />
          ))}
        </div>
        <div className="h-40 lg:h-48" />
      </main>

      <FloatingNav show showHome />
    </div>
  );
}

export default AboutPage;
