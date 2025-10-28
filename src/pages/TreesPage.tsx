import React from 'react';
import { TreeOfMonthSectionCms } from '../components/TreeOfMonthSectionCms';
import { NamedTreesSectionCms } from '../components/NamedTreesSectionCms';
import { ImpactMap } from '../components/ImpactMap';

export function TreesPage() {
  return <div className="pt-16">
    <TreeOfMonthSectionCms />
    <NamedTreesSectionCms />
    <ImpactMap />
  </div>;
}