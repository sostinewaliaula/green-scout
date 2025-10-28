const blockHeroCarousel = {
  name: 'blockHeroCarousel',
  title: 'Hero Carousel Block',
  type: 'object',
  fields: [
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically transition between slides',
      initialValue: true
    },
    {
      name: 'autoplayInterval',
      title: 'Autoplay Interval (seconds)',
      type: 'number',
      description: 'Time between slide transitions (in seconds)',
      initialValue: 6,
      validation: (Rule: any) => Rule.min(3).max(15)
    },
    {
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Slide Title',
              type: 'string',
              description: 'Main heading for this slide',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'text',
              rows: 2,
              description: 'Subtitle/tagline for this slide',
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
              name: 'overlayOpacity',
              title: 'Overlay Darkness',
              type: 'number',
              description: 'Adjust the darkness of the overlay (0-100)',
              initialValue: 50,
              validation: (Rule: any) => Rule.min(0).max(100)
            },
            {
              name: 'button',
              title: 'Call-to-Action Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  initialValue: 'Learn More'
                },
                {
                  name: 'link',
                  title: 'Button Link',
                  type: 'string',
                  initialValue: '/about'
                },
                {
                  name: 'showButton',
                  title: 'Show Button',
                  type: 'boolean',
                  initialValue: true
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'backgroundImage'
            },
            prepare({ title, subtitle, media }: { title: string, subtitle: string, media: any }) {
              return {
                title: title || 'Untitled Slide',
                subtitle: subtitle || '',
                media: media
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(10).error('Please add between 1 and 10 slides.')
    }
  ],
  preview: {
    select: {
      slides: 'slides'
    },
    prepare({ slides }: { slides: any[] }) {
      return {
        title: 'Hero Carousel Block',
        subtitle: `${slides?.length || 0} slides`
      };
    }
  }
};

export default blockHeroCarousel;

