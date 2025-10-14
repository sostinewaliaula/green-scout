import React from 'react';
import { Link } from 'react-router-dom';
export function CallToActionSection() {
  return <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join the Green Scout Movement Today
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-green-50">
          Be part of Kenya's youth-led environmental transformation. Together,
          we can create a greener, more sustainable future.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/get-involved" className="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg">
            Become a Green Scout
          </Link>
          <Link to="/get-involved" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all transform hover:scale-105">
            Support Our Mission
          </Link>
        </div>
        <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3">For Students</h3>
            <p className="text-green-50">
              Develop leadership skills and make a real impact in your community
              by joining our network of Green Scouts.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3">For Schools</h3>
            <p className="text-green-50">
              Partner with us to create sustainable green spaces and
              environmental education opportunities for your students.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3">For Organizations</h3>
            <p className="text-green-50">
              Support our mission through partnerships, sponsorships, and
              corporate social responsibility initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>;
}