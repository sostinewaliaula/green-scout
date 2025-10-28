import React from 'react';
import { HeroCarouselCms } from '../components/HeroCarouselCms';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { ImpactStatsSection } from '../components/ImpactStatsSection';
import { FeaturedProjectsSectionCms } from '../components/FeaturedProjectsSectionCms';
import { TestimonialsSectionCms } from '../components/TestimonialsSectionCms';
import { NewsPreviewSectionCms } from '../components/NewsPreviewSectionCms';
import { CallToActionSectionCms } from '../components/CallToActionSectionCms';

export function HomePage() {
  return (
    <>
      <HeroCarouselCms />
      <AboutSection />
      <MissionSection />
      <ImpactStatsSection />
      <FeaturedProjectsSectionCms />
      <TestimonialsSectionCms />
      <NewsPreviewSectionCms />
      <CallToActionSectionCms />
    </>
  );
}