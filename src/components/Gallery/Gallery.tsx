import React, { useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { categories } from '../../data/photos';
import PhotoGrid from './PhotoGrid';
import CategoryFilter from './CategoryFilter';
import PhotoModal from './PhotoModal';
import { ArrowLeft } from 'lucide-react';

interface GalleryProps {
  onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const { activeCategory, isModalOpen } = useGallery();

  useEffect(() => {
    // Add keyboard event listeners for modal navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          const { closeModal } = useGallery();
          closeModal();
          break;
        case 'ArrowRight':
          const { navigateModal: next } = useGallery();
          next('next');
          break;
        case 'ArrowLeft':
          const { navigateModal: prev } = useGallery();
          prev('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Photo Gallery
        </h1>

        <CategoryFilter categories={categories} activeCategory={activeCategory} />
        
        <main className="mt-8">
          <PhotoGrid />
        </main>

        <PhotoModal />
      </div>
    </div>
  );
};

export default Gallery;