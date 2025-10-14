import React from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
export function ScoutActivitiesSection() {
  const activities = [{
    title: 'Tree Planting Expeditions',
    image: 'https://images.unsplash.com/photo-1552084117-56a987666449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Regular events where scouts plant indigenous trees in schools, public spaces, and degraded areas.',
    frequency: 'Monthly',
    participants: 'All levels',
    locations: 'Various counties'
  }, {
    title: 'Nairobi Street Clean-Up',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Scouts organized a community clean-up, collecting trash and recyclables along the busy streets of Nairobi. This hands-on activity taught the importance of keeping our city clean and protecting the environment.',
    frequency: 'Weekly',
    participants: 'All levels',
    locations: 'Streets of Nairobi'
  }, {
    title: 'Community Awareness Campaigns',
    image: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Scouts engage with local communities to raise awareness about environmental issues and solutions.',
    frequency: 'Quarterly',
    participants: 'Sapling & Forest Guardian',
    locations: 'Communities'
  }, {
    title: 'Leadership Development Camps',
    image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Immersive experiences where scouts develop leadership, teamwork, and project management skills.',
    frequency: 'Bi-annually',
    participants: 'Forest Guardian',
    locations: 'Nature reserves'
  }];
  return <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-700">
            Scout Activities & Achievements
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Green Scouts participate in a diverse range of activities that build
            environmental knowledge, leadership skills, and make a tangible
            impact on Kenya's ecosystems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="h-56 overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
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
                    <span className="font-medium text-gray-900">
                      Participants
                    </span>
                    <span className="text-gray-600">
                      {activity.participants}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-green-700 mb-1" />
                    <span className="font-medium text-gray-900">Location</span>
                    <span className="text-gray-600">{activity.locations}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-16 bg-gradient-to-r from-green-100 to-purple-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">120+</div>
              <p className="text-gray-700">
                School gardens established and maintained by Green Scouts across
                Kenya
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-700 mb-2">15</div>
              <p className="text-gray-700">
                Environmental innovation projects developed by Forest Guardians
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-green-700 mb-2">85%</div>
              <p className="text-gray-700">
                Tree survival rate for Green Scout plantings, well above
                national average
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}