const blockImpactHero = {
  name: 'blockImpactHero',
  title: 'Impact Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'The Impact of GreenScout',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Empowering youth, restoring forests, and building a greener Kenya—one tree at a time.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the hero section'
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Darkness of the overlay (0-100)',
      initialValue: 50,
      validation: (Rule: any) => Rule.min(0).max(100)
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    }
  }
};

export default blockImpactHero;

