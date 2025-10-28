const blockScoutHero = {
  name: 'blockScoutHero',
  title: 'Scout Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Meet Our Green Scouts',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: "Young environmental leaders shaping Kenya's sustainable future",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., 1,200+',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., Active Scouts',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(4)
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    }
  }
};

export default blockScoutHero;

