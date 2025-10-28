import React from 'react';
import { ScoutHeroSectionCms } from '../components/ScoutHeroSectionCms';
import { ScoutSectionCms } from '../components/ScoutSectionCms';
import { ScoutProgramSectionCms } from '../components/ScoutProgramSectionCms';
import { ScoutActivitiesSectionCms } from '../components/ScoutActivitiesSectionCms';
import { ScoutTestimonialsSection } from '../components/ScoutTestimonialsSection';
import { JoinScoutSection } from '../components/JoinScoutSection';
export function ScoutsPage() {
  return <div>
      <ScoutHeroSectionCms />
      <ScoutSectionCms />
      <ScoutProgramSectionCms />
      <ScoutActivitiesSectionCms />
      <ScoutTestimonialsSection />
      <JoinScoutSection />
    </div>;
}