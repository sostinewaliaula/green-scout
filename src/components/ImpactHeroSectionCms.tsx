import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

type ImageAsset = { asset?: { url?: string } };

interface BlockImpactHero {
  _type: 'blockImpactHero';
  title?: string;
  subtitle?: string;
  backgroundImage?: ImageAsset;
  overlayOpacity?: number;
}

export function ImpactHeroSectionCms() {
  const [heroBlock, setHeroBlock] = useState<BlockImpactHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockImpactHero" => {
              ...,
              backgroundImage{asset->{url}}
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactHero');
        setHeroBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact hero block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </section>
    );
  }

  if (!heroBlock) {
    return (
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600 text-center px-4">
          No Impact Hero section configured yet. Please add an "Impact Hero Section" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  const overlayOpacity = heroBlock.overlayOpacity || 50;
  const backgroundImage = heroBlock.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';

  return (
    <section className="relative w-full h-[50vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Impact Hero"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        {heroBlock.title && (
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            {heroBlock.title.split(' ').map((word, i) => {
              if (word.toLowerCase() === 'greenscout') {
                return (
                  <span key={i}>
                    <span className="text-green-400">Green</span>
                    <span className="text-white">Scout</span>{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h1>
        )}
        {heroBlock.subtitle && (
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
            {heroBlock.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

