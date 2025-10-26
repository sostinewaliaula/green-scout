const blockNews = {
  name: 'blockNews',
  title: 'Latest News Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Latest News'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Stay updated with the latest developments, achievements, and events from the Green Scout community.'
    },
    {
      name: 'showViewAllLink',
      title: 'Show "View all news" Link',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'articles',
      title: 'Featured Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'newsArticle' }]
        }
      ],
      validation: (Rule: any) => Rule.max(6).warning('Maximum 6 articles recommended for best display')
    }
  ],
  preview: {
    select: {
      title: 'title',
      articlesCount: 'articles.length'
    },
    prepare({ title, articlesCount }) {
      return {
        title: title || 'Latest News Block',
        subtitle: `${articlesCount || 0} articles`
      }
    }
  }
};

export default blockNews;

