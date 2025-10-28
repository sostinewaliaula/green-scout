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
  onDateRangeChange?: (dateRange: string) => void;
  onCustomDateChange?: (startDate: string, endDate: string) => void;
}

export function GalleryHeroSectionCms({ 
  onCountyChange, 
  onDateRangeChange,
  onCustomDateChange 
}: GalleryHeroSectionCmsProps) {
  const [heroBlock, setHeroBlock] = useState<BlockGalleryHero | null>(null);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('All Counties');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

        // Fetch unique counties from both projects and gallery images
        const [projectCounties, imageCounties] = await Promise.all([
          sanityClient.fetch(`*[_type == "project" && defined(county)]{county}`),
          sanityClient.fetch(`*[_type == "galleryImage" && defined(county)]{county}`)
        ]);
        
        const allCounties = [
          ...projectCounties.map((p: any) => p.county),
          ...imageCounties.map((i: any) => i.county)
        ];
        const uniqueCounties = [...new Set(allCounties)].filter(Boolean).sort() as string[];
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

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setSelectedDateRange(range);
    setShowCustomDatePicker(range === 'custom');
    
    if (range !== 'custom' && onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  const handleApplyCustomDate = () => {
    if (startDate && endDate && onCustomDateChange) {
      onCustomDateChange(startDate, endDate);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 dark:from-green-700 dark:via-blue-700 dark:to-purple-700 text-white dark:text-gray-100">
        <div className="max-w-6xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  if (!heroBlock) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 dark:from-green-700 dark:via-blue-700 dark:to-purple-700 text-white dark:text-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          No gallery hero section configured yet.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 dark:from-green-700 dark:via-blue-700 dark:to-purple-700 text-white dark:text-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        {heroBlock.title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-white">
            {heroBlock.title}
          </h1>
        )}
        {heroBlock.subtitle && (
          <p className="text-xl mb-8 text-white dark:text-gray-100">
            {heroBlock.subtitle}
          </p>
        )}
        
        {heroBlock.showCountyFilter && (
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
            {/* County Filter */}
            <div className="flex items-center gap-3">
              <label htmlFor="county-filter" className="font-medium text-white dark:text-gray-100">
                County:
              </label>
              <select
                id="county-filter"
                value={selectedCounty}
                onChange={handleCountyChange}
                className="px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 bg-white dark:bg-gray-100 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300"
              >
                <option value="All Counties">All Counties</option>
                {counties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center gap-3">
              <label htmlFor="date-filter" className="font-medium text-white dark:text-gray-100">
                Date:
              </label>
              <select
                id="date-filter"
                value={selectedDateRange}
                onChange={handleDateRangeChange}
                className="px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 bg-white dark:bg-gray-100 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300"
              >
                <option value="all">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="this-month">This Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        )}

        {/* Custom Date Picker */}
        {showCustomDatePicker && (
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <label htmlFor="start-date" className="font-medium text-sm">
                From:
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 rounded-lg text-gray-800 dark:text-gray-900 bg-white dark:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="end-date" className="font-medium text-sm">
                To:
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 rounded-lg text-gray-800 dark:text-gray-900 bg-white dark:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300"
              />
            </div>
            <button
              onClick={handleApplyCustomDate}
              disabled={!startDate || !endDate}
              className="px-6 py-2 bg-white dark:bg-gray-100 text-purple-700 dark:text-purple-800 rounded-lg font-medium text-sm hover:bg-purple-50 dark:hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
