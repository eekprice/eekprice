import React from 'react';

function SectionContainer({ title, children, id }) {
  return (
    <div
      id={id}
      className="bg-surface-background100-light dark:bg-surface-background100-dark rounded-lg shadow-md
        border border-surface-outline-light dark:border-surface-outline-dark
        w-full max-w-[24rem] mx-auto relative scroll-mt-24"
    >
      <div className="bg-surface-background200-light dark:bg-surface-background200-dark
        border border-surface-outline-light dark:border-surface-outline-dark
        p-2 rounded-lg inline-block absolute -top-6 left-2">
        <h2 className="text-base font-bold font-inter text-surface-foreground100-light dark:text-surface-foreground100-dark mb-0">{title}</h2>
      </div>

      <div className="flex flex-wrap gap-4 justify-center pt-6 pb-2">
        {children}
      </div>
    </div>
  );
}

export default SectionContainer;
