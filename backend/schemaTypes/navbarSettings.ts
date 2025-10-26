const navbarSettings = {
  name: 'navbarSettings',
  title: 'Navbar Settings',
  type: 'document',
  // Singleton - only one document
  __experimental_actions: ['update', 'publish' /* 'create', 'delete' */],
  fields: [
    {
      name: 'branding',
      title: 'Branding',
      type: 'object',
      fields: [
        {
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          initialValue: 'Green Scout',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'logo',
          title: 'Logo Image (Optional)',
          type: 'image',
          description: 'Upload a logo image. If not provided, site name will be used.',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Menu Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'path',
              title: 'Path/URL',
              type: 'string',
              description: 'Internal path (e.g., /about) or external URL (https://...)',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'isButton',
              title: 'Display as Button',
              type: 'boolean',
              description: 'Show this item as a highlighted button (e.g., "Get Involved")',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'path',
              isButton: 'isButton'
            },
            prepare({ title, subtitle, isButton }) {
              return {
                title: `${isButton ? '🔘 ' : ''}${title}`,
                subtitle: subtitle
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(8).warning('Maximum 8 navigation items recommended for best display')
    },
    {
      name: 'scrollToTopButton',
      title: 'Scroll to Top Button',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Scroll to Top Button',
          type: 'boolean',
          initialValue: true
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Navbar Settings'
      }
    }
  }
};

export default navbarSettings;

