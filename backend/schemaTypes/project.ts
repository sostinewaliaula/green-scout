const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Nairobi County',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'treesPlanted',
      title: 'Trees Planted',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'schoolsInvolved',
      title: 'Schools Involved',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project in the Featured Projects section',
      initialValue: false
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed project information (optional)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
      featured: 'featured'
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: subtitle,
        media: media
      }
    }
  }
};

export default project;

