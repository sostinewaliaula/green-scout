import React, { useEffect, useState } from 'react';
import { CalendarIcon, ArrowRightIcon, FilterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchSanity } from '../cms/sanityRest';

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
  category?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  location: string;
  county: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  description: string;
  treesPlanted: number;
  schoolsInvolved: number;
}

type FilterType = 'all' | 'news' | 'projects';
type CategoryFilter = 'all' | string;

export function NewsListPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    Promise.all([
      // Fetch all news articles
      fetchSanity<NewsArticle[]>(
        `*[_type == "newsArticle"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          publishedAt,
          image{asset->{url}},
          excerpt,
          category
        }`
      ),
      // Fetch all projects
      fetchSanity<Project[]>(
        `*[_type == "project"] | order(title asc) {
          _id,
          title,
          slug,
          location,
          county,
          image{asset->{url}},
          description,
          treesPlanted,
          schoolsInvolved
        }`
      )
    ])
      .then(([news, proj]) => {
        setNewsArticles(news || []);
        setProjects(proj || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
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

  const getCategoryLabel = (category?: string) => {
    const categoryMap: Record<string, string> = {
      'program-update': 'Program Update',
      'event': 'Event',
      'award': 'Award',
      'partnership': 'Partnership',
      'impact-story': 'Impact Story',
      'announcement': 'Announcement'
    };
    return category ? categoryMap[category] || category : '';
  };

  // Get unique categories from news articles
  const categories = Array.from(new Set(newsArticles.map(a => a.category).filter(Boolean))) as string[];

  // Filter items based on selected filters
  const filteredNews = newsArticles.filter(article => {
    if (categoryFilter !== 'all' && article.category !== categoryFilter) return false;
    return true;
  });

  const displayItems = filter === 'news' ? filteredNews : filter === 'projects' ? projects : [...filteredNews, ...projects];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-gray-600 dark:text-gray-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-br from-purple-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            News, Events & Projects
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest developments, achievements, and initiatives from the Green Scout community across Kenya.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 md:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-10 shadow-sm dark:shadow-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Type Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('news')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${filter === 'news'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                News & Events
              </button>
              <button
                onClick={() => setFilter('projects')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${filter === 'projects'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Projects
              </button>
            </div>

            {/* Category Filter (only show for news) */}
            {filter !== 'projects' && categories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {getCategoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {displayItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayItems.map((item) => {
                const isNews = 'publishedAt' in item;
                return isNews ? (
                  // News Article Card
                  <article
                    key={item._id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {item.image?.asset?.url ? (
                        <img
                          src={item.image.asset.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400 text-4xl">📰</span>
                        </div>
                      )}
                      {item.category && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-300 mb-3">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatDate(item.publishedAt)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{item.excerpt}</p>
                      <Link
                        to={`/news/${item.slug.current}`}
                        className="inline-flex items-center text-purple-700 dark:text-purple-400 font-medium hover:text-purple-900 transition-colors"
                      >
                        Read more
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </article>
                ) : (
                  // Project Card
                  <article
                    key={item._id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {item.image?.asset?.url ? (
                        <img
                          src={item.image.asset.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 text-4xl">🌳</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                          Project
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-300 mb-3">
                        <span className="text-sm">📍 {item.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{item.description}</p>
                      <div className="flex gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-green-700 dark:text-green-400">{item.treesPlanted.toLocaleString()}</span>
                          <span className="text-gray-600 dark:text-gray-400">trees</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-purple-700 dark:text-purple-400">{item.schoolsInvolved}</span>
                          <span className="text-gray-600 dark:text-gray-400">schools</span>
                        </div>
                      </div>
                      <Link
                        to={`/projects/${item.slug.current}`}
                        className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:text-green-900 transition-colors"
                      >
                        View project
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

