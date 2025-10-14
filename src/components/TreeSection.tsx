import React from 'react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
export function TreeSection() {
  return <section id="trees" className="py-20 px-4 md:px-8 bg-green-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">
          Tree of the Month
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:w-2/5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Meru Oak - Tree of the Month" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 rounded-full bg-green-200 text-green-800 font-medium text-sm mb-4">
                June 2023
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                Meru Oak (Vitex keniensis)
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5 text-green-700" />
                  <span>Nairobi Green Academy, Eastern Campus</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-5 h-5 text-green-700" />
                  <span>Planted: March 15, 2023</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                The Meru Oak is an indigenous Kenyan hardwood tree that's
                becoming increasingly rare in the wild. It grows to impressive
                heights of up to 30 meters and can live for over 100 years when
                properly cared for.
              </p>
              <p className="text-gray-700 mb-6">
                This particular tree was planted during our World Forest Day
                celebration and has shown remarkable growth in just three
                months. It represents our commitment to preserving Kenya's
                native tree species and serves as an educational tool for
                students learning about indigenous forests.
              </p>
              <div className="bg-green-100 p-4 rounded-lg hover:bg-green-200 transition-colors">
                <h4 className="font-medium text-green-800 mb-2">
                  Why It Matters
                </h4>
                <p className="text-gray-700">
                  The Meru Oak provides habitat for native birds and insects,
                  helps prevent soil erosion, and is culturally significant to
                  several Kenyan communities. By planting this tree, Green
                  Scouts are helping preserve biodiversity and Kenya's natural
                  heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}