import React from 'react';
import { TreeOfMonthSectionCms } from '../components/TreeOfMonthSectionCms';
import { NamedTreesSectionCms } from '../components/NamedTreesSectionCms';
import { ImpactMapSectionCms } from '../components/ImpactMapSectionCms';

export function TreesPage() {
  return <div className="pt-16">
    <TreeOfMonthSectionCms />
    <NamedTreesSectionCms />
    <ImpactMapSectionCms />
  </div>;
}