import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'subtitle', 'duration', 'pricing'],
  },
  access: {
    read: () => true, // Public access for services
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Short service description',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug for linking to service',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed service description',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Graduation Cap', value: 'graduation-cap' },
        { label: 'Code', value: 'code' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Building', value: 'building' },
        { label: 'Coins', value: 'coins' },
      ],
      admin: {
        description: 'Icon to display with the service',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key features of the service',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Benefits clients receive',
      },
    },
    {
      name: 'deliverables',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'deliverable',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'What clients receive',
      },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'Estimated project duration',
      },
    },
    {
      name: 'pricing',
      type: 'text',
      required: true,
      admin: {
        description: 'Pricing information',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this service on homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}