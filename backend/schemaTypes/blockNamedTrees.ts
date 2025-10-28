const blockNamedTrees = {
  name: 'blockNamedTrees',
  title: 'Named Trees Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Named Trees'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'These special trees have been named after scouts and WSPU members who have made outstanding contributions to environmental conservation.'
    },
    {
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Show Selected Trees', value: 'selected' },
          { title: 'Show All Named Trees', value: 'all' },
          { title: 'Show Featured Trees Only', value: 'featured' }
        ],
        layout: 'radio'
      },
      initialValue: 'all'
    },
    {
      name: 'selectedTrees',
      title: 'Selected Trees',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'namedTree' }] }],
      description: 'Only used when Display Mode is "Show Selected Trees"',
      hidden: ({ parent }: any) => parent?.displayMode !== 'selected'
    },
    {
      name: 'maxTreesToShow',
      title: 'Maximum Trees to Display',
      type: 'number',
      description: 'Limit the number of trees shown (leave empty to show all)',
      validation: (Rule: any) => Rule.min(1).max(20)
    },
    {
      name: 'showViewAllButton',
      title: 'Show "View All Named Trees" Button',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'viewAllButtonText',
      title: 'View All Button Text',
      type: 'string',
      initialValue: 'View All Named Trees',
      hidden: ({ parent }: any) => !parent?.showViewAllButton
    },
    {
      name: 'viewAllButtonLink',
      title: 'View All Button Link',
      type: 'string',
      initialValue: '/named-trees',
      hidden: ({ parent }: any) => !parent?.showViewAllButton
    }
  ],
  preview: {
    select: {
      title: 'title',
      displayMode: 'displayMode',
      selectedTrees: 'selectedTrees'
    },
    prepare({ title, displayMode, selectedTrees }: { title: string, displayMode: string, selectedTrees: any[] }) {
      let subtitle = '';
      if (displayMode === 'selected') {
        subtitle = `Selected: ${selectedTrees?.length || 0} trees`;
      } else if (displayMode === 'featured') {
        subtitle = 'Showing featured trees';
      } else {
        subtitle = 'Showing all trees';
      }
      return {
        title: title || 'Named Trees Block',
        subtitle
      };
    }
  }
};

export default blockNamedTrees;

