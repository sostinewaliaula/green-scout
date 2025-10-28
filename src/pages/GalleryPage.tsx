import React, { useState } from 'react';
import { GalleryHeroSectionCms } from '../components/GalleryHeroSectionCms';
import { GalleryGridSectionCms } from '../components/GalleryGridSectionCms';

export function GalleryPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>('All Counties');
  const [dateRange, setDateRange] = useState<string>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  const handleCustomDateChange = (startDate: string, endDate: string) => {
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Filters */}
      <GalleryHeroSectionCms 
        onCountyChange={handleCountyChange}
        onDateRangeChange={handleDateRangeChange}
        onCustomDateChange={handleCustomDateChange}
      />

      {/* Gallery Grid */}
      <GalleryGridSectionCms 
        selectedCounty={selectedCounty}
        dateRange={dateRange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
      />
    </div>
  );
}

