import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface BlockGalleryHero {
  _type: 'blockGalleryHero';
  title?: string;
  subtitle?: string;
  showCountyFilter?: boolean;
}

interface GalleryHeroSectionCmsProps {
  onCountyChange?: (county: string) => void;
}

export function GalleryHeroSectionCms({ onCountyChange }: GalleryHeroSectionCmsProps) {
  const [heroBlock, setHeroBlock] = useState<BlockGalleryHero | null>(null);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('All Counties');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero block
        const pageData = await sanityClient.fetch(
          `*[_type == "page" && slug.current == "gallery"][0]{
            content[]{
              _type == "blockGalleryHero" => {
                _type,
                title,
                subtitle,
                showCountyFilter
              }
            }
          }`
        );
        const block = pageData?.content?.find((b: any) => b._type === 'blockGalleryHero');
        setHeroBlock(block || null);

        // Fetch unique counties from projects
        const countyData = await sanityClient.fetch(
          `*[_type == "project" && defined(county)]{county} | order(county asc)`
        );
        const uniqueCounties = [...new Set(countyData.map((p: any) => p.county))].filter(Boolean) as string[];
        setCounties(uniqueCounties);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery hero:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const county = e.target.value;
    setSelectedCounty(county);
    if (onCountyChange) {
      onCountyChange(county);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  if (!heroBlock) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          No gallery hero section configured yet.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {heroBlock.title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heroBlock.title}
          </h1>
        )}
        {heroBlock.subtitle && (
          <p className="text-xl mb-8">
            {heroBlock.subtitle}
          </p>
        )}
        
        {heroBlock.showCountyFilter && counties.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-3">
            <label htmlFor="county-filter" className="font-medium">
              County:
            </label>
            <select
              id="county-filter"
              value={selectedCounty}
              onChange={handleCountyChange}
              className="px-4 py-2 rounded-lg text-gray-800 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="All Counties">All Counties</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
}

