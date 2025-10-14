import React from 'react';
import { LeafIcon, UsersIcon, SchoolIcon, AwardIcon, GlobeIcon } from 'lucide-react';
export function HighlightsSection() {
  return <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">
          Our Impact at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-green-700 mb-2">5,432</h3>
            <p className="text-gray-700">Trees Planted</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <UsersIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-purple-700 mb-2">1,200+</h3>
            <p className="text-gray-700">Active Green Scouts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <SchoolIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-green-700 mb-2">128</h3>
            <p className="text-gray-700">Schools Participating</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <GlobeIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-purple-700 mb-2">47</h3>
            <p className="text-gray-700">Counties Reached</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <LeafIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-green-700 mb-2">120</h3>
            <p className="text-gray-700">Native Species Planted</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <AwardIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-purple-700 mb-2">24</h3>
            <p className="text-gray-700">Environmental Awards</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every tree planted is a step toward a greener future. Join us in our
            mission to combat climate change and create sustainable ecosystems
            across Kenya.
          </p>
        </div>
      </div>
    </section>;
}