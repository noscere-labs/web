import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        crop: 'center',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        crop: 'center',
      },
    ],
  },
  access: {
    read: () => true, // Public access for media files
    create: ({ req: { user } }) => !!user, // Only authenticated users can upload
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
  ],
}