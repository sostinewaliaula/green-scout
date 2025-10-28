const blockImpactCta = {
  name: 'blockImpactCta',
  title: 'Impact CTA Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Join the Green Movement',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'Be part of a generation that\'s making a real difference. Plant a tree, share your story, or support GreenScout\'s mission today!',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Get Involved',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/get-involved',
      description: 'URL the button links to',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description'
    },
    prepare({ title, description }: { title: string, description: string }) {
      return {
        title: title || 'Impact CTA Block',
        subtitle: description || ''
      };
    }
  }
};

export default blockImpactCta;

