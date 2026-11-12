// The design system's entrances as framer-motion presets. The CSS versions
// are the sk- classes in styles/sketch.css.

export const ease = [0.22, 1, 0.36, 1];

// Paper lands: a note drops in from above, a bit large and turned, and
// settles with a spring. `order` staggers siblings that arrive together.
// Use as `variants`, with `initial="hidden"` and `whileInView="visible"`.
export const land = (order = 0) => ({
  hidden: { opacity: 0, y: -28, rotate: -7, scale: 1.12 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 18, delay: order * 0.08 },
  },
});
