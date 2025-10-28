import React, { useEffect, useState } from 'react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { XIcon } from './XIcon';
import sanityClient from '../sanityClient';

interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

interface Branding {
  siteName?: string;
  tagline?: string;
}

interface Contact {
  email?: string;
  phone?: string;
}

interface QuickLink {
  label: string;
  url: string;
}

interface Newsletter {
  enabled?: boolean;
  heading?: string;
  description?: string;
  buttonText?: string;
}

interface FooterSettings {
  branding?: Branding;
  socialMedia?: SocialMedia;
  contact?: Contact;
  quickLinks?: QuickLink[];
  newsletter?: Newsletter;
  copyright?: string;
}

export function FooterCms() {
  const [settings, setSettings] = useState<FooterSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<FooterSettings>(
        `*[_type == "footerSettings"][0]{
          branding,
          socialMedia,
          contact,
          quickLinks,
          newsletter,
          copyright
        }`
      )
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching footer settings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <footer className="bg-green-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-green-200">Loading...</div>
        </div>
      </footer>
    );
  }

  // Fallback to default values if no settings found
  const branding = settings?.branding || { siteName: 'Green Scout', tagline: 'A WSPU Kenya Environmental Initiative' };
  const socialMedia = settings?.socialMedia || {};
  const contact = settings?.contact || { email: 'greenscout@wspukenya.org', phone: '+254 700 123 456' };
  const quickLinks = settings?.quickLinks || [];
  const newsletter = settings?.newsletter || { enabled: true, heading: 'Newsletter', description: 'Subscribe to receive updates about our activities and impact.', buttonText: 'Subscribe' };
  const copyright = settings?.copyright || '© {year} Green Scout - WSPU Kenya. All rights reserved.';

  // Replace {year} placeholder with current year
  const copyrightText = copyright.replace('{year}', new Date().getFullYear().toString());

  return (
    <footer className="bg-green-900 dark:bg-gray-950 text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-green-400">{branding.siteName?.split(' ')[0]}</span>{' '}
              <span className="text-purple-400">{branding.siteName?.split(' ')[1]}</span>
            </h2>
            <p className="text-green-200 dark:text-green-300">{branding.tagline}</p>
          </div>
          <div className="flex space-x-4">
            {socialMedia.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
            )}
            {socialMedia.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="w-6 h-6" />
              </a>
            )}
            {socialMedia.instagram && (
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
            )}
            {socialMedia.youtube && (
              <a
                href={socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-green-700 dark:border-gray-700 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-green-300">Contact Us</h3>
            {contact.email && (
              <p className="text-green-100 mb-2">Email: {contact.email}</p>
            )}
            {contact.phone && (
              <p className="text-green-100">Phone: {contact.phone}</p>
            )}
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-green-300">Quick Links</h3>
            {quickLinks.length > 0 ? (
              <ul className="space-y-2 text-green-100">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-100">No links available</p>
            )}
          </div>

          {/* Newsletter Section */}
          {newsletter.enabled && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-green-300">
                {newsletter.heading}
              </h3>
              <p className="text-green-100 mb-4">{newsletter.description}</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 flex-1"
                />
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 transition-colors px-4 py-2 rounded-r-lg"
                >
                  {newsletter.buttonText}
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="mt-8 text-center text-green-200 text-sm">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}

