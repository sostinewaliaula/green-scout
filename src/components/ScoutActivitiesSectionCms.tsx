import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import sanityClient from '../sanityClient';

interface Activity {
  title: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  description: string;
  frequency: string;
  participants: string;
  locations: string;
}

interface Achievement {
  value: string;
  description: string;
  color?: 'green' | 'purple';
}

interface ScoutActivitiesBlock {
  _type: 'blockScoutActivities';
  title?: string;
  subtitle?: string;
  activities?: Activity[];
  achievements?: Achievement[];
}

export function ScoutActivitiesSectionCms() {
  const [activitiesBlock, setActivitiesBlock] = useState<ScoutActivitiesBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Scouts page and get the blockScoutActivities
    sanityClient
      .fetch<{ content: ScoutActivitiesBlock[] }>(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[_type == "blockScoutActivities"]{
            _type,
            title,
            subtitle,
            activities[]{
              title,
              image{asset->{url}},
              description,
              frequency,
              participants,
              locations
            },
            achievements[]{
              value,
              description,
              color
            }
          }
        }`
      )
      .then((data) => {
        const activitiesBlockData = data?.content?.[0];
        setActivitiesBlock(activitiesBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scout activities:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  // If no data found, show empty state
  if (!activitiesBlock) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-700">
            Scout Activities & Achievements
          </h2>
          <p className="text-gray-600">
            Activities and achievements will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-700">
            {activitiesBlock.title || 'Scout Activities & Achievements'}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {activitiesBlock.subtitle || "Green Scouts participate in a diverse range of activities that build environmental knowledge, leadership skills, and make a tangible impact on Kenya's ecosystems."}
          </p>
        </div>
        
        {/* Activities Grid */}
        {activitiesBlock.activities && activitiesBlock.activities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activitiesBlock.activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="h-56 overflow-hidden">
                  {activity.image?.asset?.url ? (
                    <img
                      src={activity.image.asset.url}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center">
                      <span className="text-6xl">🌳</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{activity.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-green-700 mb-1" />
                      <span className="font-medium text-gray-900">Frequency</span>
                      <span className="text-gray-600">{activity.frequency}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                      <UsersIcon className="w-5 h-5 text-purple-700 mb-1" />
                      <span className="font-medium text-gray-900">Participants</span>
                      <span className="text-gray-600">{activity.participants}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                      <MapPinIcon className="w-5 h-5 text-green-700 mb-1" />
                      <span className="font-medium text-gray-900">Location</span>
                      <span className="text-gray-600">{activity.locations}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Achievements */}
        {activitiesBlock.achievements && activitiesBlock.achievements.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-green-100 to-purple-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activitiesBlock.achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      achievement.color === 'purple' ? 'text-purple-700' : 'text-green-700'
                    }`}
                  >
                    {achievement.value}
                  </div>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

