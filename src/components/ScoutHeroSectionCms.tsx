import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface Stat {
  value: string;
  label: string;
}

interface ScoutHeroBlock {
  _type: 'blockScoutHero';
  heading?: string;
  subtitle?: string;
  backgroundImage?: {
    asset?: {
      url?: string;
    };
  };
  stats?: Stat[];
}

export function ScoutHeroSectionCms() {
  const [heroBlock, setHeroBlock] = useState<ScoutHeroBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Scouts page and get the blockScoutHero
    sanityClient
      .fetch<{ content: ScoutHeroBlock[] }>(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[_type == "blockScoutHero"]{
            _type,
            heading,
            subtitle,
            backgroundImage{asset->{url}},
            stats[]{
              value,
              label
            }
          }
        }`
      )
      .then((data) => {
        const heroBlockData = data?.content?.[0];
        setHeroBlock(heroBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scout hero:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full h-[60vh] overflow-hidden bg-gradient-to-r from-green-900 to-purple-900">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  // Fallback values if no data found
  const heading = heroBlock?.heading || 'Meet Our Green Scouts';
  const subtitle = heroBlock?.subtitle || "Young environmental leaders shaping Kenya's sustainable future";
  const backgroundImage = heroBlock?.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
  const stats = heroBlock?.stats || [
    { value: '1,200+', label: 'Active Scouts' },
    { value: '128', label: 'Schools' },
    { value: '47', label: 'Counties' }
  ];

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Green Scouts in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-purple-900/70" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          {heading.split(' ').map((word, index) => {
            if (word.toLowerCase() === 'green') {
              return (
                <span key={index} className="text-green-400">
                  {word}{' '}
                </span>
              );
            } else if (word.toLowerCase() === 'scouts') {
              return (
                <span key={index} className="text-purple-400">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
          {subtitle}
        </p>
        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg"
              >
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-green-200">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

