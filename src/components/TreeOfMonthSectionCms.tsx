import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { MapPinIcon, CalendarIcon } from 'lucide-react';

type ImageAsset = { asset?: { url?: string } };

interface BlockTreeOfMonth {
  _type: 'blockTreeOfMonth';
  title?: string;
  month?: string;
  treeName?: string;
  scientificName?: string;
  location?: string;
  plantedDate?: string;
  image?: ImageAsset;
  description?: any[];
  whyItMatters?: string;
}

// Simple block content to text converter
const blockContentToText = (blocks: any[]): string[] => {
  if (!blocks) return [];
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => {
      return block.children
        ?.map((child: any) => child.text)
        .join('') || '';
    })
    .filter((text) => text.length > 0);
};

export function TreeOfMonthSectionCms() {
  const [treeBlock, setTreeBlock] = useState<BlockTreeOfMonth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "trees"][0]{
          content[]{
            _type == "blockTreeOfMonth" => {
              ...,
              image{asset->{url}},
              description
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockTreeOfMonth');
        setTreeBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tree of month block:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading tree of the month...</div>
      </section>
    );
  }

  if (!treeBlock) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No "Tree of the Month" configured yet. Please add a "Tree of the Month" block to your Trees page in Sanity Studio.
        </div>
      </section>
    );
  }

  const descriptionParagraphs = blockContentToText(treeBlock.description || []);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {treeBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 dark:text-green-400">
            {treeBlock.title}
          </h2>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Tree Details */}
            <div className="p-8 md:p-12">
              {treeBlock.month && (
                <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium mb-6">
                  {treeBlock.month}
                </div>
              )}

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {treeBlock.treeName}
                {treeBlock.scientificName && (
                  <span className="block text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-normal italic mt-2">
                    ({treeBlock.scientificName})
                  </span>
                )}
              </h3>

              <div className="flex flex-col gap-3 mb-6 text-gray-700 dark:text-gray-300">
                {treeBlock.location && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>{treeBlock.location}</span>
                  </div>
                )}
                {treeBlock.plantedDate && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>Planted: {formatDate(treeBlock.plantedDate)}</span>
                  </div>
                )}
              </div>

              {descriptionParagraphs.length > 0 && (
                <div className="space-y-4 mb-6">
                  {descriptionParagraphs.map((paragraph, i) => (
                    <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {treeBlock.whyItMatters && (
                <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-600 dark:border-green-400 p-6 rounded-r-lg">
                  <h4 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3">
                    Why It Matters
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {treeBlock.whyItMatters}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Tree Image */}
            <div className="h-full min-h-[400px] lg:min-h-[600px]">
              {treeBlock.image?.asset?.url ? (
                <img
                  src={treeBlock.image.asset.url}
                  alt={treeBlock.treeName || 'Tree of the Month'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                  <span className="text-8xl">🌳</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

