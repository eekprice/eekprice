import React, { useState, useRef, useEffect } from 'react';

const CaseStudyPreview = ({ title, slides, onReadFullStudy }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(true);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftOverlay(scrollLeft > 0);
        setShowRightOverlay(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const openLightbox = (index) => {
    setCurrentSlide(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    dragDistance.current = 0;
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = 'grab';
    if (dragDistance.current < 5) { // Threshold for distinguishing click from drag
      const index = Math.floor((e.pageX - scrollContainerRef.current.offsetLeft + scrollContainerRef.current.scrollLeft) / 256); // 256 is the width of each slide including margin
      openLightbox(index);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust the multiplier for scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    dragDistance.current += Math.abs(x - startX.current);
  };

  const scrollToNextSlide = () => {
    if (scrollContainerRef.current) {
      const slideWidth = 256; // Width of each slide including margin
      scrollContainerRef.current.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  };

  return (
    
   
   <div className="max-w-[1200px] mx-auto relative">
      
      <div
        className="overflow-x-auto cursor-grab scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 relative"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex space-x-4 w-max">
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{ backgroundColor: slide.backgroundColor }}
              className="w-64 h-64 flex-shrink-0 rounded-lg flex items-center justify-center text-white text-2xl cursor-pointer"
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>
      {showLeftOverlay && (
        <div className="rounded-r-lg absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/30 to-transparent backdrop-blur-sm pointer-events-none"></div>
      )}
      {showRightOverlay && (
        <div className="rounded-l-lg absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/30 to-transparent backdrop-blur-sm pointer-events-none"></div>
      )}

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <div
              style={{ backgroundColor: slides[currentSlide].backgroundColor }}
              className="w-[80vw] h-[80vh] rounded-lg flex items-center justify-center text-white text-4xl"
            >
              {slides[currentSlide].content}
            </div>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              &gt;
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-0 right-0 m-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyPreview;
