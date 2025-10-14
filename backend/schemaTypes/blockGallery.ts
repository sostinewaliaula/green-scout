const blockGallery = {
  name: 'blockGallery',
  title: 'Gallery Block',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }
  ]
};

export default blockGallery;
