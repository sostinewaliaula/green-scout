import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ScoutsPage } from './pages/ScoutsPage';
import { TreesPage } from './pages/TreesPage';
import { ImpactPage } from './pages/ImpactPage';
import { NamedTreesPage } from './pages/NamedTreesPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scouts" element={<ScoutsPage />} />
          <Route path="trees" element={<TreesPage />} />
          <Route path="impact" element={<ImpactPage />} />
          <Route path="gallery" element={<NamedTreesPage />} />
          <Route path="get-involved" element={<GetInvolvedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}