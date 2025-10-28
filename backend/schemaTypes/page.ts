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
        { type: 'blockStats' },
        { type: 'blockProjects' },
        { type: 'blockTestimonials' },
        { type: 'blockNews' },
        { type: 'blockCta' },
        { type: 'blockScoutHero' },
        { type: 'blockScoutOfMonth' },
        { type: 'blockScoutProgram' },
        { type: 'blockScoutActivities' },
        { type: 'blockScoutTestimonials' },
        { type: 'blockJoinScout' },
        { type: 'blockTreeOfMonth' },
        { type: 'blockNamedTrees' },
        { type: 'blockImpactMap' },
        { type: 'blockImpactHero' },
        { type: 'blockObjectives' },
        { type: 'blockImpactNumbers' },
        { type: 'blockImpactTimeline' },
        { type: 'blockText' },
        { type: 'blockImage' },
        { type: 'blockGallery' }
      ]
    }
  ]
};

export default page;