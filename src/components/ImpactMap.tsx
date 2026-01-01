import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useDarkMode } from '../context/DarkModeContext';
import darkStyle from '../googleMapsDarkStyle.json';
import treeIcon from '../assets/tree.png';

interface ImpactLocation {
  id: number;
  name: string;
  school: string;
  lat: number;
  lng: number;
  details: string;
  image: string;
}

// Sample data for tree planting locations
const treeLocations = [
  {
    id: 1,
    name: "Meru Oak (Vitex keniensis)",
    school: "Nairobi Green Academy, Eastern Campus",
    lat: -1.2921,
    lng: 36.8219,
    details: "Planted: March 15, 2023. This Meru Oak is thriving and serves as an educational tool for students.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "African Olive - Wangari's Legacy",
    school: "Karura Forest, Nairobi",
    lat: -1.2321,
    lng: 36.8219,
    details: "Named after Wangari Maathai. Planted April 22, 2022.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Acacia - Sarah's Hope",
    school: "Nakuru High School",
    lat: -0.3031,
    lng: 36.0800,
    details: "Sarah led her school to plant 100 trees. Planted June 5, 2022.",
    image: "https://images.unsplash.com/photo-1628365254332-f851b69c9eec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -1.2921,
  lng: 36.8219
};

export function ImpactMap() {
  const [dynamicApiKey, setDynamicApiKey] = useState<string | null>(null);
  const [selectedTree, setSelectedTree] = useState<ImpactLocation | null>(null);
  const { isDarkMode } = useDarkMode();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: dynamicApiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    sanityClient.fetch('*[_type == "siteSettings"][0]{googleMapsApiKey}')
      .then((settings: any) => {
        if (settings?.googleMapsApiKey) {
          setDynamicApiKey(settings.googleMapsApiKey);
        }
      });
  }, []);

  const mapOptions = {
    styles: isDarkMode ? darkStyle : [],
  };

  if (!isLoaded) {
    return (
      <section id="impact" className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          Loading Google Maps...
        </div>
      </section>
    );
  }

  return (
    <section id="impact" className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
          Our Impact Across Kenya
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Green Scout has planted trees in schools and communities throughout Kenya. Explore our growing forest network below.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-100 dark:border-purple-900/30">
          <div className="relative aspect-[16/9] w-full min-h-[400px]">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
              options={mapOptions}
              onClick={() => setSelectedTree(null)}
            >
              {treeLocations.map(tree => {
                return (
                  <MarkerF
                    key={`${tree.id}-${tree.lat}-${tree.lng}`}
                    position={{ lat: tree.lat, lng: tree.lng }}
                    onClick={() => setSelectedTree(tree)}
                    icon={{
                      url: treeIcon,
                      scaledSize: isLoaded && window.google ? new window.google.maps.Size(40, 40) : undefined,
                      anchor: isLoaded && window.google ? new window.google.maps.Point(20, 40) : undefined,
                    }}
                  />
                );
              })}

              {selectedTree && (
                <InfoWindowF
                  position={{ lat: selectedTree.lat, lng: selectedTree.lng }}
                  onCloseClick={() => setSelectedTree(null)}
                >
                  <div className="p-2 min-w-[200px] max-w-[280px]">
                    <img src={selectedTree.image} alt={selectedTree.name} className="w-full h-32 object-cover rounded mb-2" />
                    <h3 className="font-bold text-green-700 dark:text-green-400 mb-1">{selectedTree.name}</h3>
                    <p className="text-sm text-gray-900 dark:text-white mb-1 font-semibold">{selectedTree.school}</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">{selectedTree.details}</p>
                    <a href="#gallery" className="text-purple-700 dark:text-purple-400 font-bold text-xs uppercase hover:text-purple-900 dark:hover:text-purple-200">View Details</a>
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </section>
  );
}