import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
export function Footer() {
  return <footer className="bg-green-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-green-400">Green</span>{' '}
              <span className="text-purple-400">Scout</span>
            </h2>
            <p className="text-green-200">
              A WSPU Kenya Environmental Initiative
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-300 transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition-colors" aria-label="Twitter">
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-300 transition-colors" aria-label="YouTube">
              <YoutubeIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="border-t border-green-700 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 text-green-300">
              Contact Us
            </h3>
            <p className="text-green-100 mb-2">
              Email: greenscout@wspukenya.org
            </p>
            <p className="text-green-100">Phone: +254 700 123 456</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-green-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About WSPU Kenya
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  News & Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-green-300">
              Newsletter
            </h3>
            <p className="text-green-100 mb-4">
              Subscribe to receive updates about our activities and impact.
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 flex-1" />
              <button type="submit" className="bg-purple-700 hover:bg-purple-800 transition-colors px-4 py-2 rounded-r-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-green-200 text-sm">
          <p>
            © {new Date().getFullYear()} Green Scout - WSPU Kenya. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
}