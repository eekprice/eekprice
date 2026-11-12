import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactComponent as HeroDoodle } from '../assets/doodle.svg';
import { ReactComponent as ArrowSvg } from '../assets/Arrow.svg';
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
import FloatingNav from '../components/FloatingNav';
import { intro, hobbies } from '../data/about';

// From the design system: the page sits on the dot grid, the photos land like
// paper, the stickers and emoji pop, one word in the title gets circled, and
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

  return (
    <div className="relative w-[260px] sm:w-[300px] shrink-0 mx-auto lg:mx-0">
      {/* A marker word, so it is set in handwriting. */}
      <div className="-ml-6 mb-1" aria-hidden="true">
        <p className="sk-scribble" style={{ transformOrigin: 'left bottom' }}>
          {intro.kicker}
        </p>
      </div>

      <Stamp className="absolute left-[42%] top-7 w-9 h-9 z-10" delay={0.7}>
        <StarSvg className="w-full h-full" />
      </Stamp>
      <Stamp className="absolute left-[52%] top-12 w-9 h-9 z-10" delay={0.8}>
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

      <Stamp className="absolute -left-8 -bottom-7 w-12 h-12" delay={0.9}>
        <StarsSvg className={`w-full h-full ${ink}`} />
      </Stamp>
    </div>
  );
}

// The page title, with one word circled in red marker. Which word is set in
// the copy file (`intro.circled`). Without it the title is plain.
function Title({ delay }) {
  const { heading, circled } = intro;
  const at = circled ? heading.indexOf(circled) : -1;
  if (at < 0) return heading;
  return (
    <>
      {heading.slice(0, at)}
      {/* The margin keeps the circle off the word before it. */}
      <Circle delay={delay} className="ml-[0.25em]">
        {circled}
      </Circle>
      {heading.slice(at + circled.length)}
    </>
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
            alt={`${title}, ${i + 1} of 4`}
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

function HobbyRow({ hobby }) {
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
        </div>
        <PhotoSlots photos={hobby.photos} title={hobby.title} />
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

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14 pl-6 lg:pl-10">
            <PhotoCollage />

            <motion.div
              className="relative max-w-md"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
            >
              <Stamp className="hidden lg:block absolute -left-12 -top-10 w-12 h-12" delay={1}>
                <ArrowSvg
                  className="w-full h-full rotate-[60deg] text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current"
                />
              </Stamp>
              <h1 className="text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground200-light dark:text-surface-foreground100-dark">
                <Title delay={reduce ? 0 : 750} />
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
