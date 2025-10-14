const galleryImage = {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'county', title: 'County', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
  ]
};

export default galleryImage;