import React from 'react';
import { ScoutHeroSectionCms } from '../components/ScoutHeroSectionCms';
import { ScoutSectionCms } from '../components/ScoutSectionCms';
import { ScoutProgramSectionCms } from '../components/ScoutProgramSectionCms';
import { ScoutActivitiesSectionCms } from '../components/ScoutActivitiesSectionCms';
import { ScoutTestimonialsSectionCms } from '../components/ScoutTestimonialsSectionCms';
import { JoinScoutSectionCms } from '../components/JoinScoutSectionCms';
export function ScoutsPage() {
  return <div>
      <ScoutHeroSectionCms />
      <ScoutSectionCms />
      <ScoutProgramSectionCms />
      <ScoutActivitiesSectionCms />
      <ScoutTestimonialsSectionCms />
      <JoinScoutSectionCms />
    </div>;
}