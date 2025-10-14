import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function Layout() {
  return <div className="w-full min-h-screen bg-white">
    <ScrollToTop />
    <NavBar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>;
}