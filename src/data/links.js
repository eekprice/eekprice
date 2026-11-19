// Contact details used across the site. Source of truth: Portfolio/Canon/about.md

export const EMAIL = 'eekprice@gmail.com';
export const MAILTO = `mailto:${EMAIL}`;

// The resume is a page now (/resume, pages/ResumePage.js). This is kept for a
// download button once the file exists.
// TODO(Erica): public/resume.pdf does not exist yet. Drop the file into public/.
// Canon/positioning.md wants one resume per path; start with one.
export const RESUME_HREF = '/resume.pdf';

export const SCISUMMARY_URL = 'https://scisummary.com/';
// Erica, 2026-11-19: link Ariso to its business page.
export const ARISO_URL = 'https://ariso.ai/business';

// What the hover preview shows for a link that leaves the site
// (components/ExternalLink.js). The pictures are screenshots taken 2026-11-19,
// cropped above each site's cookie banner. Retake them when a site changes.
// `title` is each site's own name for itself.
export const PREVIEWS = {
  ariso: { image: '/images/previews/ariso.webp', title: 'Ariso for Business', host: 'ariso.ai' },
  scisummary: { image: '/images/previews/scisummary.webp', title: 'SciSummary', host: 'scisummary.com' },
  ryan: { image: '/images/previews/ryan-wilson.webp', title: 'Ryan Wilson, UX Leader', host: 'ryangwilson.com' },
};
