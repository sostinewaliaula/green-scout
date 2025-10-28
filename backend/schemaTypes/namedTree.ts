const namedTree = {
  name: 'namedTree',
  title: 'Named Tree',
  type: 'document',
  fields: [
    {
      name: 'treeName',
      title: 'Tree Name',
      type: 'string',
      description: 'e.g., Wangari\'s Legacy, Sarah\'s Hope',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'treeName',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'namedAfter',
      title: 'Named After (Person)',
      type: 'string',
      description: 'Full name of the person',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Designation',
      type: 'string',
      description: 'e.g., CEO, Manager, Senior, Volunteer',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Tree Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'treeSpecies',
      title: 'Tree Species',
      type: 'string',
      description: 'Scientific or common name of the tree species'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the tree is planted'
    },
    {
      name: 'plantedDate',
      title: 'Planted Date',
      type: 'date'
    },
    {
      name: 'story',
      title: 'Story/Description',
      type: 'text',
      description: 'The story behind this named tree and the person\'s contributions'
    },
    {
      name: 'featured',
      title: 'Featured Tree',
      type: 'boolean',
      description: 'Show this tree in the featured/highlighted section',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'treeName',
      subtitle: 'namedAfter',
      media: 'image'
    },
    prepare({ title, subtitle, media }: { title: string, subtitle: string, media: any }) {
      return {
        title: title || 'Unnamed Tree',
        subtitle: subtitle ? `Named after: ${subtitle}` : '',
        media
      };
    }
  }
};

export default namedTree;

