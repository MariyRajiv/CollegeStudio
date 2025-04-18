import React, { useState, useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import PhotoItem from './PhotoItem';

const PhotoGrid: React.FC = () => {
  const { filteredPhotos, activeCategory } = useGallery();
  const [loading, setLoading] = useState(true);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Reset animation states when category changes
    setLoading(true);
    setAnimateItems(false);

    const timer = setTimeout(() => {
      setLoading(false);
      // Add a small delay before starting item animations
      setTimeout(() => setAnimateItems(true), 150);
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl text-gray-600">No photos found in this category</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {filteredPhotos.map((photo, index) => (
        <PhotoItem 
          key={photo.id} 
          photo={photo} 
          index={index} 
          animate={animateItems} 
        />
      ))}
    </div>
  );
};

export default PhotoGrid;