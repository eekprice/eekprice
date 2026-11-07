import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { cursorLabels } from '../data/home';

// A Figma style cursor for the visitor: a purple arrow in place of the normal
// pointer, with a small tag beside it. Desktop only, since there's no pointer
// to follow on a phone.
//
// The tag is not persistent. It only appears once the mouse has been still
// for a moment, and it goes away again as soon as the mouse moves or after
// a few seconds, so it never trails across text being read.
//
// The arrow is pinned to the real mouse position (no lag, or clicks feel off).

const PAUSE_MS = 700; // how long the mouse has to rest before the tag shows
const LINGER_MS = 5000; // how long the tag stays up if the mouse stays put
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}

// Pick a line for this scroll depth, never the one shown last time.
function pickLine(progress, previous) {
  let group = cursorLabels[0];
  for (const step of cursorLabels) {
    if (progress >= step.at) group = step;
  }
  const options = group.lines.filter((line) => line !== previous);
  const pool = options.length ? options : group.lines;
  return pool[Math.floor(Math.random() * pool.length)];
}

function scrollDepth() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

function CursorTag() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [showTag, setShowTag] = useState(false);
  const [overLink, setOverLink] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!fine) return undefined;
    document.documentElement.classList.add('custom-cursor');

    let pauseTimer;
    let lingerTimer;
    const hide = () => {
      clearTimeout(pauseTimer);
      clearTimeout(lingerTimer);
      setShowTag(false);
    };
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setOverLink(!!e.target.closest?.('a, button, [role="button"], summary'));
      hide();
      pauseTimer = setTimeout(() => {
        setLabel((prev) => pickLine(scrollDepth(), prev));
        setShowTag(true);
        lingerTimer = setTimeout(() => setShowTag(false), LINGER_MS);
      }, PAUSE_MS);
    };
    const onLeave = hide;
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      clearTimeout(pauseTimer);
      clearTimeout(lingerTimer);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9000] overflow-hidden">
      {/* Arrow, glued to the mouse */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute w-6 h-6 -left-0.5 -top-0.5 drop-shadow-md"
        style={{ x, y }}
        animate={{ scale: overLink ? 1.15 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <path
          d="M5.5 3.2 19 11.4l-6.1 1.3-3.5 5.3z"
          className="fill-slate-900 dark:fill-slate-100 stroke-white dark:stroke-slate-900"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* The tag, only while the mouse rests */}
      <motion.span
        className="absolute left-4 top-5 px-2 py-0.5 rounded-md whitespace-nowrap
          bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-inter font-medium text-sm leading-snug shadow-md"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: showTag ? 1 : 0, scale: showTag ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

export default CursorTag;
