import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, ArrowLeftIcon, ShareIcon } from 'lucide-react';
import { fetchSanity } from '../cms/sanityRest';
import { PortableText } from '@portabletext/react';

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
  content?: any[];
}

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (!slug) return;

    console.log('Fetching article with slug:', slug);

    Promise.all([
      // Fetch the article
      fetchSanity<NewsArticle>(
        `*[_type == "newsArticle" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          publishedAt,
          image{asset->{url}},
          excerpt,
          category,
          content
        }`,
        { slug }
      ),
      // Fetch related articles (same category, exclude current)
      fetchSanity<NewsArticle[]>(
        `*[_type == "newsArticle" && slug.current != $slug] | order(publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          publishedAt,
          image{asset->{url}},
          excerpt,
          category
        }`,
        { slug }
      )
    ])
      .then(([articleData, related]) => {
        console.log('Article data:', articleData);
        console.log('Related articles:', related);
        setArticle(articleData || null);
        setRelatedArticles(related || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching article:', err);
        setLoading(false);
      });
  }, [slug]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-gray-600 dark:text-gray-400">Loading article...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <Link
              to="/news"
              className="inline-flex items-center text-purple-700 dark:text-purple-400 font-medium hover:text-purple-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Article Header */}
      <article className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/news"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to News
          </Link>

          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <span className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full">
                {getCategoryLabel(article.category)}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          {/* Featured Image */}
          {article.image?.asset?.url && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={article.image.asset.url}
                alt={article.title}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <div className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium border-l-4 border-purple-600 pl-6 py-2 bg-purple-50">
            {article.excerpt}
          </div>

          {/* Article Content */}
          {article.content && article.content.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <PortableText value={article.content} />
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 italic">
              No additional content available for this article.
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-800 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  to={`/news/${related.slug.current}`}
                  className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-40 overflow-hidden">
                    {related.image?.asset?.url ? (
                      <img
                        src={related.image.asset.url}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                        <span className="text-purple-600 text-3xl">📰</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 mb-2">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span className="text-xs">{formatDate(related.publishedAt)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

