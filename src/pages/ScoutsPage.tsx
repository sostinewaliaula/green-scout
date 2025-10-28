import React from 'react';
import { ScoutHeroSectionCms } from '../components/ScoutHeroSectionCms';
import { ScoutSection } from '../components/ScoutSection';
import { ScoutProgramSection } from '../components/ScoutProgramSection';
import { ScoutActivitiesSection } from '../components/ScoutActivitiesSection';
import { ScoutTestimonialsSection } from '../components/ScoutTestimonialsSection';
import { JoinScoutSection } from '../components/JoinScoutSection';
export function ScoutsPage() {
  return <div>
      <ScoutHeroSectionCms />
      <ScoutSection />
      <ScoutProgramSection />
      <ScoutActivitiesSection />
      <ScoutTestimonialsSection />
      <JoinScoutSection />
    </div>;
}