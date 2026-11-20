import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsPhone } from '../../hooks/useMediaQuery';
import Button from '../Button';
import { focusRingClass } from '../atoms/NavItem';

// Horizontal strip of slides, after LinkedIn's carousel posts. On phones every
// slide is 85vw wide and snaps, so the next one peeks in from the right as a
// hint to swipe. From 640px up each slide keeps its own designed width, so
// nothing gets stretched on a tablet or a narrow window.
//
// Ways to move it (Erica, 2026-11-19, after a Mobbin review; references are
// under "Slide cards" in Canon/design-references.md):
//   - arrows and dots in a row under the strip (dots only on a phone)
//   - left and right arrow keys, Home and End, once the strip has focus
//   - a click on a slide that is cut off at the edge brings it in
//   - dragging with a mouse
//   - a swipe or a trackpad, as before

// Where slides run off the side of the strip they blur out. No white wash over
// the slide: two blur layers, a wide light one and a narrow stronger one, each
// masked so it fades toward the middle. The blur builds up toward the edge.
// They are kept narrow, about the width of the strip's side padding, so a
// slide that is sitting still stays sharp and only what is leaving gets soft.
const SIDE = {
  left: { at: 'left-0', mask: 'linear-gradient(to right, black, transparent)' },
  right: { at: 'right-0', mask: 'linear-gradient(to left, black, transparent)' },
};

const fade = 'linear-gradient(to right, transparent, black var(--edge), black calc(100% - var(--edge)), transparent)';
const EDGE_FADE = { WebkitMaskImage: fade, maskImage: fade };

function EdgeBlur({ side }) {
  const { at, mask } = SIDE[side];
  const style = { WebkitMaskImage: mask, maskImage: mask };
  const base = `absolute inset-y-0 ${at} pointer-events-none`;
  return (
    <>
      <div aria-hidden="true" className={`${base} w-8 lg:w-12 backdrop-blur-[2px]`} style={style} />
      <div aria-hidden="true" className={`${base} w-4 lg:w-6 backdrop-blur-[6px]`} style={style} />
    </>
  );
}

