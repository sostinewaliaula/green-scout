import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Custom icon for map pins - using a red tree icon
const treeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'tree-marker-icon'
});

export function ImpactMap() {
  return (
    <section id="impact" className="py-20 px-4 md:px-8 bg-white">
      <style>
        {`
          .tree-marker-icon {
            filter: hue-rotate(0deg) saturate(2) brightness(1.2);
          }
          .leaflet-marker-icon.tree-marker-icon {
            filter: hue-rotate(0deg) saturate(2) brightness(1.2) !important;
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-purple-700">
          Our Impact Across Kenya
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Green Scout has planted trees in schools and communities throughout Kenya. Explore our growing forest network below.
        </p>
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="relative aspect-[16/9] w-full">
            <MapContainer center={[-0.5, 37.0]} zoom={7} style={{ height: '100%', minHeight: 400, width: '100%' }} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {treeLocations.map(tree => (
                <Marker key={tree.id} position={[tree.lat, tree.lng]} icon={treeIcon}>
                  <Popup>
                    <div className="w-56">
                      <img src={tree.image} alt={tree.name} className="w-full h-24 object-cover rounded mb-2" />
                      <h3 className="font-bold text-green-700 mb-1">{tree.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{tree.school}</p>
                      <p className="text-xs text-gray-600 mb-2">{tree.details}</p>
                      <a href="#gallery" className="text-purple-700 underline text-sm">View Details</a>
              </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}