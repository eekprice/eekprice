import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// The hand-drawn layer from the portfolio design system, as React pieces.
// Each one is a thin wrapper around the system's markup. The look and the
// motion are the sk- classes in styles/sketch.css.
//
// How motion works: a stroke with the class sk-draw draws itself when an
// ancestor has the class is-in. <Stage> adds is-in the first time it is seen.
// Marks carry is-in themselves, so they draw as soon as they mount.

// The two SVG filters every frame points at. Render once, near the app root.
// sk-rough gives straight strokes a hand wobble. sk-boil is the same filter
// with a stepping seed, swapped in while the pointer is on something clickable.
export function SketchDefs() {
  return (
    <>
      <svg className="sk-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="sk-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sk-boil" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" result="n">
              <animate attributeName="seed" values="4;11;23;4" dur="0.36s" calcMode="discrete" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {/* Inline on purpose: a url(#id) in a linked stylesheet can resolve against the stylesheet. */}
      <style>
        {'@media (prefers-reduced-motion: no-preference){.sk-boil:hover .sk-frame>g,.sk-boil:focus-visible .sk-frame>g{filter:url(#sk-boil)}}'}
      </style>
    </>
  );
}

// Adds is-in the first time the element is seen. Pass `play` to control it
// yourself instead. Until then, pen lines inside are undrawn and risers hidden.
// It forwards its ref, so it can stand in for an element that already has one.
export const Stage = React.forwardRef(function Stage(
  { as: Tag = 'div', className = '', play, amount = 0.2, children, ...rest },
  outerRef
) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const controlled = play !== undefined;
  const setRef = (node) => {
    ref.current = node;
    if (typeof outerRef === 'function') outerRef(node);
    else if (outerRef) outerRef.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (controlled || seen || !node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: amount }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controlled, seen, amount]);

  const on = controlled ? play : seen;
  return (
    <Tag ref={setRef} className={`sk-stage ${on ? 'is-in ' : ''}${className}`} {...rest}>
      {children}
    </Tag>
  );
});

const inkClass = (tone) => `sk-ink sk-draw${tone === 'pencil' ? ' sk-ink--pen sk-ink--grey' : ''}`;

// A box drawn with four strokes that cross a little past each corner.
// The parent needs position: relative (class sk-framed). tone="pencil" for placeholders.
export function Frame({ tone }) {
  const ink = inkClass(tone);
  return (
    <svg className="sk-frame" aria-hidden="true" focusable="false">
      <g filter="url(#sk-rough)">
        <line className={`${ink} sk-s1`} pathLength="1" x1="0" y1="6.9" x2="100%" y2="5.2" />
        <svg x="100%">
          <line className={`${ink} sk-s2`} pathLength="1" x1="-5.3" y1="0" x2="-6.8" y2="100%" />
        </svg>
        <svg y="100%">
          <line className={`${ink} sk-s3`} pathLength="1" x1="100%" y1="-6.9" x2="0" y2="-5.3" />
        </svg>
        <line className={`${ink} sk-s4`} pathLength="1" x1="6.8" y1="100%" x2="5.3" y2="0" />
      </g>
    </svg>
  );
}

// One closed stroke, for controls. The parent needs position: relative.
export function Loop({ rx = 6 }) {
  return (
    <svg className="sk-frame sk-frame--loop" aria-hidden="true" focusable="false">
      <g filter="url(#sk-rough)">
        <rect className="sk-ink sk-ink--pen sk-draw" pathLength="1" width="100%" height="100%" rx={rx} />
      </g>
    </svg>
  );
}

const TONES = { teal: ' sk-ink--teal', red: ' sk-ink--red', grey: ' sk-ink--grey', green: ' sk-ink--green' };

// Where each line of wrapped text sits inside its box, so a mark can follow
// the text line by line. `textRef` is the inline element around the words,
// `boxRef` the block the marks are placed in.
function useTextLines(boxRef, textRef, on) {
  const [lines, setLines] = useState([]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!on || !box || !text) return undefined;

    const measure = () => {
      const frame = box.getBoundingClientRect();
      const found = [];
      // An inline element reports one rect per line it wraps onto.
      Array.from(text.getClientRects()).forEach((r) => {
        if (!r.width) return;
        const last = found[found.length - 1];
        if (last && Math.abs(last.bottom - r.bottom) < r.height / 2) {
          last.left = Math.min(last.left, r.left);
          last.right = Math.max(last.right, r.right);
        } else {
          found.push({ left: r.left, right: r.right, bottom: r.bottom });
        }
      });
      const next = found.map((l) => ({
        left: Math.round(l.left - frame.left),
        top: Math.round(l.bottom - frame.top),
        width: Math.round(l.right - l.left),
      }));
      setLines((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };

    measure();
    const observer = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
    if (observer) observer.observe(box);
    // A late web font changes the line widths without resizing the box.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => {
      if (observer) observer.disconnect();
    };
  }, [boxRef, textRef, on]);

  return lines;
}

const UNDERLINE = {
  plain: { box: '0 0 200 8', d: 'M2 5.2 C 24 2.6, 46 6.4, 74 4.2 S 128 2.4, 156 4.6 S 188 5.4, 198 3.4' },
  bold: { box: '0 0 200 12', d: 'M3 4.6 C 50 2.2, 130 3.2, 197 3.8 C 150 6.2, 70 7.6, 20 9.6' },
};

