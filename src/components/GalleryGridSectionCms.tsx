import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

type ImageAsset = { asset?: { url?: string } };

interface Project {
  _id: string;
  title: string;
  location: string;
  county: string;
  image?: ImageAsset;
  slug?: { current: string };
}

interface GalleryGridSectionCmsProps {
  selectedCounty: string;
}

export function GalleryGridSectionCms({ selectedCounty }: GalleryGridSectionCmsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let query = `*[_type == "project"`;
        
        if (selectedCounty && selectedCounty !== 'All Counties') {
          query += ` && county == "${selectedCounty}"`;
        }
        
        query += `]{
          _id,
          title,
          location,
          county,
          image{asset->{url}},
          slug
        } | order(title asc)`;

        const data = await sanityClient.fetch(query);
        setProjects(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCounty]);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          Loading projects...
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-600 px-4">
          {selectedCounty === 'All Counties' 
            ? 'No projects found. Please add projects in Sanity Studio.'
            : `No projects found in ${selectedCounty}.`}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                {project.image?.asset?.url ? (
                  <img
                    src={project.image.asset.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <span className="text-6xl">🌳</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

