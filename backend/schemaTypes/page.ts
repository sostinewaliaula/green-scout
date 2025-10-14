const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'blockAbout' },
        { type: 'blockMission' },
        { type: 'blockText' },
        { type: 'blockImage' },
        { type: 'blockGallery' },
        { type: 'blockStats' },
        { type: 'blockTestimonial' }
      ]
    }
  ]
};

export default page;