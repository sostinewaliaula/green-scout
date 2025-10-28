import React, { useEffect, useState } from 'react';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  excerpt: string;
}

interface NewsBlock {
  _type: 'blockNews';
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  articles?: NewsArticle[];
}

export function NewsPreviewSectionCms() {
  const [newsBlock, setNewsBlock] = useState<NewsBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Home page and get the blockNews
    sanityClient
      .fetch<{ content: NewsBlock[] }>(
        `*[_type == "page" && slug.current == "/"][0]{
          content[_type == "blockNews"]{
            _type,
            title,
            subtitle,
            showViewAllLink,
            articles[]->{
              _id,
              title,
              slug,
              publishedAt,
              image{asset->{url}},
              excerpt
            }
          }
        }`
      )
      .then((data) => {
        const newsBlockData = data?.content?.[0];
        setNewsBlock(newsBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600 dark:text-gray-400">Loading news...</div>
        </div>
      </section>
    );
  }

  // If no news found, show empty state
  if (!newsBlock || !newsBlock.articles || newsBlock.articles.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">
            Latest News
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            News articles will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">
              {newsBlock.title || 'Latest News'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              {newsBlock.subtitle || 'Stay updated with the latest developments, achievements, and events from the Green Scout community.'}
            </p>
          </div>
          {newsBlock.showViewAllLink && (
            <Link
              to="/news"
              className="hidden md:flex items-center text-green-700 dark:text-green-400 font-medium hover:text-green-900 dark:hover:text-green-300 transition-colors"
            >
              View all news
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsBlock.articles.map((article) => (
            <article
              key={article._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                {article.image?.asset?.url ? (
                  <img
                    src={article.image.asset.url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-4xl">📰</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{article.excerpt}</p>
                <Link
                  to={`/news/${article.slug.current}`}
                  className="inline-flex items-center text-purple-700 dark:text-purple-400 font-medium hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
                >
                  Read more
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {newsBlock.showViewAllLink && (
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/news"
              className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:text-green-900 dark:hover:text-green-300 transition-colors"
            >
              View all news
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
