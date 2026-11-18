import { useEffect, useState } from 'react';

// Which of the elements matching `selector` has the most of itself on screen
// right now. Returns that element's `data-in-view-key`, or null when none of
// them shows at least `min` pixels. `ready` is for elements that mount late:
// flip it when they arrive and the hook measures again.
export default function useMostInView(selector, { min = 160, ready = true } = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!ready) return undefined;
    let frame = 0;

    const measure = () => {
      frame = 0;
      let best = null;
      let bestShown = min;
      document.querySelectorAll(selector).forEach((el) => {
        const r = el.getBoundingClientRect();
        const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        if (shown > bestShown) {
          bestShown = shown;
          best = el.dataset.inViewKey;
        }
      });
      setActive(best);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    // Once more after things have settled into place.
    const settle = setTimeout(measure, 700);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [selector, min, ready]);

  return active;
}
