import React, { useState, useMemo } from 'react';

interface GalleryItem {
  id: number;
  name: string;
  county: string;
  image: string;
}

const galleryData: GalleryItem[] = [
  { id: 1, name: 'Nairobi Green Initiative', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Nairobi Urban Forest', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Nairobi City Park', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Nairobi Arboretum', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Nairobi Karura Forest', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1628365254332-f851b69c9eec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Nairobi Westlands', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Nairobi Kilimani', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 8, name: 'Nairobi Lavington', county: 'Nairobi', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 9, name: 'Mombasa Coastal Trees', county: 'Mombasa', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 10, name: 'Kisumu Lake Project', county: 'Kisumu', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 11, name: 'Nakuru Rift Valley', county: 'Nakuru', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 12, name: 'Eldoret Highland Forest', county: 'Uasin Gishu', image: 'https://images.unsplash.com/photo-1628365254332-f851b69c9eec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 13, name: 'Thika Industrial Green', county: 'Kiambu', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 14, name: 'Kakamega Forest Reserve', county: 'Kakamega', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 15, name: 'Kericho Tea Gardens', county: 'Kericho', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 16, name: 'Kisii Highland Trees', county: 'Kisii', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 17, name: 'Embu Mountain Forest', county: 'Embu', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 18, name: 'Meru Indigenous Trees', county: 'Meru', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 19, name: 'Nyeri Aberdare Project', county: 'Nyeri', image: 'https://images.unsplash.com/photo-1628365254332-f851b69c9eec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

const counties = [...new Set(galleryData.map(item => item.county))];

export function NamedTreesPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>('All');

  const filteredData = useMemo(() => {
    return galleryData.filter(item => selectedCounty === 'All' || item.county === selectedCounty);
  }, [selectedCounty]);

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">GreenScout Gallery</h1>
          <p className="text-center text-lg opacity-90">
            {selectedCounty !== 'All' ? `Showing projects from ${selectedCounty} County` : 'Showing all projects across Kenya'}
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">County:</label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                style={{ zIndex: filteredData.length - index, marginTop: `${index * 10}px`, marginLeft: `${index % 2 === 0 ? 0 : 20}px` }}
              >
                <div className="absolute inset-0 bg-black opacity-20 rounded-xl transform rotate-1 scale-95" />
                <div className="absolute inset-0 bg-black opacity-10 rounded-xl transform -rotate-1 scale-95" />
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-white">
                  <div className="h-64 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-600">Showing {filteredData.length} of {galleryData.length} projects</div>
        </div>
      </div>
    </div>
  );
}