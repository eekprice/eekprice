import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { cursorLabels } from '../data/home';

// A Figma style cursor for the visitor: a purple arrow in place of the normal
// pointer, with a small name tag trailing just behind it. Desktop only, since
// there's no pointer to follow on a phone. The tag fades out after a few
// seconds of no movement so it never sits on top of something being read.
//
// The arrow is pinned to the real mouse position (no lag, or clicks feel
// off). The tag follows on a spring so it drifts in a little behind.

const IDLE_MS = 2500;
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

function labelFor(progress) {
  let label = cursorLabels[0].text;
  for (const step of cursorLabels) {
    if (progress >= step.at) label = step.text;
  }
  return label;
}

function CursorTag() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = reduce ? { stiffness: 1000, damping: 100 } : { stiffness: 400, damping: 32, mass: 0.6 };
  const tagX = useSpring(x, spring);
  const tagY = useSpring(y, spring);
  const [active, setActive] = useState(false);
  const [overLink, setOverLink] = useState(false);
  const [label, setLabel] = useState(cursorLabels[0].text);

  useEffect(() => {
    if (!fine) return undefined;
    document.documentElement.classList.add('custom-cursor');

    let idleTimer;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
      setOverLink(!!e.target.closest?.('a, button, [role="button"], summary'));
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setActive(false), IDLE_MS);
    };
    const onLeave = () => setActive(false);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setLabel(labelFor(max > 0 ? window.scrollY / max : 0));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
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
        animate={{ scale: overLink ? 1.15 : 1, opacity: active ? 1 : 0.85 }}
        transition={{ duration: 0.15 }}
      >
        <path
          d="M5.5 3.2 19 11.4l-6.1 1.3-3.5 5.3z"
          className="fill-violet-500"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Name tag, trailing on a spring */}
      <motion.span
        className="absolute left-4 top-5 px-2 py-0.5 rounded-md whitespace-nowrap
          bg-violet-500 text-white font-inter font-medium text-sm leading-snug shadow-md"
        style={{ x: tagX, y: tagY }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

export default CursorTag;
