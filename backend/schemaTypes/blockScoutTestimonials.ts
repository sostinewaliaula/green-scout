const blockScoutTestimonials = {
  name: 'blockScoutTestimonials',
  title: 'Scout Testimonials Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'In Their Own Words'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Hear directly from our Green Scouts about their experiences, challenges, and the impact the program has had on their lives and communities.'
    },
    {
      name: 'testimonials',
      title: 'Scout Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              description: 'The scout\'s testimonial'
            },
            {
              name: 'scoutName',
              title: 'Scout Name',
              type: 'string'
            },
            {
              name: 'scoutLevel',
              title: 'Scout Level',
              type: 'string',
              description: 'e.g., Sapling Scout, Seedling Scout, etc.'
            },
            {
              name: 'age',
              title: 'Age',
              type: 'number'
            },
            {
              name: 'school',
              title: 'School',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'scoutName',
              subtitle: 'scoutLevel',
              media: 'image'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(3).max(6).error('Please add between 3 and 6 testimonials.')
    },
    {
      name: 'leaderQuote',
      title: 'Scout Leader Quote (Optional)',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text'
        },
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'title',
          title: 'Title/Position',
          type: 'string',
          description: 'e.g., Scout Leader, Mombasa County'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials'
    },
    prepare({ title, testimonials }: { title: string, testimonials: any[] }) {
      return {
        title: title || 'Scout Testimonials Block',
        subtitle: `${testimonials?.length || 0} testimonials`
      };
    }
  }
};

export default blockScoutTestimonials;