// A pen underline under its children. It draws when `show` turns true.
// `bold` is the double pass for a page title. `wrap` lets the text wrap, with
// one stroke under the whole block. `lines` is for a heading that may wrap:
// it measures the text and draws one stroke under each line, one after the
// other. A title on two lines or more gets the single pass, so the strokes
// stay clear of the line below.
export function Underline({
  children,
  show = true,
  bold = false,
  tone,
  delay = 0,
  wrap = false,
  lines = false,
  className = '',
}) {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const measured = useTextLines(boxRef, textRef, lines);

  if (lines) {
    const many = measured.length > 1;
    const heavy = bold && !many;
    const shape = heavy ? UNDERLINE.bold : UNDERLINE.plain;
    const ink = `sk-ink sk-draw${heavy ? ' sk-ink--bold' : ''}${TONES[tone] || ''}`;
    return (
      <span
        ref={boxRef}
        className={`sk-mark sk-mark--underline sk-mark--lines is-in${heavy ? ' sk-mark--bold' : ''} ${className}`}
      >
        <span ref={textRef}>{children}</span>
        {show &&
          measured.map((line, i) => (
            <svg
              key={i}
              viewBox={shape.box}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              style={{
                left: Math.round(line.left - line.width * 0.02),
                top: line.top - (many ? 5 : 2),
                bottom: 'auto',
                width: Math.round(line.width * 1.04),
              }}
            >
              <path className={ink} pathLength="1" style={{ '--sk-delay': `${delay + i * 250}ms` }} d={shape.d} />
            </svg>
          ))}
      </span>
    );
  }

  const shape = bold ? UNDERLINE.bold : UNDERLINE.plain;
  const ink = `sk-ink sk-draw${bold ? ' sk-ink--bold' : ''}${TONES[tone] || ''}`;
  return (
    <span className={`sk-mark sk-mark--underline is-in${bold ? ' sk-mark--bold' : ''}${wrap ? ' sk-mark--wrap' : ''} ${className}`}>
      {children}
      {show && (
        <svg viewBox={shape.box} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className={ink} pathLength="1" style={{ '--sk-delay': `${delay}ms` }} d={shape.d} />
        </svg>
      )}
    </span>
  );
}

// A pen circle around its children, for the one thing on a screen worth
// circling. It draws when `show` turns true, after `delay` ms.
export function Circle({ children, show = true, tone = 'red', delay = 0, className = '' }) {
  return (
    <span className={`sk-mark sk-mark--circle is-in ${className}`}>
      {children}
      {show && (
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path
            className={`sk-ink sk-ink--bold sk-draw${TONES[tone] || ''}`}
            pathLength="1"
            style={{ '--sk-delay': `${delay}ms` }}
            d="M118 7 C 70 3, 14 12, 8 38 C 3 62, 52 76, 104 75 C 156 74, 196 62, 193 38 C 190 14, 140 6, 92 8 C 78 8.6, 66 10.4, 56 13"
          />
        </svg>
      )}
    </span>
  );
}

// The pencil cross that stands in for an image.
function Cross() {
  return (
    <svg className="sk-wire__cross" aria-hidden="true" focusable="false">
      <g filter="url(#sk-rough)">
        <line className={inkClass('pencil')} pathLength="1" x1="3%" y1="4%" x2="97%" y2="96%" />
        <line className={inkClass('pencil')} pathLength="1" x1="97%" y1="4%" x2="3%" y2="96%" />
      </g>
    </svg>
  );
}

// A wireframe block: a pencil frame, squiggle lines where text goes, and a
// crossed box where an image goes. `at` is when its sketch starts, in ms.
// `row` is the wide card: image on the left, lines on the right. It stacks
// on a phone, the same way the card does.
export function WireBlock({ lines = [38, 82, 64], image = true, at = 0, row = false, className = '' }) {
  const squiggle = (width, i) => <span key={i} className="sk-squiggle" style={{ width: `${width}%` }} />;
  const picture = image && (
    <div className="sk-wire__image">
      <Cross />
    </div>
  );
  const [title, ...rest] = lines;

  return (
    <div
      className={`sk-wire sk-framed ${row ? 'sk-wire--row ' : ''}${className}`}
      style={{ '--sk-at': `${at}ms` }}
      aria-hidden="true"
    >
      <Frame tone="pencil" />
      {row ? (
        <>
          {picture}
          <div className="sk-wire__lines">{lines.map(squiggle)}</div>
        </>
      ) : (
        <>
          {title != null && squiggle(title, 'title')}
          {picture}
          {rest.map(squiggle)}
        </>
      )}
    </div>
  );
}

// One crossed box on its own, where a photo will go. Size it with `className`.
export function WireImage({ at = 0, className = '' }) {
  return (
    <span className={`sk-wire-image sk-framed ${className}`} style={{ '--sk-at': `${at}ms` }} aria-hidden="true">
      <Frame tone="pencil" />
      <Cross />
    </span>
  );
}

// Wire to real: a wireframe sketches itself at the size of the content, holds,
// then fades out while the real content rises in. Put it inside a <Stage>.
// `wire` shapes the sketch so it can match the content's layout: either
// options for a WireBlock, or a ready-made element when the content needs its
// own drawing. With reduced motion on, the real content is simply there.
export function Swap({ children, at = 0, hold = 1500, wire = {}, className = '' }) {
  return (
    <div className={`sk-swap ${className}`} style={{ '--sk-at': `${at}ms`, '--sk-hold': `${hold}ms` }}>
      <div className="sk-swap__wire" aria-hidden="true">
        {React.isValidElement(wire) ? wire : <WireBlock {...wire} className="h-full" />}
      </div>
      <div className="sk-swap__real h-full">{children}</div>
    </div>
  );
}