const Chevron = ({ flip = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const DRAG_START = 5; // px the mouse has to move before a press counts as a drag
const NUDGE = 28; // px the strip slides, once, the first time it is seen
const sameList = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

// `label` names the strip for screen readers: the case study's title.
const CaseStudySlides = ({ slides, heightClass = 'h-64', label }) => {
  const scrollContainerRef = useRef(null);
  const isPhone = useIsPhone();
  const reduce = useReducedMotion();
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(true);
  // The places the strip can come to rest, as scroll positions: one for each
  // slide, less any at the end that are already on screen when the strip is
  // scrolled all the way. Each one gets a dot.
  const [stops, setStops] = useState([0]);
  const [index, setIndex] = useState(0);
  // Slides that are partly off the side. A click on one brings it in.
  const [cut, setCut] = useState([]);
  const [nudged, setNudged] = useState(false);
  const drag = useRef(null);
  const skipClick = useRef(false);

  const measure = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const max = Math.max(0, scrollWidth - clientWidth);
    const pad = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    setShowLeftOverlay(scrollLeft > 4);
    setShowRightOverlay(scrollLeft < max - 4);

    const items = [...container.children];
    const next = [];
    items.forEach((el) => {
      const at = Math.min(Math.max(0, el.offsetLeft - pad), max);
      if (!next.length || at - next[next.length - 1] > 2) next.push(Math.round(at));
    });
    if (!next.length) next.push(0);
    setStops((prev) => (sameList(prev, next) ? prev : next));

    let nearest = 0;
    next.forEach((at, i) => {
      if (Math.abs(at - scrollLeft) < Math.abs(next[nearest] - scrollLeft)) nearest = i;
    });
    setIndex(nearest);

    const hidden = [];
    items.forEach((el, i) => {
      const left = el.offsetLeft - scrollLeft;
      if (left < -8 || left + el.offsetWidth > clientWidth + 8) hidden.push(i);
    });
    setCut((prev) => (sameList(prev, hidden) ? prev : hidden));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;
    container.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    return () => {
      container.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure, slides.length, isPhone]);

  const scrollToLeft = useCallback(
    (left) => {
      scrollContainerRef.current?.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    },
    [reduce]
  );
  const goTo = (i) => scrollToLeft(stops[Math.max(0, Math.min(stops.length - 1, i))]);

  // The first time the strip is on screen it slides a little and settles back,
  // to show it moves. Not on phones, where the next slide already peeks in.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || reduce || isPhone || typeof IntersectionObserver === 'undefined') return undefined;
    let timer;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        if (container.scrollLeft > 0 || container.scrollWidth <= container.clientWidth) return;
        // The slides shift, the strip does not scroll: a real scroll gets
        // caught by snapping and can leave the strip on the second slide.
        setNudged(true);
        timer = setTimeout(() => setNudged(false), 380);
      },
      { threshold: 0.7 }
    );
    seen.observe(container);
    return () => {
      seen.disconnect();
      clearTimeout(timer);
    };
  }, [reduce, isPhone]);

  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: stops.length - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    goTo(moves[e.key]);
  };

  // Dragging with a mouse. Touch and trackpads scroll the strip themselves.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const container = e.currentTarget;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_START) return;
      d.moved = true;
      container.setPointerCapture?.(e.pointerId);
      // Snapping would pull against the hand, and a drag should not select text.
      container.style.scrollSnapType = 'none';
      container.style.userSelect = 'none';
      window.getSelection?.()?.removeAllRanges();
    }
    container.scrollLeft = d.left - dx;
  };
  const endDrag = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    const container = e.currentTarget;
    container.releasePointerCapture?.(e.pointerId);
    container.style.userSelect = '';
    // Let go: settle on the nearest stop, then give snapping back.
    const left = container.scrollLeft;
    const nearest = stops.reduce((a, b) => (Math.abs(b - left) < Math.abs(a - left) ? b : a), stops[0]);
    scrollToLeft(nearest);
    setTimeout(() => {
      container.style.scrollSnapType = '';
    }, 400);
    // The click that follows a drag is not a click on the slide.
    skipClick.current = true;
    setTimeout(() => {
      skipClick.current = false;
    }, 0);
  };

  const onSlideClick = (e, i) => {
    if (skipClick.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!cut.includes(i)) return;
    // A slide that is cut off comes into view first. Its own link waits.
    e.preventDefault();
    e.stopPropagation();
    const container = scrollContainerRef.current;
    const el = container.children[i];
    const pad = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const startsAt = el.offsetLeft - pad;
    // Off the right: just far enough to show all of it, if it fits. Off the left: its start.
    const fits = el.offsetWidth + pad * 2 <= container.clientWidth;
    const offRight = el.offsetLeft - container.scrollLeft + el.offsetWidth > container.clientWidth;
    scrollToLeft(offRight && fits ? el.offsetLeft + el.offsetWidth + pad - container.clientWidth : startsAt);
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hasStops = stops.length > 1;

  return (
    <motion.div
      className="max-w-[1200px] mx-auto pb-1 lg:pb-2"
      initial="hidden"
      animate="visible"
      variants={slideVariants}
    >
      <div className="relative">
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label={label ? `${label}: slides` : 'Slides'}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(e) => e.preventDefault()}
          // One slide width on phones, so it snaps hard. Two widths from 640px
          // up, where a softer snap keeps it from jumping further than meant.
          className={`flex gap-3 lg:gap-4 overflow-x-auto snap-x ${isPhone ? 'snap-mandatory' : 'snap-proximity'}
            scroll-px-3 lg:scroll-px-4 px-3 lg:px-4 py-3 rounded-xl
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [--edge:12px] lg:[--edge:16px]
            ${focusRingClass}`}
          // Inside the side padding the slides also thin out to nothing, so
          // there is no hard cut where the strip ends.
          style={EDGE_FADE}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              onClickCapture={(e) => onSlideClick(e, i)}
              className={`${isPhone ? 'w-[85vw]' : `${slide.width || 'w-64'} max-w-full`} ${heightClass} shrink-0 snap-start rounded-xl
                transition-transform duration-300 ease-out ${cut.includes(i) ? 'cursor-pointer' : ''}`}
              style={nudged ? { transform: `translateX(-${NUDGE}px)` } : undefined}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {showLeftOverlay && <EdgeBlur side="left" />}
        {showRightOverlay && <EdgeBlur side="right" />}
      </div>

      {/* Arrows and dots, in one row under the strip so nothing sits on the
          slides. Phones get the dots only: a swipe is the control there. */}
      {hasStops && (
        <div data-no-open className="mt-1 flex items-center justify-center gap-2 cursor-default">
          {!isPhone && (
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous slide"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              <Chevron flip />
            </Button>
          )}
          <div role="group" aria-label="Slides" className="flex items-center">
            {stops.map((at, i) => (
              <button
                key={at}
                type="button"
                aria-label={`Go to slide ${i + 1} of ${stops.length}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
                className={`group/dot h-6 px-1 inline-flex items-center justify-center rounded-full cursor-pointer ${focusRingClass}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-5 bg-primary-foreground-light dark:bg-primary-foreground-dark'
                      : 'w-1.5 bg-slate-300 dark:bg-slate-600 group-hover/dot:bg-slate-400 dark:group-hover/dot:bg-slate-500'
                  }`}
                />
              </button>
            ))}
          </div>
          {!isPhone && (
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next slide"
              disabled={index === stops.length - 1}
              onClick={() => goTo(index + 1)}
            >
              <Chevron />
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CaseStudySlides;
