import React from 'react';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function NewsPreviewSection() {
  const newsItems = [{
    title: 'Green Scout Expands to 10 New Schools in Nakuru County',
    date: 'June 15, 2023',
    image: 'https://images.unsplash.com/photo-1509191436522-d296cf87d244?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt: 'The program continues to grow with the addition of 10 new participating schools in Nakuru County, bringing the total to over 125 schools nationwide.'
  }, {
    title: 'Annual Tree Planting Day Sets New Record with 1,500 Trees',
    date: 'May 28, 2023',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt: "This year's National Tree Planting Day saw Green Scouts across the country plant a record 1,500 trees in a single day, surpassing last year's record by 300 trees."
  }, {
    title: 'Green Scout Receives Environmental Conservation Award',
    date: 'April 22, 2023',
    image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    excerpt: "WSPU Kenya's Green Scout initiative was recognized with the prestigious National Environmental Conservation Award for its outstanding contribution to reforestation efforts."
  }];
  return <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              Stay updated with the latest developments, achievements, and
              events from the Green Scout community.
            </p>
          </div>
          <Link to="/news" className="hidden md:flex items-center text-green-700 font-medium hover:text-green-900 transition-colors">
            View all news
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-3">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4">{item.excerpt}</p>
                <Link to="/news" className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors">
                  Read more
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </article>)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/news" className="inline-flex items-center text-green-700 font-medium hover:text-green-900 transition-colors">
            View all news
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>;
}