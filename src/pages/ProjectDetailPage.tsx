import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPinIcon, ArrowLeftIcon, TreeDeciduousIcon, SchoolIcon } from 'lucide-react';
import { fetchSanity } from '../cms/sanityRest';
import { PortableText } from '@portabletext/react';

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
  fullDescription?: any[];
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!slug) return;

    console.log('Fetching project with slug:', slug);

    Promise.all([
      // Fetch the project
      fetchSanity<Project>(
        `*[_type == "project" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          location,
          county,
          image{asset->{url}},
          description,
          treesPlanted,
          schoolsInvolved,
          fullDescription
        }`,
        { slug }
      ),
      // Fetch related projects (same county, exclude current)
      fetchSanity<Project[]>(
        `*[_type == "project" && slug.current != $slug] | order(treesPlanted desc) [0...3] {
          _id,
          title,
          slug,
          location,
          county,
          image{asset->{url}},
          description,
          treesPlanted,
          schoolsInvolved
        }`,
        { slug }
      )
    ])
      .then(([projectData, related]) => {
        console.log('Project data:', projectData);
        console.log('Related projects:', related);
        setProject(projectData || null);
        setRelatedProjects(related || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-gray-600 dark:text-gray-400">Loading project...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
            <Link
              to="/news"
              className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:text-green-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to All Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Project Header */}
      <article className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/news"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to All Items
          </Link>

          {/* Project Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full">
              Project
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <span className="text-lg">{project.location}</span>
          </div>

          {/* Featured Image */}
          {project.image?.asset?.url && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={project.image.asset.url}
                alt={project.title}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 flex items-center gap-4">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <TreeDeciduousIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-800">
                  {project.treesPlanted.toLocaleString()}
                </div>
                <div className="text-gray-700 dark:text-gray-300">Trees Planted</div>
              </div>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 flex items-center gap-4">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <SchoolIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-800">
                  {project.schoolsInvolved}
                </div>
                <div className="text-gray-700 dark:text-gray-300">Schools Involved</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed border-l-4 border-green-600 pl-6 py-2 bg-green-50">
            {project.description}
          </div>

          {/* Full Description */}
          {project.fullDescription && project.fullDescription.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Details</h2>
              <PortableText value={project.fullDescription} />
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 italic">
              No additional details available for this project.
            </div>
          )}
        </div>
      </article>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-800 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((related) => (
                <Link
                  key={related._id}
                  to={`/projects/${related.slug.current}`}
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
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <span className="text-green-600 text-3xl">🌳</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="text-xs">{related.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="flex gap-3 text-sm">
                      <span className="text-green-700 dark:text-green-400 font-semibold">
                        {related.treesPlanted.toLocaleString()} trees
                      </span>
                      <span className="text-purple-700 dark:text-purple-400 font-semibold">
                        {related.schoolsInvolved} schools
                      </span>
                    </div>
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

