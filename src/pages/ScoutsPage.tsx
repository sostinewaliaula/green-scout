import React from 'react';
import { ScoutHeroSectionCms } from '../components/ScoutHeroSectionCms';
import { ScoutSectionCms } from '../components/ScoutSectionCms';
import { ScoutProgramSectionCms } from '../components/ScoutProgramSectionCms';
import { ScoutActivitiesSection } from '../components/ScoutActivitiesSection';
import { ScoutTestimonialsSection } from '../components/ScoutTestimonialsSection';
import { JoinScoutSection } from '../components/JoinScoutSection';
export function ScoutsPage() {
  return <div>
      <ScoutHeroSectionCms />
      <ScoutSectionCms />
      <ScoutProgramSectionCms />
      <ScoutActivitiesSection />
      <ScoutTestimonialsSection />
      <JoinScoutSection />
    </div>;
}