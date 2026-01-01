import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useDarkMode } from '../context/DarkModeContext';
import darkStyle from '../googleMapsDarkStyle.json';
import treeIcon from '../assets/tree.png';
import { NamedTreeModal } from './NamedTreeModal';


interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  name: string;
  treeName: string;
  description?: string | any[];
  coordinates: Coordinates;
  treesPlanted?: number;
  plantedDate?: string;
  image?: string;
  detailsLink?: string;
  _id?: string;
  isNamedTree?: boolean;
}

interface NamedTree extends Location {
  namedAfter?: string;
  role?: string;
  scientificName?: string;
  story?: any[] | string;
  fullDescription?: any[] | string;
  bio?: any[] | string;
}

interface BlockImpactMap {
  _type: 'blockImpactMap';
  title?: string;
  subtitle?: string;
  locations?: Location[];
  defaultCenter?: Coordinates;
  defaultZoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

export function ImpactMapSectionCms() {
  const [mapBlock, setMapBlock] = useState<BlockImpactMap | null>(null);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedNamedTree, setSelectedNamedTree] = useState<NamedTree | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicApiKey, setDynamicApiKey] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: dynamicApiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    const query = `{
      "settings": *[_type == "siteSettings"][0]{
        googleMapsApiKey
      },
      "pageData": *[_type == "page" && slug.current == "trees"][0]{
        content[]{
          ...,
          _type == "blockImpactMap" => {
            ...,
            locations[]{
              "name": plantingLocation.address,
              treeName,
              description,
              "coordinates": {
                "lat": plantingLocation.lat,
                "lng": plantingLocation.lng
              },
              treesPlanted,
              plantedDate,
              "image": image.asset->url,
              detailsLink
            }
          }
        }
      },
      "namedTrees": *[_type == "namedTree" && defined(plantingLocation.lat) && defined(plantingLocation.lng)]{
        _id,
        treeName,
        namedAfter,
        role,
        county,
        scientificName,
        plantedDate,
        story,
        description,
        fullDescription,
        bio,
        "image": image.asset->url,
        "name": plantingLocation.address,
        "coordinates": {
          "lat": plantingLocation.lat,
          "lng": plantingLocation.lng
        },
        "isNamedTree": true
      }
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        if (data?.settings?.googleMapsApiKey) {
          setDynamicApiKey(data.settings.googleMapsApiKey);
        }

        const block = data?.pageData?.content?.find((b: any) => b._type === 'blockImpactMap');
        setMapBlock(block || null);

        const standardLocations = block?.locations || [];
        const namedTrees = data?.namedTrees || [];

        // Merge locations
        const merged = [
          ...standardLocations.map((loc: any) => ({ ...loc, isNamedTree: false })),
          ...namedTrees.map((tree: any) => ({
            ...tree,
            // Prioritize the new searchable address, fallback to county
            name: tree.name || tree.county || 'Green Scout Forest',
            isNamedTree: true
          }))
        ];

        setAllLocations(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact map data:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const center = {
    lat: mapBlock?.defaultCenter?.lat || -0.0236,
    lng: mapBlock?.defaultCenter?.lng || 37.9062
  };

  const mapOptions = {
    styles: isDarkMode ? darkStyle : [],
    disableDefaultUI: false,
    zoomControl: true,
  };

  if (loading || !isLoaded) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          {loading ? 'Loading impact map data...' : 'Loading Google Maps...'}
        </div>
      </section>
    );
  }

  if (!mapBlock) return null;

  if (!mapBlock.locations || mapBlock.locations.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          No impact map configured yet. Please add an "Impact Map Block" to your Trees page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {mapBlock.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700 dark:text-purple-400">
              {mapBlock.title}
            </h2>
          )}
          {mapBlock.subtitle && (
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {mapBlock.subtitle}
            </p>
          )}
        </div>

        <div className="rounded-xl overflow-hidden shadow-xl dark:shadow-gray-900/50 border-2 border-purple-100 dark:border-purple-900/30" style={{ height: '600px' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={mapBlock.defaultZoom || 6}
            options={mapOptions}
            onClick={() => setSelectedLocation(null)}
          >
            {allLocations.map((location, index) => {
              const lat = Number(location.coordinates?.lat);
              const lng = Number(location.coordinates?.lng);

              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <MarkerF
                  key={`${index}-${lat}-${lng}`}
                  position={{ lat, lng }}
                  onClick={() => setSelectedLocation(location)}
                  icon={{
                    url: treeIcon,
                    scaledSize: isLoaded && window.google ? new window.google.maps.Size(40, 40) : undefined,
                    anchor: isLoaded && window.google ? new window.google.maps.Point(20, 40) : undefined,
                  }}
                />
              );
            })}

            {selectedLocation && (
              <InfoWindowF
                position={{ lat: Number(selectedLocation.coordinates.lat), lng: Number(selectedLocation.coordinates.lng) }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="p-2 min-w-[200px] max-w-[280px] dark:text-white">
                  {selectedLocation.image && (
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.treeName}
                      className="w-full h-32 object-cover rounded-xl mb-3 shadow-sm"
                    />
                  )}
                  <h3 className="font-bold text-green-700 dark:text-green-400 mb-1 leading-tight">
                    {selectedLocation.treeName}
                  </h3>
                  <p className="text-sm font-medium text-gray-900 dark:text-white/90 mb-1">
                    {selectedLocation.name}
                  </p>

                  {/* Named Tree Specific Info */}
                  {selectedLocation.isNamedTree && (selectedLocation as any).namedAfter && (
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1 mb-2">
                      Dedicated to {(selectedLocation as any).namedAfter}
                    </p>
                  )}

                  {/* Remove description from popup to keep it small */}

                  {selectedLocation.treesPlanted && (
                    <p className="text-xs text-green-600 dark:text-green-400 font-bold mb-2">
                      🌳 {selectedLocation.treesPlanted} trees planted
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/50">
                    {selectedLocation.isNamedTree ? (
                      <button
                        onClick={() => {
                          setSelectedNamedTree(selectedLocation as any);
                          setIsModalOpen(true);
                        }}
                        className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg font-bold hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                      >
                        View Story →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Prepare data for the modal
                          const projectData = {
                            ...selectedLocation,
                            // Ensure the modal's 'location' field sees the project's address
                            location: selectedLocation.name,
                            story: selectedLocation.description
                          };
                          setSelectedNamedTree(projectData as any);
                          setIsModalOpen(true);
                        }}
                        className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        View Project →
                      </button>
                    )}
                    {selectedLocation.plantedDate && (
                      <span className="text-[10px] text-gray-400">
                        {formatDate(selectedLocation.plantedDate)}
                      </span>
                    )}
                  </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>

        <NamedTreeModal
          tree={selectedNamedTree as any}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section >
  );
}
