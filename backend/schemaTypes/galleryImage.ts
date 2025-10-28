const galleryImage = {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Scout Trip', value: 'scout-trip' },
          { title: 'Tree Planting', value: 'tree-planting' },
          { title: 'Training Session', value: 'training' },
          { title: 'Community Event', value: 'community-event' },
          { title: 'Other', value: 'other' }
        ],
        layout: 'dropdown'
      },
      initialValue: 'scout-trip',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Specific location (e.g., Nyeri Town, Karura Forest)'
    },
    {
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'County name (e.g., Nyeri, Nairobi, Mombasa)'
    },
    {
      name: 'date',
      title: 'Date Taken',
      type: 'date',
      description: 'When was this photo taken?'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of what\'s happening in the photo'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Add tags for easier searching (e.g., scouts, trees, community)'
    },
    {
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'Who took this photo? (optional)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      date: 'date',
      media: 'image',
      category: 'category'
    },
    prepare({ title, location, date, media, category }: { title: string, location: string, date: string, media: any, category: string }) {
      const categoryEmoji = category === 'scout-trip' ? '🚌' : 
                           category === 'tree-planting' ? '🌳' : 
                           category === 'training' ? '📚' : 
                           category === 'community-event' ? '🤝' : '📸';
      return {
        title: `${categoryEmoji} ${title}`,
        subtitle: `${location} - ${date || 'No date'}`,
        media: media
      };
    }
  }
};

export default galleryImage;