const blockScoutActivities = {
  name: 'blockScoutActivities',
  title: 'Scout Activities & Achievements',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Scout Activities & Achievements',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      initialValue: "Green Scouts participate in a diverse range of activities that build environmental knowledge, leadership skills, and make a tangible impact on Kenya's ecosystems.",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Activity Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'image',
              title: 'Activity Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'frequency',
              title: 'Frequency',
              type: 'string',
              description: 'e.g., Monthly, Weekly, Quarterly',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'participants',
              title: 'Participants',
              type: 'string',
              description: 'e.g., All levels, Forest Guardian',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'locations',
              title: 'Locations',
              type: 'string',
              description: 'e.g., Various counties, Nature reserves',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              frequency: 'frequency'
            },
            prepare({ title, media, frequency }) {
              return {
                title: title,
                subtitle: `Frequency: ${frequency}`,
                media: media
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(8)
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Achievement Value',
              type: 'string',
              description: 'e.g., 120+, 85%, 15',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Green', value: 'green' },
                  { title: 'Purple', value: 'purple' }
                ],
                layout: 'radio'
              },
              initialValue: 'green'
            }
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6)
    }
  ],
  preview: {
    select: {
      title: 'title',
      activitiesCount: 'activities.length',
      achievementsCount: 'achievements.length'
    },
    prepare({ title, activitiesCount, achievementsCount }) {
      return {
        title: title || 'Scout Activities & Achievements',
        subtitle: `${activitiesCount || 0} activities, ${achievementsCount || 0} achievements`
      }
    }
  }
};

export default blockScoutActivities;

