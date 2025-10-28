import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface Objective {
  icon: string;
  title: string;
  description: string;
  colorTheme?: 'green' | 'purple';
}

interface BlockObjectives {
  _type: 'blockObjectives';
  title?: string;
  objectives?: Objective[];
}

export function ObjectivesSectionCms() {
  const [objectivesBlock, setObjectivesBlock] = useState<BlockObjectives | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockObjectives" => {
              ...,
              objectives[]{
                icon,
                title,
                description,
                colorTheme
              }
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockObjectives');
        setObjectivesBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching objectives block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center text-gray-600 dark:text-gray-400">Loading objectives...</div>
      </section>
    );
  }

  if (!objectivesBlock || !objectivesBlock.objectives || objectivesBlock.objectives.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          No objectives configured yet. Please add an "Objectives Block" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {objectivesBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-700 dark:text-purple-400">
            {objectivesBlock.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {objectivesBlock.objectives.map((objective, index) => {
            const isGreen = objective.colorTheme === 'green';
            const bgColor = isGreen ? 'bg-green-50 dark:bg-green-900/20' : 'bg-purple-50 dark:bg-purple-900/20';
            const titleColor = isGreen ? 'text-green-700 dark:text-green-400' : 'text-purple-700 dark:text-purple-400';

            return (
              <div
                key={index}
                className={`${bgColor} rounded-xl p-6 flex flex-col items-center shadow dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900 transition-shadow text-center`}
              >
                <span className="text-4xl mb-3" role="img" aria-label={objective.title}>
                  {objective.icon}
                </span>
                <h3 className={`font-bold text-lg mb-2 ${titleColor}`}>
                  {objective.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {objective.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

