import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface Stat {
  value: string;
  label: string;
  colorTheme?: 'green' | 'purple';
}

interface BlockImpactNumbers {
  _type: 'blockImpactNumbers';
  title?: string;
  stats?: Stat[];
}

export function ImpactNumbersSectionCms() {
  const [numbersBlock, setNumbersBlock] = useState<BlockImpactNumbers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockImpactNumbers" => {
              ...,
              stats[]{
                value,
                label,
                colorTheme
              }
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactNumbers');
        setNumbersBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact numbers block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
        <div className="max-w-5xl mx-auto text-center text-gray-600">Loading impact numbers...</div>
      </section>
    );
  }

  if (!numbersBlock || !numbersBlock.stats || numbersBlock.stats.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
        <div className="max-w-5xl mx-auto text-center text-gray-600 px-4">
          No impact numbers configured yet. Please add an "Impact Numbers Block" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        {numbersBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-700">
            {numbersBlock.title}
          </h2>
        )}
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(numbersBlock.stats.length, 4)} gap-8 text-center`}>
          {numbersBlock.stats.map((stat, index) => {
            const isGreen = stat.colorTheme === 'green';
            const textColor = isGreen ? 'text-green-700' : 'text-purple-700';

            return (
              <div key={index}>
                <div className={`text-5xl font-bold ${textColor} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-700">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

