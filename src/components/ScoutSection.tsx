import React from 'react';
export function ScoutSection() {
  return <section id="scouts" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">
          Scout of the Month
        </h2>
        <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Amina Mwangi - Scout of the Month" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 rounded-full bg-purple-200 text-purple-800 font-medium text-sm mb-4">
                June 2023
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                Amina Mwangi
              </h3>
              <p className="text-lg text-green-800 font-medium mb-4">
                Nairobi Green Academy
              </p>
              <p className="text-gray-700 mb-6">
                Amina has led her school's tree planting initiative with
                remarkable dedication, organizing the planting of over 200
                indigenous trees in her school and the surrounding community.
                She developed an innovative watering system using recycled
                materials and has inspired 15 other students to join the Green
                Scout program.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-gray-700">
                    Planted 200+ indigenous trees
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-gray-700">
                    Created recycled watering system
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-gray-700">
                    Recruited 15 new Green Scouts
                  </span>
                </div>
              </div>
              <blockquote className="mt-6 italic text-gray-600 border-l-4 border-purple-500 pl-4">
                "Every tree we plant is a promise to future generations. I'm
                proud to be part of a movement that's creating a greener Kenya."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>;
}