import React, { useState } from 'react';
import { GalleryProvider } from './context/GalleryContext';
import Home from './components/Home/Home';
import Gallery from './components/Gallery/Gallery';
import Videos from './components/Videos/Videos';

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'gallery' | 'videos'>('home');

  return (
    <div className="min-h-screen bg-emerald-600">
      <GalleryProvider>
        {activeSection === 'home' && <Home onSectionChange={setActiveSection} />}
        {activeSection === 'gallery' && <Gallery onBack={() => setActiveSection('home')} />}
        {activeSection === 'videos' && <Videos onBack={() => setActiveSection('home')} />}
      </GalleryProvider>
    </div>
  );
}

export default App;