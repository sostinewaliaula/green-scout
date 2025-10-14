const blockTestimonial = {
  name: 'blockTestimonial',
  title: 'Testimonial Block',
  type: 'object',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
  ]
};

export default blockTestimonial;