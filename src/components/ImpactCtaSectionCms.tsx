import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { Link } from 'react-router-dom';

interface BlockImpactCta {
  _type: 'blockImpactCta';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function ImpactCtaSectionCms() {
  const [ctaBlock, setCtaBlock] = useState<BlockImpactCta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockImpactCta" => {
              ...,
              title,
              description,
              buttonText,
              buttonLink
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactCta');
        setCtaBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact CTA block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-200 to-purple-200 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-400">Loading...</div>
      </section>
    );
  }

  if (!ctaBlock) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-200 to-purple-200 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          No CTA section configured yet. Please add an "Impact CTA Block" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-200 to-purple-200 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-3xl mx-auto text-center">
        {ctaBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
            {ctaBlock.title}
          </h2>
        )}
        {ctaBlock.description && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {ctaBlock.description}
          </p>
        )}
        {ctaBlock.buttonText && ctaBlock.buttonLink && (
          <Link
            to={ctaBlock.buttonLink}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-purple-500 text-white dark:text-gray-100 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            {ctaBlock.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

