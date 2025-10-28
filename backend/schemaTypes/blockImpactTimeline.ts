const blockImpactTimeline = {
  name: 'blockImpactTimeline',
  title: 'Impact Timeline Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How We Measure Impact',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'steps',
      title: 'Timeline Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              description: 'Sequential number for this step',
              validation: (Rule: any) => Rule.required().min(1)
            },
            {
              name: 'title',
              title: 'Step Title',
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
              stepNumber: 'stepNumber',
              title: 'title',
              description: 'description',
              colorTheme: 'colorTheme'
            },
            prepare({ stepNumber, title, description, colorTheme }: { stepNumber: number, title: string, description: string, colorTheme: string }) {
              const colorIndicator = colorTheme === 'green' ? '🟢' : '🟣';
              return {
                title: `${stepNumber}. ${colorIndicator} ${title}`,
                subtitle: description
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(3).max(10).error('Please add between 3 and 10 timeline steps.')
    }
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps'
    },
    prepare({ title, steps }: { title: string, steps: any[] }) {
      return {
        title: title || 'Impact Timeline Block',
        subtitle: `${steps?.length || 0} steps`
      };
    }
  }
};

export default blockImpactTimeline;

