import React, { useState, useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2, Info } from 'lucide-react';

const PhotoModal: React.FC = () => {
  const { isModalOpen, currentPhoto, closeModal, navigateModal } = useGallery();
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset states when new photo is shown
  useEffect(() => {
    if (isModalOpen && currentPhoto) {
      setIsZoomed(false);
      setShowInfo(false);
      setIsLoading(true);
    }
  }, [currentPhoto, isModalOpen]);

  if (!isModalOpen || !currentPhoto) return null;

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleInfoToggle = () => {
    setShowInfo(!showInfo);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe detection with threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next photo
        navigateModal('next');
      } else {
        // Swipe right, go to previous photo
        navigateModal('prev');
      }
    }
  };

  const handleSharePhoto = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPhoto.caption,
        text: `Check out this photo from CollegeTips: ${currentPhoto.caption}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link', error));
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
      onClick={closeModal}
    >
      {/* Modal Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="text-white text-lg font-medium truncate max-w-[70%]">
          {currentPhoto.caption}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); handleInfoToggle(); }}
            className="p-2 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle information"
          >
            <Info size={20} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleSharePhoto(); }}
            className="p-2 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Share photo"
          >
            <Share2 size={20} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleZoomToggle(); }}
            className="p-2 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="p-2 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); navigateModal('prev'); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); navigateModal('next'); }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Image Container */}
      <div 
        className="h-full w-full flex items-center justify-center p-8 md:p-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        <img 
          src={currentPhoto.src} 
          alt={currentPhoto.alt}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={handleZoomToggle}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      {/* Information Panel */}
      {showInfo && (
        <div 
          className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold mb-2">{currentPhoto.caption}</h3>
          <p className="text-sm mb-1">Category: {currentPhoto.category}</p>
          <p className="text-sm mb-1">Date: {currentPhoto.date}</p>
          {currentPhoto.location && <p className="text-sm mb-1">Location: {currentPhoto.location}</p>}
        </div>
      )}
    </div>
  );
};

export default PhotoModal;