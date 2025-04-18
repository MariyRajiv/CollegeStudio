import React from 'react';
import { useGallery } from '../../context/GalleryContext';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory }) => {
  const { setActiveCategory } = useGallery();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-indigo-700 hover:bg-indigo-100 shadow-sm'
          }`}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;