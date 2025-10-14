const blockMission = {
  name: 'blockMission',
  title: 'Mission & Vision Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our Mission & Vision' },
    { name: 'missionTitle', title: 'Mission Title', type: 'string', initialValue: 'Our Mission' },
    { name: 'missionBody', title: 'Mission Body', type: 'text' },
    { name: 'visionTitle', title: 'Vision Title', type: 'string', initialValue: 'Our Vision' },
    { name: 'visionBody', title: 'Vision Body', type: 'text' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' }
    }
  ]
};

export default blockMission;