import React from 'react';
import { GraduationCap, Image, Video } from 'lucide-react';

interface HomeProps {
  onSectionChange: (section: 'gallery' | 'videos') => void;
}

const Home: React.FC<HomeProps> = ({ onSectionChange }) => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="text-white h-12 w-12" />
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Life @CollegeTips.in
          </h1>
        </div>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
          Experience the vibrant life at CollegeTips through our photo gallery and video content
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {/* Gallery Section */}
        <div 
          className="group cursor-pointer"
          onClick={() => onSectionChange('gallery')}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Gallery Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-16 w-16 text-white mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white">Gallery</h2>
                  <p className="text-white/90 mt-2">Explore our photo collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div 
          className="group cursor-pointer"
          onClick={() => onSectionChange('videos')}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Videos Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 text-white mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white">Videos</h2>
                  <p className="text-white/90 mt-2">Watch our latest content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;