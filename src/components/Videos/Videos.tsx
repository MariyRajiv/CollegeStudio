import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';

interface VideosProps {
  onBack: () => void;
}

const Videos: React.FC<VideosProps> = ({ onBack }) => {
  const videos = [
    {
      id: 1,
      title: "How to Excel in College Interviews",
      description: "Expert tips for acing your college admission interviews",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg",
      videoUrl: "https://www.youtube.com/embed/D6_qpaSxAQc"
    },
    {
      id: 2,
      title: "Study Tips for Final Exams",
      description: "Effective study strategies to help you prepare for finals",
      thumbnail: "https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg",
      videoUrl: "https://www.youtube.com/embed/Z-zNHHpXoMM"
    },
    {
      id: 3,
      title: "Campus Life Guide",
      description: "Everything you need to know about college life",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      videoUrl: "https://www.youtube.com/embed/HTnYadnefBA"
    },
    {
      id: 4,
      title: "Time Management Skills",
      description: "Master your schedule and boost productivity",
      thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      videoUrl: "https://www.youtube.com/embed/iONDebHX9qk"
    },
    {
      id: 5,
      title: "Choosing Your Major",
      description: "Guide to selecting the right college major for you",
      thumbnail: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
      videoUrl: "https://www.youtube.com/embed/X05MTkeDCvo"
    },
    {
      id: 6,
      title: "Student Life Hacks",
      description: "Practical tips to make college life easier",
      thumbnail: "https://images.pexels.com/photos/4778664/pexels-photo-4778664.jpeg",
      videoUrl: "https://www.youtube.com/embed/oO4dQOuIjb4"
    }
  ];

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
          CollegeTips Videos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="aspect-video relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <iframe 
                  src={video.videoUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-slate-600">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;