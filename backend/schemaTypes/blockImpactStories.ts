const blockImpactStories = {
  name: 'blockImpactStories',
  title: 'Impact Stories Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Real Stories',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'stories',
      title: 'Stories/Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              description: 'The testimonial quote',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              description: 'Name of the person giving the testimonial',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'authorRole',
              title: 'Author Role',
              type: 'string',
              description: 'e.g., Student, Teacher, GreenScout, Community Member',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'City or region, e.g., Nairobi, Kisumu, Eldoret',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'colorTheme',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: [
                  { title: 'Green', value: 'green' },
                  { title: 'Purple', value: 'purple' }
                ],
                layout: 'radio'
              },
              initialValue: 'green'
            }
          ],
          preview: {
            select: {
              quote: 'quote',
              authorName: 'authorName',
              authorRole: 'authorRole',
              location: 'location',
              colorTheme: 'colorTheme'
            },
            prepare({ quote, authorName, authorRole, location, colorTheme }: { quote: string, authorName: string, authorRole: string, location: string, colorTheme: string }) {
              const colorIndicator = colorTheme === 'green' ? '🟢' : '🟣';
              return {
                title: `${colorIndicator} ${authorName} - ${authorRole}`,
                subtitle: quote.substring(0, 80) + (quote.length > 80 ? '...' : '')
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(2).max(8).error('Please add between 2 and 8 stories.')
    }
  ],
  preview: {
    select: {
      title: 'title',
      stories: 'stories'
    },
    prepare({ title, stories }: { title: string, stories: any[] }) {
      return {
        title: title || 'Impact Stories Block',
        subtitle: `${stories?.length || 0} stories`
      };
    }
  }
};

export default blockImpactStories;

