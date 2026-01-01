import React, { useState, useMemo, useEffect } from 'react';
import sanityClient from '../sanityClient';
import { NamedTreeModal } from '../components/NamedTreeModal';

type ImageAsset = { asset?: { url?: string } };

interface NamedTree {
  _id: string;
  treeName: string;
  namedAfter: string;
  role: string;
  county?: string;
  scientificName?: string;
  plantedDate?: string;
  image?: ImageAsset;
  story?: any[] | string;
  description?: any[] | string;
  fullDescription?: any[] | string;
  bio?: any[] | string;
  slug?: { current: string };
}

export function NamedTreesPage() {
  const [trees, setTrees] = useState<NamedTree[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [selectedTree, setSelectedTree] = useState<NamedTree | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTreeClick = (tree: NamedTree) => {
    setSelectedTree(tree);
    setIsModalOpen(true);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "namedTree"]{
          _id,
          treeName,
          role,
          county,
          scientificName,
          plantedDate,
          story,
          description,
          fullDescription,
          bio,
          image{asset->{url}},
          "location": plantingLocation.address,
          "coordinates": {
            "lat": plantingLocation.lat,
            "lng": plantingLocation.lng
          },
          slug
        } | order(_createdAt desc)`
      )
      .then((data) => {
        setTrees(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching named trees:', err);
        setLoading(false);
      });
  }, []);

  const counties = useMemo(() => {
    const uniqueCounties = [...new Set(trees.map(item => item.county).filter(Boolean))];
    return uniqueCounties.sort() as string[];
  }, [trees]);

  const filteredData = useMemo(() => {
    return trees.filter(item => selectedCounty === 'All' || item.county === selectedCounty);
  }, [selectedCounty, trees]);

  const currentIndex = useMemo(() => {
    return filteredData.findIndex(item => item._id === selectedTree?._id);
  }, [filteredData, selectedTree]);

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setSelectedTree(filteredData[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedTree(filteredData[currentIndex - 1]);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading named trees...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Named Trees Gallery</h1>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Each of these trees has been named in honor of someone special. Explore our growing forest of memories across Kenya.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 py-6 border-b dark:border-gray-700 sticky top-16 z-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Showing {filteredData.length} of {trees.length} named trees
            </div>
            <div className="flex items-center gap-3">
              <label className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">Filter by County:</label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors outline-none min-w-[160px]"
              >
                <option value="All">All Counties</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredData.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleTreeClick(item)}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-950 overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-green-900/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-64 overflow-hidden relative">
                    {item.image?.asset?.url ? (
                      <img
                        src={item.image.asset.url}
                        alt={item.treeName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/50 flex items-center justify-center">
                        <span className="text-6xl">🌳</span>
                      </div>
                    )}
                    {item.county && (
                      <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 dark:text-green-400 shadow-sm">
                        📍 {item.county}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {item.treeName}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Named after: {item.namedAfter}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 min-h-[1rem]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍃</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No trees found</h3>
              <p className="text-gray-600 dark:text-gray-400">There are no named trees matching your current filter.</p>
              <button
                onClick={() => setSelectedCounty('All')}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <NamedTreeModal
        tree={selectedTree}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasMore={{
          next: currentIndex < filteredData.length - 1,
          prev: currentIndex > 0
        }}
      />
    </div>
  );
}
