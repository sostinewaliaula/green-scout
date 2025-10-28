const blockScoutProgram = {
  name: 'blockScoutProgram',
  title: 'Scout Program Levels',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'The Green Scout Program',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Our structured program helps young people progress from beginners to environmental leaders through education, hands-on experience, and mentorship.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'levels',
      title: 'Program Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Level Name',
              type: 'string',
              description: 'e.g., Seedling Scout, Sapling Scout',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name: leaf, sprout, tree, shield',
              options: {
                list: [
                  { title: 'Leaf 🌱', value: 'leaf' },
                  { title: 'Sprout 🌿', value: 'sprout' },
                  { title: 'Tree 🌳', value: 'tree' },
                  { title: 'Shield 🛡️', value: 'shield' }
                ]
              },
              initialValue: 'leaf'
            },
            {
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: [
                  { title: 'Green', value: 'green' },
                  { title: 'Purple', value: 'purple' }
                ],
                layout: 'radio'
              },
              initialValue: 'green',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'requirements',
              title: 'Requirements',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.min(1).max(8)
            }
          ],
          preview: {
            select: {
              title: 'name',
              color: 'color'
            },
            prepare({ title, color }) {
              return {
                title: title,
                subtitle: `Color: ${color}`
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6).warning('Maximum 6 levels recommended for best display')
    }
  ],
  preview: {
    select: {
      title: 'title',
      levelsCount: 'levels.length'
    },
    prepare({ title, levelsCount }) {
      return {
        title: title || 'Scout Program Levels',
        subtitle: `${levelsCount || 0} levels`
      }
    }
  }
};

export default blockScoutProgram;

