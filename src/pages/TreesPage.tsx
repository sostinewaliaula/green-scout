import React from 'react';
import { TreeSection } from '../components/TreeSection';
import { NamedTreesSection } from '../components/NamedTreesSection';
import { ImpactMap } from '../components/ImpactMap';

export function TreesPage() {
  return <div className="pt-16">
    <TreeSection />
    <NamedTreesSection />
    <ImpactMap />
  </div>;
}