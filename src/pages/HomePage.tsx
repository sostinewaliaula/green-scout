import React from 'react';
import { Header } from '../components/Header';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { ImpactStatsSection } from '../components/ImpactStatsSection';
import { FeaturedProjectsSectionCms } from '../components/FeaturedProjectsSectionCms';
import { TestimonialsSectionCms } from '../components/TestimonialsSectionCms';
import { NewsPreviewSectionCms } from '../components/NewsPreviewSectionCms';
import { CallToActionSection } from '../components/CallToActionSection';

export function HomePage() {
  return (
    <>
      <Header />
      <AboutSection />
      <MissionSection />
      <ImpactStatsSection />
      <FeaturedProjectsSectionCms />
      <TestimonialsSectionCms />
      <NewsPreviewSectionCms />
      <CallToActionSection />
    </>
  );
}