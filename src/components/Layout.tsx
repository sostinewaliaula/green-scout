import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBarCms } from './NavBarCms';
import { FooterCms } from './FooterCms';
import { SiteBranding } from './SiteBranding';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function Layout() {
  return <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <ScrollToTop />
    <SiteBranding />
    <NavBarCms />
    <main className="dark:bg-gray-900">
      <Outlet />
    </main>
    <FooterCms />
  </div>;
}