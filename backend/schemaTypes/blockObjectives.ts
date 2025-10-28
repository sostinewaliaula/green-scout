const blockObjectives = {
  name: 'blockObjectives',
  title: 'Objectives Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Objectives',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon/Emoji',
              type: 'string',
              description: 'Emoji or icon name (e.g., 🌱, 🌳, 📚, 🤝, 🦋)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'title',
              title: 'Objective Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
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
              title: 'title',
              subtitle: 'description',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }: { title: string, subtitle: string, icon: string }) {
              return {
                title: `${icon} ${title}`,
                subtitle: subtitle
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(8).error('Please add between 1 and 8 objectives.')
    }
  ],
  preview: {
    select: {
      title: 'title',
      objectives: 'objectives'
    },
    prepare({ title, objectives }: { title: string, objectives: any[] }) {
      return {
        title: title || 'Objectives Block',
        subtitle: `${objectives?.length || 0} objectives`
      };
    }
  }
};

export default blockObjectives;

