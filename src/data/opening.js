import { MotionGlobalConfig } from 'framer-motion';

// Entrances play once per visit (Erica, 2026-11-20: play them on a refresh,
// not when coming back to a page from another page on the site).
//
// All of this lives in memory. It holds while the visitor moves around the
// site and resets on a refresh or a fresh load.

// Home's opening. /leadership and /workiva are Home too and share it. Home
// marks it when the opening has finished (pages/Home.js).
let seen = false;
export const openingSeen = () => seen;
export const markOpeningSeen = () => {
  seen = true;
};

// Every other page, by its address. App.js marks a page once the visitor has
// been on it long enough for its entrance to play.
const HOME_PATHS = ['/', '/leadership', '/workiva'];
const pages = new Set();
export const isHomePath = (path) => HOME_PATHS.includes(path);
export const pageSeen = (path = window.location.pathname) => !isHomePath(path) && pages.has(path);
export const markPageSeen = (path) => {
  if (!isHomePath(path)) pages.add(path);
};

// Tell framer-motion to skip animations for a moment, so a page that has been
// seen is simply there. After that, hovers and scroll reveals animate as
// usual. One shared timer, so two callers never cut each other short.
export const STILL_MS = 1500;
let timer;
export function holdStill(ms = STILL_MS) {
  MotionGlobalConfig.skipAnimations = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    MotionGlobalConfig.skipAnimations = false;
  }, ms);
}
