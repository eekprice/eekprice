import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Shows a still poster until tapped, then swaps in the animated image.
// The animation file is only requested after the first tap, so it never
// costs anything on page load. Works for animated WebP or GIF.
const ControlledGif = ({ src, poster, alt, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const label = isPlaying ? 'Pause animation' : 'Play animation';

  return (
    <div className="relative h-full w-full">
      <img
        src={isPlaying ? src : poster}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
      <motion.button
        type="button"
        onClick={() => setIsPlaying((p) => !p)}
        aria-label={label}
        aria-pressed={isPlaying}
        className="absolute bottom-3 right-3 p-2 rounded-full
                   bg-surface-background100-light/90 dark:bg-surface-background100-dark/90
                   text-surface-foreground100-light dark:text-surface-foreground100-dark
                   border border-surface-outline-light dark:border-surface-outline-dark
                   shadow-md"
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ControlledGif;
