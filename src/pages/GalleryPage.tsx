import React, { useState } from 'react';
import { GalleryHeroSectionCms } from '../components/GalleryHeroSectionCms';
import { GalleryGridSectionCms } from '../components/GalleryGridSectionCms';

export function GalleryPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>('All Counties');

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Filter */}
      <GalleryHeroSectionCms onCountyChange={handleCountyChange} />

      {/* Gallery Grid */}
      <GalleryGridSectionCms selectedCounty={selectedCounty} />
    </div>
  );
}

