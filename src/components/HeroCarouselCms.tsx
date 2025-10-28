import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, ArrowDownIcon } from 'lucide-react';
import sanityClient from '../sanityClient';

type ImageAsset = { asset?: { url?: string } };

interface Button {
  text?: string;
  link?: string;
  showButton?: boolean;
}

interface Slide {
  title: string;
  subtitle: string;
  backgroundImage?: ImageAsset;
  overlayOpacity?: number;
  button?: Button;
}

interface BlockHeroCarousel {
  _type: 'blockHeroCarousel';
  autoplay?: boolean;
  autoplayInterval?: number;
  slides?: Slide[];
}

export function HeroCarouselCms() {
  const [carouselBlock, setCarouselBlock] = useState<BlockHeroCarousel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "/"][0]{
          title,
          slug,
          content[]{
            _type == "blockHeroCarousel" => {
              _type,
              autoplay,
              autoplayInterval,
              slides[]{
                title,
                subtitle,
                backgroundImage{asset->{url}},
                overlayOpacity,
                button{
                  text,
                  link,
                  showButton
                }
              }
            }
          }
        }`
      )
      .then((data) => {
        console.log('Hero Carousel Page Data:', data);
        console.log('Page Title:', data?.title);
        console.log('Page Slug:', data?.slug);
        console.log('Content Array:', data?.content);
        const block = data?.content?.find((b: any) => b._type === 'blockHeroCarousel');
        console.log('Found Carousel Block:', block);
        setCarouselBlock(block || null);
        setLoading(false);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Error fetching hero carousel:', err);
        setLoading(false);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!carouselBlock?.slides || carouselBlock.slides.length <= 1 || !carouselBlock.autoplay) {
      return;
    }

    const interval = setInterval(() => {
      nextImage();
    }, (carouselBlock.autoplayInterval || 6) * 1000);

    return () => clearInterval(interval);
  }, [carouselBlock, currentImageIndex]);

  const nextImage = () => {
    if (!carouselBlock?.slides) return;
    setCurrentImageIndex((prev) =>
      prev === carouselBlock.slides!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!carouselBlock?.slides) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselBlock.slides!.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <header id="home" className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </header>
    );
  }

  if (!carouselBlock || !carouselBlock.slides || carouselBlock.slides.length === 0) {
    return (
      <header id="home" className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-4">No hero carousel configured</h1>
          <p className="text-gray-300">Please add a Hero Carousel Block to your Home page in Sanity Studio.</p>
        </div>
      </header>
    );
  }

  const slides = carouselBlock.slides;
  const currentSlide = slides[currentImageIndex];
  const overlayOpacity = currentSlide.overlayOpacity || 50;

  return (
    <header id="home" className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.backgroundImage?.asset?.url ? (
              <img
                src={slide.backgroundImage.asset.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-purple-600" />
            )}
          </div>
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
          {currentSlide.title.split(' ').map((word, i) => {
            if (word.toLowerCase() === 'green') {
              return (
                <span key={i} className="text-green-400">
                  {word}{' '}
                </span>
              );
            } else if (word.toLowerCase() === 'scout') {
              return (
                <span key={i} className="text-purple-400">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
          {currentSlide.subtitle}
        </p>

        {currentSlide.button?.showButton && currentSlide.button.text && (
          <Link
            to={currentSlide.button.link || '/about'}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-purple-500 rounded-full text-white font-medium flex items-center gap-2 hover:opacity-90 transition-all transform hover:scale-105"
          >
            {currentSlide.button.text}
            <ArrowDownIcon className="w-5 h-5 animate-bounce" />
          </Link>
        )}
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-10">
          <button
            onClick={prevImage}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </header>
  );
}

