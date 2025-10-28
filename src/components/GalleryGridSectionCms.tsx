import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

type ImageAsset = { asset?: { url?: string } };

interface GalleryItem {
  _id: string;
  _type: 'project' | 'galleryImage';
  title: string;
  location: string;
  county: string;
  image?: ImageAsset;
  date?: string;
  category?: string;
  slug?: { current: string };
}

interface GalleryGridSectionCmsProps {
  selectedCounty: string;
  dateRange: string;
  customStartDate?: string;
  customEndDate?: string;
}

export function GalleryGridSectionCms({ 
  selectedCounty, 
  dateRange,
  customStartDate,
  customEndDate 
}: GalleryGridSectionCmsProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      try {
        // Calculate date filter
        let dateFilter = '';
        const now = new Date();
        
        if (dateRange === 'last-week') {
          const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          dateFilter = ` && date >= "${lastWeek.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'last-month') {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          dateFilter = ` && date >= "${lastMonth.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'this-month') {
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          dateFilter = ` && date >= "${firstDayOfMonth.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'last-3-months') {
          const last3Months = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          dateFilter = ` && date >= "${last3Months.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'last-6-months') {
          const last6Months = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
          dateFilter = ` && date >= "${last6Months.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'this-year') {
          const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
          dateFilter = ` && date >= "${firstDayOfYear.toISOString().split('T')[0]}"`;
        } else if (dateRange === 'custom' && customStartDate && customEndDate) {
          dateFilter = ` && date >= "${customStartDate}" && date <= "${customEndDate}"`;
        }

        // County filter
        const countyFilter = selectedCounty && selectedCounty !== 'All Counties' 
          ? ` && county == "${selectedCounty}"` 
          : '';

        // Fetch gallery images
        const galleryImagesQuery = `*[_type == "galleryImage"${countyFilter}${dateFilter}]{
          _id,
          _type,
          title,
          location,
          county,
          date,
          category,
          image{asset->{url}}
        }`;

        // Fetch projects (they might not have dates, so we'll include them separately)
        const projectsQuery = `*[_type == "project"${countyFilter}]{
          _id,
          _type,
          title,
          location,
          county,
          image{asset->{url}},
          slug
        }`;

        const [galleryImages, projects] = await Promise.all([
          sanityClient.fetch(galleryImagesQuery),
          sanityClient.fetch(projectsQuery)
        ]);

        // Combine and sort by date (images first, then projects)
        const combinedItems = [
          ...galleryImages,
          ...(dateRange === 'all' ? projects : []) // Only include projects if "All Time" is selected
        ];

        // Sort by date (most recent first) for gallery images
        combinedItems.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setItems(combinedItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [selectedCounty, dateRange, customStartDate, customEndDate]);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          Loading gallery...
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          {selectedCounty === 'All Counties' && dateRange === 'all'
            ? 'No images or projects found. Please add content in Sanity Studio.'
            : `No images found matching your filters.`}
        </div>
      </section>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category?: string) => {
    if (!category) return '';
    const labels: { [key: string]: string } = {
      'scout-trip': 'Scout Trip',
      'tree-planting': 'Tree Planting',
      'training': 'Training',
      'community-event': 'Community Event',
      'other': 'Other'
    };
    return labels[category] || category;
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Showing {items.length} {items.length === 1 ? 'item' : 'items'}
            {selectedCounty !== 'All Counties' && ` in ${selectedCounty}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 cursor-pointer group"
            >
              <div className="h-64 overflow-hidden relative">
                {item.image?.asset?.url ? (
                  <img
                    src={item.image.asset.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center">
                    <span className="text-6xl">
                      {item._type === 'project' ? '🌳' : '📸'}
                    </span>
                  </div>
                )}
                
                {/* Category badge for gallery images */}
                {item._type === 'galleryImage' && item.category && (
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-200">
                    {getCategoryLabel(item.category)}
                  </div>
                )}
                
                {/* Type badge */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                  {item._type === 'project' ? 'Project' : 'Photo'}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  📍 {item.location}
                </p>
                {item.date && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📅 {formatDate(item.date)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
