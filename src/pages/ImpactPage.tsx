import React from 'react';
import { ImpactHeroSectionCms } from '../components/ImpactHeroSectionCms';
import { ObjectivesSectionCms } from '../components/ObjectivesSectionCms';

export function ImpactPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <ImpactHeroSectionCms />

      {/* Objectives Grid */}
      <ObjectivesSectionCms />

      {/* Impact in Numbers */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-700">Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-700 mb-2">5,432</div>
              <div className="text-gray-700">Trees Planted</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-700 mb-2">128</div>
              <div className="text-gray-700">Schools Engaged</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-700 mb-2">47</div>
              <div className="text-gray-700">Counties Reached</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-700 mb-2">85%</div>
              <div className="text-gray-700">Tree Survival Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Measure Impact Timeline */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-700">How We Measure Impact</h2>
          <ol className="relative border-l-4 border-green-400 ml-4">
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-400 rounded-full -left-4 ring-4 ring-white">1</span>
              <h3 className="font-bold text-green-700">Join</h3>
              <p className="text-gray-700">Students and schools enroll in the GreenScout program.</p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-400 rounded-full -left-4 ring-4 ring-white">2</span>
              <h3 className="font-bold text-purple-700">Learn</h3>
              <p className="text-gray-700">Participants receive training on climate action, tree care, and biodiversity.</p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-400 rounded-full -left-4 ring-4 ring-white">3</span>
              <h3 className="font-bold text-green-700">Plant</h3>
              <p className="text-gray-700">Scouts plant indigenous trees in schools and communities.</p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-400 rounded-full -left-4 ring-4 ring-white">4</span>
              <h3 className="font-bold text-purple-700">Care</h3>
              <p className="text-gray-700">Ongoing care and monitoring ensure high tree survival rates.</p>
            </li>
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-400 rounded-full -left-4 ring-4 ring-white">5</span>
              <h3 className="font-bold text-green-700">Inspire</h3>
              <p className="text-gray-700">Successful scouts become ambassadors, inspiring others to join and grow the movement.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Real Stories/Testimonials */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-purple-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-800">Real Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col">
              <p className="text-gray-700 mb-4">“Planting trees with GreenScout taught me how important every tree is for our future. Now, my friends and I care for our school garden every week!”</p>
              <div className="font-bold text-green-700">— Amina, Student, Nairobi</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col">
              <p className="text-gray-700 mb-4">“Our school’s participation in GreenScout has transformed our environment and inspired students to become environmental leaders.”</p>
              <div className="font-bold text-purple-700">— Mr. Otieno, Teacher, Kisumu</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col">
              <p className="text-gray-700 mb-4">“I joined GreenScout to make a difference. Seeing our trees grow is the best reward!”</p>
              <div className="font-bold text-green-700">— Brian, GreenScout, Eldoret</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col">
              <p className="text-gray-700 mb-4">“The GreenScout program has brought our community together and made us proud of our green spaces.”</p>
              <div className="font-bold text-purple-700">— Mama Wanjiku, Community Member, Nakuru</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-200 to-purple-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Join the Green Movement</h2>
          <p className="text-lg text-gray-700 mb-8">Be part of a generation that’s making a real difference. Plant a tree, share your story, or support GreenScout’s mission today!</p>
          <a href="/get-involved" className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform">Get Involved</a>
        </div>
      </section>
    </div>
  );
}