import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronUpIcon } from 'lucide-react';
import sanityClient from '../sanityClient';

interface NavigationItem {
  label: string;
  path: string;
  isButton?: boolean;
}

interface Branding {
  siteName?: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
}

interface ScrollToTopButton {
  enabled?: boolean;
}

interface NavbarSettings {
  branding?: Branding;
  navigationItems?: NavigationItem[];
  scrollToTopButton?: ScrollToTopButton;
}

export function NavBarCms() {
  const [settings, setSettings] = useState<NavbarSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    sanityClient
      .fetch<NavbarSettings>(
        `*[_type == "navbarSettings"][0]{
          branding{
            siteName,
            logo{asset->{url}}
          },
          navigationItems,
          scrollToTopButton
        }`
      )
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching navbar settings:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setIsVisible(true);
      } else {
        setIsScrolled(false);
        // Always show navbar on pages other than home
        setIsVisible(location.pathname !== '/' || window.scrollY > 100);
      }
    };
    // Initialize visibility based on current path
    setIsVisible(location.pathname !== '/');
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Make navbar visible on all pages except home page (when at the top)
  useEffect(() => {
    setIsVisible(location.pathname !== '/');
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fallback to default values if no settings found
  const branding = settings?.branding || { siteName: 'Green Scout' };
  const navigationItems = settings?.navigationItems || [
    { path: '/', label: 'Home' },
    { path: '/scouts', label: 'Scouts' },
    { path: '/trees', label: 'Trees' },
    { path: '/impact', label: 'Impact' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/get-involved', label: 'Get Involved', isButton: true }
  ];
  const scrollToTopEnabled = settings?.scrollToTopButton?.enabled ?? true;

  if (loading) {
    return null; // Don't show anything while loading
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isVisible
            ? 'opacity-100 translate-y-0 ' +
              (isScrolled
                ? 'bg-white shadow-md'
                : location.pathname === '/'
                ? 'bg-transparent'
                : 'bg-white shadow-md')
            : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            {branding.logo?.asset?.url ? (
              <img
                src={branding.logo.asset.url}
                alt={branding.siteName || 'Logo'}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-xl font-bold">
                <span className="text-green-700">
                  {branding.siteName?.split(' ')[0]}
                </span>{' '}
                <span className="text-purple-700">
                  {branding.siteName?.split(' ')[1]}
                </span>
              </span>
            )}
          </Link>
          <div className="hidden md:flex gap-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              if (item.isButton) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-purple-600 text-white hover:shadow-lg transition-all"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors px-2 py-1 rounded-md ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-green-600 to-purple-600'
                      : 'text-gray-600 hover:text-purple-700'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      {scrollToTopEnabled && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full bg-purple-700 text-white shadow-lg z-40 transition-all duration-300 ${
            isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

