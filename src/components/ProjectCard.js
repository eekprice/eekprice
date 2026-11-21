import React from 'react';
import { Link } from 'react-router-dom';
import ReadStudy from './ReadStudy';

// A side project as a card: the picture on the left, a small label, the
// title, a line or two, and a button. It is one link. Used in the Side
// Projects popover in the nav and on the Side Projects page. Content is
// data/sideProjects.js.
const ProjectCard = React.forwardRef(function ProjectCard({ item, onClick, className = '' }, ref) {
  return (
    <Link
      ref={ref}
      to={item.to}
      onClick={onClick}
      className={`group flex flex-col sm:flex-row overflow-hidden rounded-md
        border border-surface-outline-light dark:border-surface-outline-dark
        bg-surface-background100-light dark:bg-surface-background100-dark
        shadow-sm hover:shadow-md transition-shadow
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-primary-foreground-light dark:focus-visible:ring-primary-foreground-dark
        focus-visible:ring-offset-backdrop-background-light dark:focus-visible:ring-offset-backdrop-background-dark
        ${className}`}
    >
      {/* A cut-out collage, shown whole. The panel stays light in dark mode:
          the collages have black type in them. */}
      <div
        className="sm:w-[44%] shrink-0 flex items-center justify-center p-4 lg:p-5
          bg-surface-background200-light dark:bg-slate-100
          border-b sm:border-b-0 sm:border-r border-surface-outline-light dark:border-surface-outline-dark"
      >
        <img src={item.image} alt="" decoding="async" className="block w-full h-auto" />
      </div>
      <div className="flex flex-1 flex-col p-4 lg:p-5 min-w-0 text-left">
        <p className="m-0 text-xs uppercase tracking-wide font-inter font-medium text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {item.eyebrow}
        </p>
        <h2 className="m-0 mt-1 font-merriweather text-xl lg:text-2xl font-normal text-surface-foreground100-light dark:text-surface-foreground100-dark">
          {item.title}
        </h2>
        <p className="m-0 mt-2 font-inter text-sm lg:text-base leading-relaxed text-surface-foreground200-light dark:text-surface-foreground200-dark">
          {item.text}
        </p>
        <span className="mt-4 sm:mt-auto pt-2 flex justify-end">
          <ReadStudy inside label={item.button} />
        </span>
      </div>
    </Link>
  );
});

export default ProjectCard;
