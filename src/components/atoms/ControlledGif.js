import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ControlledGif = ({ src, alt, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const imgRef = useRef(null);
  const staticFrameRef = useRef(null);

  // Get the first frame of the GIF when component mounts
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
      staticFrameRef.current = canvas.toDataURL('image/png');
    };
  }, [src]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (imgRef.current) {
      if (!isPlaying) {
        // Start playing - show the animated GIF
        imgRef.current.src = src;
      } else {
        // Pause - show the static first frame
        imgRef.current.src = staticFrameRef.current;
      }
    }
  };

  return (
    <div className="relative group h-full w-full">
      <img 
        ref={imgRef}
        src={staticFrameRef.current || src}
        alt={alt}
        className={className}
      />
      <motion.button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 bg-surface-background100-light/80 dark:bg-surface-background100-dark/80 
                 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ControlledGif; 