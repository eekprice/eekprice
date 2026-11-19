import React from 'react';

// A link that leaves the site. Erica, 2026-11-19: links in the hero should
// show that they open in a new tab, "with an icon so users know what to
// expect", and on hover "preview the webpage as an added affordance".
//
// Every one gets the small arrow-out-of-a-box icon and tells screen readers
// it opens in a new tab.
//
// `preview` is optional: { image, title, host }. With it, hovering the link
// (or focusing it with the keyboard) shows a small card above it with a
// picture of the page. The pictures are screenshots saved in
// public/images/previews, not live pages, so they load fast and never break,
// but they need retaking when a site changes. The card only shows on devices
// that can hover, so a phone never gets it stuck open.

const NewTabIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    className="inline-block w-[0.85em] h-[0.85em] ml-[0.2em] -mt-[0.15em] align-middle opacity-70"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5v5M19 5l-8 8M11 7H6a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-5" />
  </svg>
);

function ExternalLink({ href, preview, className = '', children }) {
  const link = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-2 decoration-1 hover:decoration-2 ${className}`}
    >
      {children}
      <NewTabIcon />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  if (!preview) return link;

  return (
    <span className="group/ext relative inline-block">
      {link}
      <span
        aria-hidden="true"
        className="hidden [@media(hover:hover)]:block pointer-events-none absolute z-40 left-1/2 bottom-full mb-2 w-64
          -translate-x-1/2 translate-y-1 opacity-0
          transition-[opacity,transform] duration-200 ease-out
          group-hover/ext:opacity-100 group-hover/ext:translate-y-0
          group-focus-within/ext:opacity-100 group-focus-within/ext:translate-y-0
          motion-reduce:transition-none
          overflow-hidden rounded-lg shadow-lg text-left
          border border-surface-outline-light dark:border-surface-outline-dark
          bg-surface-background100-light dark:bg-surface-background100-dark"
      >
        <img src={preview.image} alt="" loading="lazy" decoding="async" className="block w-full h-auto bg-white" />
        <span className="block px-3 py-2 border-t border-surface-outline-light dark:border-surface-outline-dark">
          <span className="block font-inter text-sm font-medium leading-snug text-surface-foreground100-light dark:text-surface-foreground100-dark">
            {preview.title}
          </span>
          <span className="block font-inter text-xs text-surface-foreground400-light dark:text-surface-foreground400-dark">
            {preview.host} · opens in a new tab
          </span>
        </span>
      </span>
    </span>
  );
}

export default ExternalLink;
