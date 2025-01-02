import React from 'react';

function YouTubeCard({ videoId, title, thumbnailUrl }) {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div
      className="max-w-sm mx-auto bg-surface-background100-light dark:bg-surface-background100-dark rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 rounded-full p-2">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 8.64v6.72L15.27 12 10 8.64M9 5v14l11-7L9 5z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-surface-foreground100-light dark:text-surface-foreground100-dark">{title}</h2>
        <p className="text-sm text-surface-foreground200-light dark:text-surface-foreground200-dark">YouTube</p>
      </div>
    </div>
  );
}

export default YouTubeCard;