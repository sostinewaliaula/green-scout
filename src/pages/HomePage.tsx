import React from 'react';
import { Header } from '../components/Header';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { ImpactStatsSection } from '../components/ImpactStatsSection';
import { FeaturedProjectsSectionCms } from '../components/FeaturedProjectsSectionCms';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsPreviewSection } from '../components/NewsPreviewSection';
import { CallToActionSection } from '../components/CallToActionSection';

export function HomePage() {
  return (
    <>
      <Header />
      <AboutSection />
      <MissionSection />
      <ImpactStatsSection />
      <FeaturedProjectsSectionCms />
      <TestimonialsSection />
      <NewsPreviewSection />
      <CallToActionSection />
    </>
  );
}