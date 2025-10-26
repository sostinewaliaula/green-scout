const blockProjects = {
  name: 'blockProjects',
  title: 'Featured Projects Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Projects'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Explore some of our most impactful initiatives across Kenya, where Green Scouts are making a real difference in their communities.'
    },
    {
      name: 'showViewAllLink',
      title: 'Show "View all projects" Link',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
        }
      ],
      validation: (Rule: any) => Rule.max(6).warning('Maximum 6 projects recommended for best display')
    }
  ],
  preview: {
    select: {
      title: 'title',
      projectsCount: 'projects.length'
    },
    prepare({ title, projectsCount }) {
      return {
        title: title || 'Featured Projects Block',
        subtitle: `${projectsCount || 0} projects`
      }
    }
  }
};

export default blockProjects;

