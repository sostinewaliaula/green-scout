const blockGalleryHero = {
  name: 'blockGalleryHero',
  title: 'Gallery Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'GreenScout Gallery',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Showing all projects across Kenya',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'showCountyFilter',
      title: 'Show County Filter',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide the county filter dropdown'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }: { title: string, subtitle: string }) {
      return {
        title: title || 'Gallery Hero Section',
        subtitle: subtitle || ''
      };
    }
  }
};

export default blockGalleryHero;

