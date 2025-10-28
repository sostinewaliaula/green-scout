const blockGetInvolved = {
  name: 'blockGetInvolved',
  title: 'Get Involved Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Get Involved',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Join our movement to create a greener Kenya. There are many ways you can contribute to the Green Scout initiative.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'options',
      title: 'Involvement Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Choose an icon name (e.g., UserPlus, Leaf, Handshake)',
              options: {
                list: [
                  { title: '👥 User Plus (Volunteer)', value: 'UserPlus' },
                  { title: '🌿 Leaf (Donate)', value: 'Leaf' },
                  { title: '🤝 Handshake (Partner)', value: 'Handshake' },
                  { title: '🌳 Tree (Plant)', value: 'TreeDeciduous' },
                  { title: '❤️ Heart (Support)', value: 'Heart' },
                  { title: '📚 Book (Educate)', value: 'BookOpen' },
                  { title: '💰 Dollar Sign (Donate)', value: 'DollarSign' },
                  { title: '🏫 School (School)', value: 'School' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'title',
              title: 'Option Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path (e.g., /contact, https://donate.example.com)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'colorTheme',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: [
                  { title: '🟣 Purple', value: 'purple' },
                  { title: '🟢 Green', value: 'green' }
                ]
              },
              initialValue: 'green',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
              theme: 'colorTheme'
            },
            prepare({ title, subtitle, icon, theme }) {
              const themeEmoji = theme === 'purple' ? '🟣' : '🟢';
              return {
                title: `${themeEmoji} ${title}`,
                subtitle: subtitle
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6)
    }
  ],
  preview: {
    select: {
      title: 'title',
      optionsCount: 'options'
    },
    prepare({ title, optionsCount }) {
      return {
        title: title || 'Get Involved Section',
        subtitle: `${optionsCount?.length || 0} involvement options`
      };
    }
  }
};

export default blockGetInvolved;

