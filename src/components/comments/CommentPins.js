import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button from '../Button';
import { openingSeen } from '../../data/opening';

// Comment pins, like the ones on a Figma or FigJam board. A row of small
// bubbles with an avatar in each. Every pin holds one comment.
//
//   Posted    Pins arrive one at a time, the way they do when someone posts.
//             A pin grows from its tip with its preview open (name, time, the
//             first words), holds, then tucks in to just the avatar.
//   Peek      Hover or keyboard focus opens the preview again.
//   Read      A click opens the comment in a card beside the pins. It is read
//             only: there is no reply box, and nothing to type in.
//
// With reduced motion on, the pins are simply there.
//
// `comments` is a list of { id, preview, body, link }. `link` is optional:
// { to, label }, a page on this site with more, shown as a button under the comment.
// `meta` is { author, time, title }.
// `show` starts the posting. `onOpen(index)` fires each time a comment is opened.

// When things happen, in ms after `show` turns true. Change the pace here.
const POST = {
  first: 300, // the first pin is posted
  hold: 1100, // how long a new pin keeps its preview open
  gap: 150, // the pause before the next pin is posted
};

const ease = [0.22, 1, 0.36, 1];

// Where the open comment may sit, in px.
const GAP = 10; // between the pins and the card
const EDGE = 16; // closest it gets to the side of the screen
const NAV = 132; // room kept clear at the bottom for the floating nav

// Put the card beside the pins when there is room (desktop), and under or over
// them when there is not (phones). Answers in the row's own coordinates.
function placeCard(row, card) {
  const viewWidth = document.documentElement.clientWidth;
  const viewHeight = window.innerHeight;
  const pins = row.getBoundingClientRect();
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  let left;
  let top;
  let origin;

  if (pins.right + GAP + width <= viewWidth - EDGE) {
    left = pins.right + GAP;
    top = Math.max(EDGE, Math.min(pins.top, viewHeight - NAV - height));
    origin = 'left center';
  } else {
    left = Math.max(EDGE, Math.min(pins.left, viewWidth - EDGE - width));
    const below = pins.bottom + GAP;
    const above = pins.top - GAP - height;
    const useBelow = below + height <= viewHeight - NAV || above < EDGE;
    top = useBelow ? below : above;
    origin = useBelow ? 'top left' : 'bottom left';
  }

  return { left: left - pins.left, top: top - pins.top, origin };
}

const Avatar = ({ author, className = '' }) => (
  <span
    aria-hidden="true"
    className={`grid place-items-center shrink-0 rounded-full bg-teal-700 text-white font-inter font-medium ${className}`}
  >
    {author.charAt(0)}
  </span>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 6l6 6-6 6" />
  </svg>
);

// The bubble: round, with one sharp corner at the bottom left, the tip.
const BUBBLE = 'rounded-[calc(var(--pin)/2)] rounded-bl-[4px]';
const CLIP_ROUND = 'round calc(var(--pin) / 2) calc(var(--pin) / 2) calc(var(--pin) / 2) 4px';
const CLIP = {
  open: `inset(0px 0px 0px 0px ${CLIP_ROUND})`,
  tucked: `inset(0px calc(100% - var(--pin)) 0px 0px ${CLIP_ROUND})`,
};

