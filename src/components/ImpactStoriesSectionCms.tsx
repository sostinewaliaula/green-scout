import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface Story {
  quote: string;
  authorName: string;
  authorRole: string;
  location: string;
  colorTheme?: 'green' | 'purple';
}

interface BlockImpactStories {
  _type: 'blockImpactStories';
  title?: string;
  stories?: Story[];
}

export function ImpactStoriesSectionCms() {
  const [storiesBlock, setStoriesBlock] = useState<BlockImpactStories | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockImpactStories" => {
              ...,
              stories[]{
                quote,
                authorName,
                authorRole,
                location,
                colorTheme
              }
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactStories');
        setStoriesBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact stories block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">Loading stories...</div>
      </section>
    );
  }

  if (!storiesBlock || !storiesBlock.stories || storiesBlock.stories.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          No impact stories configured yet. Please add an "Impact Stories Block" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {storiesBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-800">
            {storiesBlock.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {storiesBlock.stories.map((story, index) => {
            const isGreen = story.colorTheme === 'green';
            const authorColor = isGreen ? 'text-green-700 dark:text-green-400' : 'text-purple-700 dark:text-purple-400';

            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{story.quote}"
                </p>
                <div className={`font-bold ${authorColor}`}>
                  — {story.authorName}, {story.authorRole}, {story.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

