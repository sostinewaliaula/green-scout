const blockJoinScout = {
  name: 'blockJoinScout',
  title: 'Join Scout Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Become a Green Scout'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'Join a community of young environmental leaders making a real difference in Kenya. The Green Scout program is open to students aged 8-18 who are passionate about creating a sustainable future.'
    },
    {
      name: 'benefitsHeading',
      title: 'Benefits Section Heading',
      type: 'string',
      initialValue: 'Benefits of Joining'
    },
    {
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of benefits for joining the program'
    },
    {
      name: 'applyButton',
      title: 'Apply Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Apply to Join'
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
      name: 'stepsHeading',
      title: 'Steps Section Heading',
      type: 'string',
      initialValue: 'How to Join'
    },
    {
      name: 'steps',
      title: 'Join Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text'
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
      validation: (Rule: any) => Rule.max(6).error('Please limit to 6 steps.')
    },
    {
      name: 'organizationsBox',
      title: 'Schools & Organizations Box',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Organizations Box',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'heading',
          title: 'Box Heading',
          type: 'string',
          initialValue: 'For Schools & Organizations'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Interested in establishing a Green Scout program at your school or organization? We provide training, resources, and ongoing support.'
        },
        {
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          initialValue: 'Learn more about partnerships'
        },
        {
          name: 'linkUrl',
          title: 'Link URL',
          type: 'string',
          initialValue: '/get-involved'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
};

export default blockJoinScout;

