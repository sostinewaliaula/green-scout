import React from 'react';
import { ImpactHeroSectionCms } from '../components/ImpactHeroSectionCms';
import { ObjectivesSectionCms } from '../components/ObjectivesSectionCms';
import { ImpactNumbersSectionCms } from '../components/ImpactNumbersSectionCms';
import { ImpactTimelineSectionCms } from '../components/ImpactTimelineSectionCms';
import { ImpactStoriesSectionCms } from '../components/ImpactStoriesSectionCms';

export function ImpactPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <ImpactHeroSectionCms />

      {/* Objectives Grid */}
      <ObjectivesSectionCms />

      {/* Impact in Numbers */}
      <ImpactNumbersSectionCms />

      {/* How We Measure Impact Timeline */}
      <ImpactTimelineSectionCms />

      {/* Real Stories/Testimonials */}
      <ImpactStoriesSectionCms />

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