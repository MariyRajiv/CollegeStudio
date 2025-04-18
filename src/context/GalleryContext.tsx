import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Photo } from '../types/gallery';
import { photos } from '../data/photos';

interface GalleryContextType {
  photos: Photo[];
  filteredPhotos: Photo[];
  activeCategory: string;
  currentPhoto: Photo | null;
  isModalOpen: boolean;
  setActiveCategory: (category: string) => void;
  openModal: (photo: Photo) => void;
  closeModal: () => void;
  navigateModal: (direction: 'next' | 'prev') => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const openModal = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction: 'next' | 'prev') => {
    if (!currentPhoto) return;

    const currentIndex = filteredPhotos.findIndex(photo => photo.id === currentPhoto.id);
    let newIndex: number;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length;
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    }

    setCurrentPhoto(filteredPhotos[newIndex]);
  };

  const value = {
    photos,
    filteredPhotos,
    activeCategory,
    currentPhoto,
    isModalOpen,
    setActiveCategory,
    openModal,
    closeModal,
    navigateModal
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};