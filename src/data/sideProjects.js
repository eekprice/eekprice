import { education } from './education';

// The items in the Side Projects menu in the nav, top to bottom
// (components/SideProjectsButton.js). An item with `to` is a page on this
// site. An item with `soon: true` shows greyed out and can't be picked: a
// placeholder until that page exists (Erica, 2026-11-20: "add a coming soon
// one too"). pages/SideProjectsPage.js draws the real ones as cards.
//
// Education's words come from its own page data, so they can't drift.
// `dot` is the small teal circle before the name in the menu (Erica,
// 2026-11-20: the Work menu has little squares, like stickies, so these get a
// circle in teal).
const DOT = 'bg-teal-600 dark:bg-teal-400';

export const sideProjects = [
  {
    to: '/education',
    dot: DOT,
    eyebrow: 'Teaching and speaking',
    title: education.title,
    text: education.intro,
    image: education.items[0].image,
    button: 'See Education',
  },
  // A placeholder page for now (pages/FoundingDesignerPage.js). Erica,
  // 2026-11-20: "make this item founding designer and add a coming soon page".
  { to: '/founding-designer', title: 'Founding Designer', dot: DOT },
];