function Pin({ comment, meta, isOpen, peeking, controls, reduce, buttonRef, onPress, onPeek }) {
  return (
    // The pin's footprint is the tucked bubble. The preview opens over
    // whatever is to its right, so nothing on the page moves.
    <motion.span
      className="relative block w-[var(--pin)] h-[var(--pin)]"
      style={{ transformOrigin: 'bottom left', zIndex: peeking ? 1 : 0 }}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
    >
      <span className="pointer-events-none absolute left-0 bottom-0 block h-full w-max drop-shadow-md">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? controls : undefined}
          onClick={onPress}
          onPointerEnter={(e) => e.pointerType === 'mouse' && onPeek(true)}
          onPointerLeave={() => onPeek(false)}
          onFocus={(e) => e.currentTarget.matches(':focus-visible') && onPeek(true)}
          onBlur={() => onPeek(false)}
          // White in both themes, like the white edge on the star and heart.
          // In dark mode a dark bubble would vanish into the tinted box.
          className={`peer pointer-events-auto flex h-full items-center gap-2 pl-1.5 pr-4 text-left outline-none ${BUBBLE}
            bg-white transition-[clip-path] duration-200 ease-out motion-reduce:transition-none`}
          style={{ clipPath: peeking ? CLIP.open : CLIP.tucked }}
        >
          <Avatar author={meta.author} className="w-8 h-8 text-sm" />
          <span className="flex flex-col min-w-0 max-w-[13rem] font-inter text-xs leading-snug">
            <span className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="sr-only">Comment from</span>
              <span className="font-semibold text-slate-800">{meta.author}</span>
              <span className="text-slate-600">{meta.time}</span>
            </span>
            <span className="truncate text-slate-900">{comment.preview}</span>
          </span>
        </button>
        {/* The edge. Blue while its comment is open (selected), the focus ring for the keyboard.
            The button clips itself, so a ring on the button would be cut off. */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 h-full ${BUBBLE} ${
            isOpen ? 'ring-2 ring-blockHighlight-outlineSurface-light dark:ring-blockHighlight-outlineSurface-dark' : ''
          }
            peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2
            peer-focus-visible:ring-primary-foreground-light dark:peer-focus-visible:ring-primary-foreground-dark
            peer-focus-visible:ring-offset-backdrop-background-light dark:peer-focus-visible:ring-offset-backdrop-background-dark`}
          style={{ width: peeking ? '100%' : 'var(--pin)' }}
        />
      </span>
    </motion.span>
  );
}

function Card({ id, comment, meta, rowRef, reduce, onClose }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState(null);

  useLayoutEffect(() => {
    const place = () => {
      if (rowRef.current && ref.current) setSpot(placeCard(rowRef.current, ref.current));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [rowRef]);

  // Once the card is in its spot: move focus into it so a screen reader starts
  // reading it, and bring it on screen if part of it landed outside.
  const placed = spot !== null;
  useEffect(() => {
    const node = ref.current;
    if (!placed || !node) return;
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }, [placed, reduce]);

  return (
    <motion.div
      ref={ref}
      id={id}
      role="dialog"
      aria-label={`${meta.title} from ${meta.author}`}
      tabIndex={-1}
      className="absolute w-[min(22.5rem,calc(100vw-2rem))] scroll-mt-4 scroll-mb-24 rounded-2xl border shadow-lg text-left outline-none
        bg-surface-background100-light dark:bg-surface-background100-dark
        border-surface-outline-light dark:border-surface-outline-dark"
      style={{
        left: spot ? spot.left : 0,
        top: spot ? spot.top : 0,
        visibility: spot ? 'visible' : 'hidden',
        transformOrigin: spot ? spot.origin : undefined,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease }}
    >
      <div className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-surface-outline-light dark:border-surface-outline-dark">
        <p className="font-inter text-sm font-semibold text-surface-foreground100-light dark:text-surface-foreground100-dark">
          {meta.title}
        </p>
        <Button variant="ghost" size="icon-sm" aria-label="Close comment" onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      {/* More room under the words than beside them, so the card does not end on the last line. */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-6">
        <Avatar author={meta.author} className="w-8 h-8 text-sm" />
        <div className="min-w-0 font-inter">
          <p className="flex items-baseline gap-2 min-h-8 pt-1.5">
            <span className="text-sm font-semibold text-surface-foreground100-light dark:text-surface-foreground100-dark">
              {meta.author}
            </span>
            <span className="text-xs text-surface-foreground400-light dark:text-surface-foreground400-dark">{meta.time}</span>
          </p>
          <div className="mt-1 text-sm leading-relaxed text-surface-foreground300-light dark:text-surface-foreground300-dark">
            {comment.body}
          </div>
          {/* A small button, the system's secondary: pale teal with a teal edge. */}
          {comment.link && (
            <p className="mt-4">
              <Button as={Link} to={comment.link.to} variant="secondary" size="sm">
                {comment.link.label}
                <ChevronIcon />
              </Button>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CommentPins({ comments, meta, show = true, onOpen, className = '' }) {
  const reduce = useReducedMotion();
  // Back on Home after the opening has played: the pins are already posted.
  const still = useRef(openingSeen()).current;
  const rowRef = useRef(null);
  const pinRefs = useRef([]);
  const cardId = useId();
  const [posted, setPosted] = useState(0); // how many pins are on the board
  const [fresh, setFresh] = useState(-1); // the pin that was just posted and still shows its preview
  const [peek, setPeek] = useState(-1); // the pin under the mouse or the keyboard
  const [openIndex, setOpenIndex] = useState(-1);
  const count = comments.length;
  const openNow = useRef(openIndex);
  openNow.current = openIndex;

  // Post the comments, one after the other.
  useEffect(() => {
    if (!show) return undefined;
    if (reduce || still) {
      setPosted(count);
      return undefined;
    }
    const timers = [];
    for (let i = 0; i < count; i += 1) {
      const at = POST.first + i * (POST.hold + POST.gap);
      timers.push(setTimeout(() => { setPosted(i + 1); setFresh(i); }, at));
      timers.push(setTimeout(() => setFresh((now) => (now === i ? -1 : now)), at + POST.hold));
    }
    return () => timers.forEach(clearTimeout);
  }, [show, reduce, still, count]);

  const close = useCallback(({ refocus = false } = {}) => {
    // Hand focus back to the pin first, while we still know which one it was.
    if (refocus) pinRefs.current[openNow.current]?.focus();
    setOpenIndex(-1);
  }, []);

  const press = (index) => {
    if (openIndex === index) {
      close();
      return;
    }
    setOpenIndex(index);
    onOpen?.(index);
  };

  // While a comment is open: Escape closes it, and so does a click anywhere else.
  useEffect(() => {
    if (openIndex === -1) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close({ refocus: true });
    };
    const onDown = (e) => {
      if (!rowRef.current?.contains(e.target)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [openIndex, close]);

  // Tabbing on past the comment closes it too.
  const onBlur = (e) => {
    if (openIndex !== -1 && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) close();
  };

  const open = openIndex === -1 ? null : comments[openIndex];

  return (
    <div
      ref={rowRef}
      role="group"
      aria-label="Comments"
      onBlur={onBlur}
      className={`flex items-end gap-2 [--pin:2.75rem] ${className}`}
    >
      {comments.slice(0, posted).map((comment, i) => (
        <Pin
          key={comment.id}
          comment={comment}
          meta={meta}
          isOpen={openIndex === i}
          // No previews while a comment is open. The card sits where they would go.
          peeking={openIndex === -1 && (peek === i || fresh === i)}
          controls={cardId}
          reduce={reduce}
          buttonRef={(node) => { pinRefs.current[i] = node; }}
          onPress={() => press(i)}
          onPeek={(on) => setPeek((now) => (on ? i : now === i ? -1 : now))}
        />
      ))}
      <AnimatePresence>
        {open && (
          <Card
            key={open.id}
            id={cardId}
            comment={open}
            meta={meta}
            rowRef={rowRef}
            reduce={reduce}
            onClose={() => close({ refocus: true })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CommentPins;
