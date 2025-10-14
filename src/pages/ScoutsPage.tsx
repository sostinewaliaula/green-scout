import React from 'react';
import { ScoutHeroSection } from '../components/ScoutHeroSection';
import { ScoutSection } from '../components/ScoutSection';
import { ScoutProgramSection } from '../components/ScoutProgramSection';
import { ScoutActivitiesSection } from '../components/ScoutActivitiesSection';
import { ScoutTestimonialsSection } from '../components/ScoutTestimonialsSection';
import { JoinScoutSection } from '../components/JoinScoutSection';
export function ScoutsPage() {
  return <div>
      <ScoutHeroSection />
      <ScoutSection />
      <ScoutProgramSection />
      <ScoutActivitiesSection />
      <ScoutTestimonialsSection />
      <JoinScoutSection />
    </div>;
}