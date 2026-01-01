import { GeocodeHelper } from '../components/GeocodeHelper';

const blockImpactMap = {
  name: 'blockImpactMap',
  title: 'Impact Map Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Impact Across Kenya'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Green Scout has planted trees in schools and communities throughout Kenya. Explore our growing forest network below.'
    },
    {
      name: 'locations',
      title: 'Planting Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'plantingLocation',
              title: '📍 Planting Location',
              type: 'object',
              description: 'Search for a location in Kenya and it will automatically populate the name and coordinates.',
              components: {
                input: GeocodeHelper
              },
              fields: [
                {
                  name: 'address',
                  title: 'Location Name',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'lat',
                  title: 'Latitude',
                  type: 'number',
                  validation: (Rule: any) => Rule.required().min(-90).max(90)
                },
                {
                  name: 'lng',
                  title: 'Longitude',
                  type: 'number',
                  validation: (Rule: any) => Rule.required().min(-180).max(180)
                }
              ]
            },
            {
              name: 'treeName',
              title: 'Tree/Project Name',
              type: 'string',
              description: 'e.g., Acacia - Sarah\'s Hope',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Brief description of the planting project'
            },
            {
              name: 'treesPlanted',
              title: 'Trees Planted',
              type: 'number',
              description: 'Number of trees planted at this location'
            },
            {
              name: 'plantedDate',
              title: 'Planting Date',
              type: 'date'
            },
            {
              name: 'image',
              title: 'Location Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional image for this location'
            },
            {
              name: 'detailsLink',
              title: 'Details Link',
              type: 'string',
              description: 'Optional link to more details about this project'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'treeName',
              media: 'image'
            },
            prepare({ title, subtitle, media }: { title: string, subtitle: string, media: any }) {
              return {
                title: title || 'Location',
                subtitle: subtitle || '',
                media
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).error('Please add at least one location.')
    },
    {
      name: 'defaultCenter',
      title: 'Map Center',
      type: 'object',
      description: 'Default center position of the map',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          initialValue: -0.0236
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          initialValue: 37.9062
        }
      ]
    },
    {
      name: 'defaultZoom',
      title: 'Default Zoom Level',
      type: 'number',
      description: 'Initial zoom level (1-18, where 18 is most zoomed in)',
      initialValue: 6,
      validation: (Rule: any) => Rule.min(1).max(18)
    }
  ],
  preview: {
    select: {
      title: 'title',
      locations: 'locations'
    },
    prepare({ title, locations }: { title: string, locations: any[] }) {
      return {
        title: title || 'Impact Map Block',
        subtitle: `${locations?.length || 0} locations`
      };
    }
  }
};

export default blockImpactMap;

