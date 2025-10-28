import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { Link } from 'react-router-dom';

type ImageAsset = { asset?: { url?: string } };

interface NamedTree {
  _id: string;
  treeName: string;
  namedAfter: string;
  role: string;
  image?: ImageAsset;
  slug?: { current: string };
}

interface BlockNamedTrees {
  _type: 'blockNamedTrees';
  title?: string;
  subtitle?: string;
  displayMode?: 'selected' | 'all' | 'featured';
  selectedTrees?: NamedTree[];
  maxTreesToShow?: number;
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
}

export function NamedTreesSectionCms() {
  const [namedTreesBlock, setNamedTreesBlock] = useState<BlockNamedTrees | null>(null);
  const [trees, setTrees] = useState<NamedTree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "trees"][0]{
          content[]{
            _type == "blockNamedTrees" => {
              ...,
              selectedTrees[]->{
                _id,
                treeName,
                namedAfter,
                role,
                image{asset->{url}},
                slug
              }
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockNamedTrees');
        setNamedTreesBlock(block || null);

        // If display mode is 'selected', use the selected trees
        if (block?.displayMode === 'selected' && block.selectedTrees) {
          setTrees(block.selectedTrees.slice(0, block.maxTreesToShow || block.selectedTrees.length));
          setLoading(false);
        } else {
          // Fetch trees based on display mode
          let query = '*[_type == "namedTree"]';
          if (block?.displayMode === 'featured') {
            query = '*[_type == "namedTree" && featured == true]';
          }
          query += '{ _id, treeName, namedAfter, role, image{asset->{url}}, slug } | order(_createdAt desc)';

          sanityClient.fetch(query).then((fetchedTrees) => {
            const limitedTrees = block?.maxTreesToShow 
              ? fetchedTrees.slice(0, block.maxTreesToShow)
              : fetchedTrees;
            setTrees(limitedTrees);
            setLoading(false);
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching named trees block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading named trees...</div>
      </section>
    );
  }

  if (!namedTreesBlock) {
    return (
      <section className="py-20 px-4 md:px-8 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No "Named Trees" section configured yet. Please add a "Named Trees Block" to your Trees page in Sanity Studio.
        </div>
      </section>
    );
  }

  if (trees.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No named trees found. Please add some named trees in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {namedTreesBlock.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              {namedTreesBlock.title}
            </h2>
          )}
          {namedTreesBlock.subtitle && (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {namedTreesBlock.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {trees.map((tree) => (
            <div
              key={tree._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                {tree.image?.asset?.url ? (
                  <img
                    src={tree.image.asset.url}
                    alt={tree.treeName}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <span className="text-5xl">🌳</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-green-700 mb-2">
                  {tree.treeName}
                </h3>
                <p className="text-sm text-purple-700 mb-1">
                  Named after: {tree.namedAfter}
                </p>
                <p className="text-xs text-gray-600">
                  {tree.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {namedTreesBlock.showViewAllButton && (
          <div className="text-center">
            <Link
              to={namedTreesBlock.viewAllButtonLink || '/named-trees'}
              className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-full font-medium hover:from-green-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {namedTreesBlock.viewAllButtonText || 'View All Named Trees'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

