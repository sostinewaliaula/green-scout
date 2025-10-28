import React, { useEffect, useState } from 'react';
import { ShieldIcon, LeafIcon, TreePineIcon, SproutIcon } from 'lucide-react';
import sanityClient from '../sanityClient';

interface ProgramLevel {
  name: string;
  icon?: string;
  color: 'green' | 'purple';
  description: string;
  requirements?: string[];
}

interface ScoutProgramBlock {
  _type: 'blockScoutProgram';
  title?: string;
  subtitle?: string;
  levels?: ProgramLevel[];
}

export function ScoutProgramSectionCms() {
  const [programBlock, setProgramBlock] = useState<ScoutProgramBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Scouts page and get the blockScoutProgram
    sanityClient
      .fetch<{ content: ScoutProgramBlock[] }>(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[_type == "blockScoutProgram"]{
            _type,
            title,
            subtitle,
            levels[]{
              name,
              icon,
              color,
              description,
              requirements
            }
          }
        }`
      )
      .then((data) => {
        const programBlockData = data?.content?.[0];
        setProgramBlock(programBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scout program:', err);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'leaf':
        return <LeafIcon className="w-8 h-8 text-green-600" />;
      case 'sprout':
        return <SproutIcon className="w-8 h-8 text-green-700" />;
      case 'tree':
        return <TreePineIcon className="w-8 h-8 text-green-800" />;
      case 'shield':
        return <ShieldIcon className="w-8 h-8 text-purple-700" />;
      default:
        return <LeafIcon className="w-8 h-8 text-green-600" />;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  // If no data found, show empty state
  if (!programBlock || !programBlock.levels || programBlock.levels.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            The Green Scout Program
          </h2>
          <p className="text-gray-600">
            Program levels will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            {programBlock.title || 'The Green Scout Program'}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {programBlock.subtitle || 'Our structured program helps young people progress from beginners to environmental leaders through education, hands-on experience, and mentorship.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programBlock.levels.map((level, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 ${
                level.color === 'green' ? 'border-green-600' : 'border-purple-600'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      level.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                    }`}
                  >
                    {getIcon(level.icon)}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        level.color === 'green' ? 'text-green-700' : 'text-purple-700'
                      }`}
                    >
                      {level.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{level.description}</p>
                  </div>
                </div>
                {level.requirements && level.requirements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {level.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              level.color === 'green' ? 'bg-green-600' : 'bg-purple-600'
                            }`}
                          ></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

