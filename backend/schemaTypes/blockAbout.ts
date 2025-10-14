const blockAbout = {
  name: 'blockAbout',
  title: 'About Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string', initialValue: 'About Green Scout' },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'stats',
      title: 'Key Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', description: 'e.g., 5K+' },
            { name: 'label', title: 'Label', type: 'string', description: 'e.g., Trees Planted' },
            { name: 'sublabel', title: 'Sub Label', type: 'string', description: 'e.g., Since program launch' },
            {
              name: 'theme',
              title: 'Theme',
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
          ]
        }
      ]
    }
  ]
};

export default blockAbout;