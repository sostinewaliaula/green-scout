import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, ArrowDownIcon } from 'lucide-react';
const galleryImages = ['https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'];
export function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      nextImage();
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  const nextImage = () => {
    setCurrentImageIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
  };
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <header id="home" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {galleryImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`Tree planting activity ${index + 1}`} className="w-full h-full object-cover" />
          </div>)}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>
      <div className={`absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
          <span className="text-green-500">Green</span>{' '}
          <span className="text-purple-500">Scout</span>
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
          Empowering youth to lead climate action through tree planting
        </p>
        <Link to="/about" className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-purple-500 rounded-full text-white font-medium flex items-center gap-2 hover:opacity-90 transition-all transform hover:scale-105">
          Learn More
          <ArrowDownIcon className="w-5 h-5 animate-bounce" />
        </Link>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-10">
        <button onClick={prevImage} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all" aria-label="Previous image">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <div className="flex gap-2">
          {galleryImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`} aria-label={`Go to image ${index + 1}`} />)}
        </div>
        <button onClick={nextImage} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all" aria-label="Next image">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>;
}