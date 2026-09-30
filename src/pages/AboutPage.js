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
import FloatingNav from '../components/FloatingNav';
import { intro, hobbies } from '../data/about';

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
  return (
    <div className="relative w-[260px] sm:w-[300px] shrink-0 mx-auto lg:mx-0">
      <p
        className="font-merriweather text-2xl lg:text-3xl text-surface-foreground200-light dark:text-surface-foreground200-dark -ml-6 mb-1"
        style={{ transform: 'rotate(-8deg)', transformOrigin: 'left bottom' }}
        aria-hidden="true"
      >
        {intro.kicker}
      </p>
      <StarSvg className="absolute left-[42%] top-7 w-9 h-9 z-10" aria-hidden="true" />
      <HeartSvg className="absolute left-[52%] top-12 w-9 h-9 z-10 drop-shadow-md" aria-hidden="true" />
      <div className="grid grid-cols-2 gap-2">
        {collage.map((photo, i) => (
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="w-full h-auto drop-shadow-md"
            style={{ rotate: photo.rotate }}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 + i * 0.1 }}
            whileHover={reduce ? undefined : { scale: 1.04, rotate: 0 }}
          />
        ))}
      </div>
      <StarsSvg
        className="absolute -left-8 -bottom-7 w-12 h-12 text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current"
        aria-hidden="true"
      />
    </div>
  );
}

// 2x2 grid beside each hobby. Shows photos when there are any; the rest are
// the purple tiles from the Figma, waiting for pictures.
function PhotoSlots({ photos = [], title }) {
  const slots = [0, 1, 2, 3];
  return (
    <div className="hidden sm:grid grid-cols-2 gap-3 w-[200px] shrink-0 self-start" aria-hidden={photos.length === 0}>
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
          <span key={i} className="block w-full h-16 rounded-md bg-purple-200 dark:bg-purple-900/60" />
        )
      )}
    </div>
  );
}

function HobbyRow({ hobby }) {
  return (
    <Reveal>
      <article className="flex gap-4 sm:gap-6">
        <span
          aria-hidden="true"
          className="shrink-0 w-12 text-3xl lg:text-4xl leading-none select-none drop-shadow-md pt-1"
          style={{ transform: 'rotate(-6deg)' }}
        >
          {hobby.emoji}
        </span>
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
    <>
      <div className="relative w-full overflow-hidden">
        <HeroDoodle
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-[720px] max-w-none text-surface-foreground100-light dark:text-surface-foreground100-dark pointer-events-none"
          style={{ opacity: 0.08 }}
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
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <ArrowSvg
                className="hidden lg:block absolute -left-12 -top-10 w-12 h-12 rotate-[60deg] text-surface-foreground100-light dark:text-surface-foreground100-dark [&>path]:fill-current"
                aria-hidden="true"
              />
              <h1 className="text-3xl lg:text-5xl font-merriweather font-light leading-tight text-surface-foreground200-light dark:text-surface-foreground100-dark">
                {intro.heading}
              </h1>
              <p className="mt-4 font-inter text-base lg:text-lg leading-relaxed text-surface-foreground300-light dark:text-surface-foreground300-dark">
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

      <FloatingNav show showProfileInNav />
    </>
  );
}

export default AboutPage;
