const blockTreeOfMonth = {
  name: 'blockTreeOfMonth',
  title: 'Tree of the Month',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Tree of the Month'
    },
    {
      name: 'month',
      title: 'Month/Period',
      type: 'string',
      description: 'e.g., June 2023',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'treeName',
      title: 'Tree Name',
      type: 'string',
      description: 'Common name of the tree',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'scientificName',
      title: 'Scientific Name',
      type: 'string',
      description: 'e.g., Vitex keniensis'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the tree was planted',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'plantedDate',
      title: 'Planted Date',
      type: 'date',
      description: 'When the tree was planted',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Tree Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Tree Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description of the tree (can use multiple paragraphs)'
    },
    {
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
      description: 'Explain the ecological and cultural significance of this tree',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'treeName',
      subtitle: 'month',
      media: 'image'
    },
    prepare({ title, subtitle, media }: { title: string, subtitle: string, media: any }) {
      return {
        title: title || 'Tree of the Month',
        subtitle: subtitle || '',
        media
      };
    }
  }
};

export default blockTreeOfMonth;

