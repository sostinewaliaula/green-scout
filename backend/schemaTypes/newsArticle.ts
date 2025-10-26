const newsArticle = {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for preview cards (max 200 characters)',
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'content',
      title: 'Article Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full article content'
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show this article in the Latest News section on homepage',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Program Update', value: 'program-update' },
          { title: 'Event', value: 'event' },
          { title: 'Award', value: 'award' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Impact Story', value: 'impact-story' },
          { title: 'Announcement', value: 'announcement' }
        ]
      }
    }
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'publishedAt',
      featured: 'featured'
    },
    prepare({ title, media, date, featured }) {
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) : '';
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: dateStr,
        media: media
      }
    }
  }
};

export default newsArticle;

