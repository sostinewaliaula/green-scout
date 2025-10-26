const blockCta = {
  name: 'blockCta',
  title: 'Call-to-Action Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Join the Green Scout Movement Today',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: "Be part of Kenya's youth-led environmental transformation. Together, we can create a greener, more sustainable future.",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Become a Green Scout'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/get-involved'
        }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Support Our Mission'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/get-involved'
        }
      ]
    },
    {
      name: 'audiences',
      title: 'Target Audiences',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Audience Title',
              type: 'string',
              description: 'e.g., For Students, For Schools, For Organizations',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(4).warning('Maximum 4 audience sections recommended')
    }
  ],
  preview: {
    select: {
      title: 'title',
      audiencesCount: 'audiences.length'
    },
    prepare({ title, audiencesCount }) {
      return {
        title: title || 'Call-to-Action Block',
        subtitle: `${audiencesCount || 0} audience sections`
      }
    }
  }
};

export default blockCta;

