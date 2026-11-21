import { useLocation } from 'react-router-dom';

// The path a visitor took to the page they are on, for breadcrumbs (Erica,
// 2026-11-20: "can these act like breadcrumbs? ... depending on the path").
//
// Each page visit gets a trail: the pages that led to it, oldest first,
// without Home (the breadcrumb always starts with Home) and without the page
// itself. Home clears the trail. Going to a page that is already in the trail
// cuts the trail back to that page, so walking back up never loops.
// Trails are kept per history entry, so Back and Forward show the same crumbs
// the page had the first time. A page opened directly has an empty trail.
//
// `recordLocation` runs while App renders, before the page does, so the page
// can read its trail on the first paint. It only acts when the entry changes.

// Home and its copies for one reader. The breadcrumb's Home goes back to
// whichever of these the visitor was last on.
const HOMES = ['/', '/leadership', '/workiva'];
const MAX = 3; // crumbs after Home

const trails = new Map();
let last = null; // { key, path, trail }
let homePath = '/';

export function recordLocation(location) {
  if (last && last.key === location.key) return;
  const path = location.pathname;
  if (HOMES.includes(path)) homePath = path;

  let trail = trails.get(location.key);
  if (!trail) {
    trail = last ? [...last.trail, last.path] : [];
    trail = trail.filter((p, i, all) => !HOMES.includes(p) && all.indexOf(p) === i);
    const at = trail.indexOf(path);
    if (at >= 0) trail = trail.slice(0, at);
    if (HOMES.includes(path)) trail = [];
    trail = trail.slice(-MAX);
    trails.set(location.key, trail);
  }
  last = { key: location.key, path, trail };
}

// { home, trail } for the page being shown.
export default function useTrail() {
  const location = useLocation();
  return { home: homePath, trail: trails.get(location.key) || [] };
}
