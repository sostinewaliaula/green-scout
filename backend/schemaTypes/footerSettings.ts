const footerSettings = {
  name: 'footerSettings',
  title: 'Footer Settings',
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
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          initialValue: 'A WSPU Kenya Environmental Initiative',
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'Full URL including https://'
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          description: 'Full URL including https://'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          description: 'Full URL including https://'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          description: 'Full URL including https://'
        }
      ]
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'greenscout@wspukenya.org',
          validation: (Rule: any) => Rule.required().email()
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          initialValue: '+254 700 123 456',
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Internal link (e.g., /about) or external (https://...)',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(10)
    },
    {
      name: 'newsletter',
      title: 'Newsletter Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Newsletter Signup',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'heading',
          title: 'Newsletter Heading',
          type: 'string',
          initialValue: 'Newsletter'
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Subscribe to receive updates about our activities and impact.'
        },
        {
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe'
        }
      ]
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Use {year} as placeholder for current year',
      initialValue: '© {year} Green Scout - WSPU Kenya. All rights reserved.'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
};

export default footerSettings;

