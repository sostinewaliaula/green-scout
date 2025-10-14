const blockStats = {
  name: 'blockStats',
  title: 'Stats Block',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'icon', title: 'Icon', type: 'string' }
          ]
        }
      ]
    }
  ]
};

export default blockStats;