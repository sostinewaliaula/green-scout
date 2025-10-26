const blockTestimonials = {
  name: 'blockTestimonials',
  title: 'Testimonials Carousel',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What People Say'
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'title',
              title: 'Title/Role',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'image'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(10)
    }
  ],
  preview: {
    select: {
      title: 'title',
      testimonialsCount: 'testimonials.length'
    },
    prepare({ title, testimonialsCount }) {
      return {
        title: title || 'Testimonials Carousel',
        subtitle: `${testimonialsCount || 0} testimonials`
      }
    }
  }
};

export default blockTestimonials;

