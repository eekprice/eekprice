import React from 'react';

function YouTubePreview({ videoUrl, thumbnailUrl }) {
  const handlePlay = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div
      className="relative w-32 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
      onClick={handlePlay}
    >
      {/* Image: Video thumbnail */}
      <img src={thumbnailUrl} alt="Video Thumbnail" className="w-full h-full object-cover" />

      {/* Play Button: Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export default YouTubePreview; 