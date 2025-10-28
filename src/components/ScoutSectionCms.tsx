import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface ScoutOfMonthBlock {
  _type: 'blockScoutOfMonth';
  title?: string;
  month?: string;
  scoutName?: string;
  school?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  description?: string;
  achievements?: string[];
  quote?: string;
}

export function ScoutSectionCms() {
  const [scoutBlock, setScoutBlock] = useState<ScoutOfMonthBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Scouts page and get the blockScoutOfMonth
    sanityClient
      .fetch<{ content: ScoutOfMonthBlock[] }>(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[_type == "blockScoutOfMonth"]{
            _type,
            title,
            month,
            scoutName,
            school,
            image{asset->{url}},
            description,
            achievements,
            quote
          }
        }`
      )
      .then((data) => {
        const scoutBlockData = data?.content?.[0];
        setScoutBlock(scoutBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scout of month:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section id="scouts" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  // If no data found, show empty state
  if (!scoutBlock) {
    return (
      <section id="scouts" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">
            Scout of the Month
          </h2>
          <p className="text-gray-600">
            Scout of the Month content will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="scouts" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">
          {scoutBlock.title || 'Scout of the Month'}
        </h2>
        <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 overflow-hidden">
              {scoutBlock.image?.asset?.url ? (
                <img
                  src={scoutBlock.image.asset.url}
                  alt={`${scoutBlock.scoutName} - Scout of the Month`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-purple-200 flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
              )}
            </div>
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              {scoutBlock.month && (
                <div className="inline-block px-4 py-1 rounded-full bg-purple-200 text-purple-800 font-medium text-sm mb-4 self-start">
                  {scoutBlock.month}
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                {scoutBlock.scoutName}
              </h3>
              {scoutBlock.school && (
                <p className="text-lg text-green-800 font-medium mb-4">
                  {scoutBlock.school}
                </p>
              )}
              {scoutBlock.description && (
                <p className="text-gray-700 mb-6">{scoutBlock.description}</p>
              )}
              {scoutBlock.achievements && scoutBlock.achievements.length > 0 && (
                <div className="space-y-2 mb-6">
                  {scoutBlock.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
              {scoutBlock.quote && (
                <blockquote className="mt-6 italic text-gray-600 border-l-4 border-purple-500 pl-4">
                  "{scoutBlock.quote}"
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

