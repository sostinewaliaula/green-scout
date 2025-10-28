import React from 'react';
import { ImpactHeroSectionCms } from '../components/ImpactHeroSectionCms';
import { ObjectivesSectionCms } from '../components/ObjectivesSectionCms';
import { ImpactNumbersSectionCms } from '../components/ImpactNumbersSectionCms';
import { ImpactTimelineSectionCms } from '../components/ImpactTimelineSectionCms';
import { ImpactStoriesSectionCms } from '../components/ImpactStoriesSectionCms';
import { ImpactCtaSectionCms } from '../components/ImpactCtaSectionCms';

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
      <ImpactCtaSectionCms />
    </div>
  );
}