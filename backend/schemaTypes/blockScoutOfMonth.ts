const blockScoutOfMonth = {
  name: 'blockScoutOfMonth',
  title: 'Scout of the Month',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Scout of the Month',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'month',
      title: 'Month/Period',
      type: 'string',
      description: 'e.g., June 2023',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'scoutName',
      title: 'Scout Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'school',
      title: 'School/Organization',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Scout Photo',
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
      rows: 4,
      description: 'Brief description of the scout\'s achievements',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6)
    },
    {
      name: 'quote',
      title: 'Quote from Scout',
      type: 'text',
      rows: 2,
      description: 'Inspirational quote from the featured scout'
    }
  ],
  preview: {
    select: {
      title: 'scoutName',
      subtitle: 'month',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Scout of the Month: ${title}`,
        subtitle: subtitle,
        media: media
      }
    }
  }
};

export default blockScoutOfMonth;

