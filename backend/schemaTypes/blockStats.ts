const blockStats = {
  name: 'blockStats',
  title: 'Stats Block',
  type: 'object',
  fields: [
    { 
      name: 'title', 
      title: 'Title', 
      type: 'string',
      description: 'Main heading for the stats section (e.g., "Our Impact at a Glance")'
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'value', 
              title: 'Value', 
              type: 'string',
              description: 'The stat number (e.g., "5,432" or "1,200+")'
            },
            { 
              name: 'label', 
              title: 'Label', 
              type: 'string',
              description: 'Description of the stat (e.g., "Trees Planted")'
            },
            { 
              name: 'icon', 
              title: 'Icon', 
              type: 'string',
              description: 'Icon name: tree, leaf, users, school, globe, award. Or use emoji: 🌳 👥 🏫 🌍 🏆',
              placeholder: 'tree'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Stat',
                subtitle: `${subtitle || ''} ${icon ? `(${icon})` : ''}`,
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      statsCount: 'stats.length'
    },
    prepare({ title, statsCount }) {
      return {
        title: title || 'Stats Block',
        subtitle: `${statsCount || 0} stats`
      }
    }
  }
};

export default blockStats;