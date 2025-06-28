import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    group: 'Configuration',
  },
  access: {
    read: () => true, // Public access for site settings
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'general',
      type: 'group',
      label: 'General Settings',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'Noscere',
          admin: {
            description: 'The name of your site',
          },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, turning emerging possibilities into competitive advantage.',
          admin: {
            description: 'Default meta description for the site',
          },
        },
        {
          name: 'siteUrl',
          type: 'text',
          required: true,
          defaultValue: 'https://noscere.com',
          admin: {
            description: 'The full URL of your site',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Site logo',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Site favicon',
          },
        },
      ],
    },
    {
      name: 'company',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'foundedYear',
          type: 'number',
          defaultValue: 2019,
          admin: {
            description: 'Year the company was founded',
          },
        },
        {
          name: 'mission',
          type: 'textarea',
          defaultValue: 'To help enterprises truly understand blockchain technology, not just implement it.',
          admin: {
            description: 'Company mission statement',
          },
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Company statistics (e.g., "Years in Blockchain", "8+")',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Primary contact email',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Primary contact phone',
          },
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'street',
              type: 'text',
            },
            {
              name: 'city',
              type: 'text',
            },
            {
              name: 'state',
              type: 'text',
            },
            {
              name: 'postalCode',
              type: 'text',
            },
            {
              name: 'country',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn company page URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub organization URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube channel URL',
          },
        },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      label: 'Site Navigation',
      fields: [
        {
          name: 'header',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
          admin: {
            description: 'Main navigation menu items',
          },
        },
        {
          name: 'footer',
          type: 'array',
          fields: [
            {
              name: 'section',
              type: 'text',
              required: true,
              admin: {
                description: 'Section title (e.g., "Services", "Company")',
              },
            },
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
          admin: {
            description: 'Footer navigation sections',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'defaultMetaImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default Open Graph image for social sharing',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Default keywords for the site (comma-separated)',
          },
        },
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            description: 'Google Analytics tracking ID',
          },
        },
      ],
    },
  ],
}