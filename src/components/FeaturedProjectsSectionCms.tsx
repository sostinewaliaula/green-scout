import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

interface Project {
  _id: string;
  title: string;
  location: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  description: string;
  treesPlanted: number;
  schoolsInvolved: number;
}

interface ProjectsBlock {
  _type: 'blockProjects';
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  projects?: Project[];
}

export function FeaturedProjectsSectionCms() {
  const [projectsBlock, setProjectsBlock] = useState<ProjectsBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Home page and get the blockProjects
    sanityClient
      .fetch<{ content: ProjectsBlock[] }>(
        `*[_type == "page" && slug.current == "/"][0]{
          content[_type == "blockProjects"]{
            _type,
            title,
            subtitle,
            showViewAllLink,
            projects[]->{
              _id,
              title,
              location,
              image{asset->{url}},
              description,
              treesPlanted,
              schoolsInvolved
            }
          }
        }`
      )
      .then((data) => {
        const projectBlock = data?.content?.[0];
        setProjectsBlock(projectBlock || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600 dark:text-gray-400">Loading featured projects...</div>
        </div>
      </section>
    );
  }

  // If no projects found, show empty state
  if (!projectsBlock || !projectsBlock.projects || projectsBlock.projects.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Featured projects will appear here once added in Sanity Studio.
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
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
              {projectsBlock.title || 'Featured Projects'}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              {projectsBlock.subtitle || 'Explore some of our most impactful initiatives across Kenya.'}
            </p>
          </div>
          {projectsBlock.showViewAllLink && (
            <Link
              to="/impact"
              className="hidden md:flex items-center text-purple-700 dark:text-purple-400 font-medium hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
            >
              View all projects
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsBlock.projects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                {project.image?.asset?.url ? (
                  <img
                    src={project.image.asset.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/50 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-4xl">🌳</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs rounded-full whitespace-nowrap ml-2">
                    {project.location}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {project.treesPlanted.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                      {project.schoolsInvolved}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Schools</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {projectsBlock.showViewAllLink && (
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/impact"
              className="inline-flex items-center text-purple-700 dark:text-purple-400 font-medium hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
            >
              View all projects
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
