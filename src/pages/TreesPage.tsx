import React from 'react';
import { TreeOfMonthSectionCms } from '../components/TreeOfMonthSectionCms';
import { NamedTreesSection } from '../components/NamedTreesSection';
import { ImpactMap } from '../components/ImpactMap';

export function TreesPage() {
  return <div className="pt-16">
    <TreeOfMonthSectionCms />
    <NamedTreesSection />
    <ImpactMap />
  </div>;
}