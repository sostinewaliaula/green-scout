import React from 'react';
import { ShieldIcon, LeafIcon } from 'lucide-react';
export function ScoutProgramSection() {
  const levels = [{
    name: 'Seedling Scout',
    icon: <LeafIcon className="w-8 h-8 text-green-600" />,
    color: 'green',
    description: 'New members ages 8-12 who are beginning their environmental journey. They learn basic concepts about trees, plants, and conservation.',
    requirements: ['Complete basic environmental education modules', 'Participate in at least one tree planting event', 'Learn to identify 5 native tree species']
  }, {
    name: 'Sapling Scout',
    icon: <div className="w-8 h-8 text-green-700" />,
    color: 'green',
    description: 'Intermediate members ages 10-14 who have demonstrated commitment to environmental stewardship and leadership potential.',
    requirements: ['Plant and monitor 10 trees for at least 3 months', 'Complete advanced environmental education modules', 'Lead a small conservation project at school', 'Identify 15 native plant species']
  }, {
    name: 'Forest Guardian',
    icon: <div className="w-8 h-8 text-green-800" />,
    color: 'green',
    description: 'Advanced members ages 12-18 who lead initiatives, mentor younger scouts, and develop innovative environmental solutions.',
    requirements: ['Lead a major tree planting or conservation initiative', 'Mentor at least 3 Seedling Scouts', 'Develop and implement an environmental education program', 'Create an environmental impact project in their community']
  }, {
    name: 'Scout Leader',
    icon: <ShieldIcon className="w-8 h-8 text-purple-700" />,
    color: 'purple',
    description: 'Teachers, parents, and community members who guide and support Green Scouts in their environmental journey.',
    requirements: ['Complete environmental leadership training', 'Facilitate Green Scout activities at school or in community', 'Support the implementation of Scout projects', 'Participate in Green Scout program evaluation and development']
  }];
  return <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            The Green Scout Program
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our structured program helps young people progress from beginners to
            environmental leaders through education, hands-on experience, and
            mentorship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {levels.map((level, index) => <div key={index} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 ${level.color === 'green' ? 'border-green-600' : 'border-purple-600'}`}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${level.color === 'green' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    {level.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${level.color === 'green' ? 'text-green-700' : 'text-purple-700'}`}>
                      {level.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{level.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {level.requirements.map((req, idx) => <li key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${level.color === 'green' ? 'bg-green-600' : 'bg-purple-600'}`}></div>
                        <span className="text-gray-700">{req}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}