import React from 'react';
import { Photo } from '../../types/gallery';
import { useGallery } from '../../context/GalleryContext';
import { Calendar, MapPin } from 'lucide-react';

interface PhotoItemProps {
  photo: Photo;
  index: number;
  animate: boolean;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, index, animate }) => {
  const { openModal } = useGallery();

  // Calculate delay for staggered animation
  const delay = `${index * 75}ms`;

  return (
    <div 
      className={`overflow-hidden rounded-lg shadow-md transition-all duration-500 bg-white hover:shadow-xl ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} 
      style={{ 
        transitionDelay: delay,
        aspectRatio: `${photo.width}/${photo.height}`
      }}
    >
      <div className="relative h-full group cursor-pointer" onClick={() => openModal(photo)}>
        <img 
          src={photo.src} 
          alt={photo.alt} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with information */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-lg">{photo.caption}</h3>
            
            <div className="mt-2 text-sm flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{photo.date}</span>
              </div>
              
              {photo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{photo.location}</span>
                </div>
              )}
              
              <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-600/70 rounded-full text-xs">
                {photo.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;