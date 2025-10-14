import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function FeaturedProjectsSection() {
  const projects = [{
    title: 'School Forest Initiative',
    location: 'Nairobi County',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Creating mini-forests within school compounds to serve as outdoor classrooms and biodiversity hotspots.',
    trees: 1250,
    schools: 15
  }, {
    title: 'Urban Greening Project',
    location: 'Mombasa County',
    image: 'https://images.unsplash.com/photo-1616128417859-6e1c89e98e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Transforming urban spaces with indigenous trees to combat the heat island effect and improve air quality.',
    trees: 850,
    schools: 8
  }, {
    title: 'Watershed Restoration',
    location: 'Kisumu County',
    image: 'https://images.unsplash.com/photo-1565118531796-763e5082d113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: "Planting trees along Lake Victoria's watershed to prevent soil erosion and protect water sources.",
    trees: 1800,
    schools: 12
  }];
  return <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              Explore some of our most impactful initiatives across Kenya, where
              Green Scouts are making a real difference in their communities.
            </p>
          </div>
          <Link to="/impact" className="hidden md:flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors">
            View all projects
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {project.location}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">
                      {project.trees}
                    </p>
                    <p className="text-sm text-gray-600">Trees Planted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      {project.schools}
                    </p>
                    <p className="text-sm text-gray-600">Schools</p>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/impact" className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors">
            View all projects
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>;
}