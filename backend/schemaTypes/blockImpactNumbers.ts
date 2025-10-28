const blockImpactNumbers = {
  name: 'blockImpactNumbers',
  title: 'Impact Numbers Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Impact in Numbers',
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
              description: 'The number or percentage (e.g., 5,432 or 85%)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the statistic',
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
              value: 'value',
              label: 'label',
              colorTheme: 'colorTheme'
            },
            prepare({ value, label, colorTheme }: { value: string, label: string, colorTheme: string }) {
              return {
                title: `${value} - ${label}`,
                subtitle: colorTheme === 'green' ? '🟢 Green' : '🟣 Purple'
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(2).max(6).error('Please add between 2 and 6 statistics.')
    }
  ],
  preview: {
    select: {
      title: 'title',
      stats: 'stats'
    },
    prepare({ title, stats }: { title: string, stats: any[] }) {
      return {
        title: title || 'Impact Numbers Block',
        subtitle: `${stats?.length || 0} statistics`
      };
    }
  }
};

export default blockImpactNumbers;

