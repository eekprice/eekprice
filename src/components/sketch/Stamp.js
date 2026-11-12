import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// A sticker, doodle or emoji. From the design system: stamps pop in (scale 0,
// 1.2, 0.9, 1.1, 1 with a wobble), and on hover they grow a little and turn.
// `delay` is in seconds. `inView` waits until it is scrolled to; without it
// the stamp pops when the page loads. Decorative, so hidden from screen
// readers. Position and size it with `className`.
function Stamp({ children, className = '', delay = 0, inView = false }) {
  const reduce = useReducedMotion();
  const popped = {
    opacity: [0, 1, 1, 1, 1],
    scale: [0, 1.2, 0.9, 1.1, 1],
    rotate: [0, -10, 5, -7, 0],
  };
  const play = inView
    ? { whileInView: popped, viewport: { once: true, amount: 0.6 } }
    : { animate: popped };

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      {...(reduce ? {} : play)}
    >
      <span className="block h-full w-full transition-transform duration-200 ease-out motion-safe:hover:scale-110 motion-safe:hover:-rotate-[10deg]">
        {children}
      </span>
    </motion.span>
  );
}

export default Stamp;
