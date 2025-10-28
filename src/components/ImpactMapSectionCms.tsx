import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type ImageAsset = { asset?: { url?: string } };

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  name: string;
  treeName: string;
  description?: string;
  coordinates: Coordinates;
  treesPlanted?: number;
  plantedDate?: string;
  image?: ImageAsset;
  detailsLink?: string;
}

interface BlockImpactMap {
  _type: 'blockImpactMap';
  title?: string;
  subtitle?: string;
  locations?: Location[];
  defaultCenter?: Coordinates;
  defaultZoom?: number;
}

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function ImpactMapSectionCms() {
  const [mapBlock, setMapBlock] = useState<BlockImpactMap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "trees"][0]{
          content[]{
            _type == "blockImpactMap" => {
              ...,
              locations[]{
                name,
                treeName,
                description,
                coordinates,
                treesPlanted,
                plantedDate,
                image{asset->{url}},
                detailsLink
              },
              defaultCenter,
              defaultZoom
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactMap');
        setMapBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact map block:', err);
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

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading impact map...</div>
      </section>
    );
  }

  if (!mapBlock || !mapBlock.locations || mapBlock.locations.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No impact map configured yet. Please add an "Impact Map Block" to your Trees page in Sanity Studio.
        </div>
      </section>
    );
  }

  const center: [number, number] = [
    mapBlock.defaultCenter?.lat || -0.0236,
    mapBlock.defaultCenter?.lng || 37.9062
  ];
  const zoom = mapBlock.defaultZoom || 6;

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {mapBlock.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">
              {mapBlock.title}
            </h2>
          )}
          {mapBlock.subtitle && (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {mapBlock.subtitle}
            </p>
          )}
        </div>

        <div className="rounded-xl overflow-hidden shadow-xl border-2 border-purple-100" style={{ height: '600px' }}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapBlock.locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.coordinates.lat, location.coordinates.lng]}
                icon={customIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[250px]">
                    {location.image?.asset?.url && (
                      <img
                        src={location.image.asset.url}
                        alt={location.treeName}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-bold text-green-700 mb-2">
                      {location.treeName}
                    </h3>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {location.name}
                    </p>
                    {location.description && (
                      <p className="text-sm text-gray-700 mb-2">
                        {location.description}
                        {location.plantedDate && ` Planted ${formatDate(location.plantedDate)}`}
                      </p>
                    )}
                    {location.treesPlanted && (
                      <p className="text-sm text-purple-700 mb-2">
                        🌳 {location.treesPlanted} trees planted
                      </p>
                    )}
                    {location.detailsLink && (
                      <a
                        href={location.detailsLink}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

