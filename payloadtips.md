# PayloadCMS Comprehensive Knowledge Base

A complete reference document distilling essential knowledge from PayloadCMS official guides, organized for developers building applications with this modern headless CMS.

---

## Table of Contents

1. [Introduction & Overview](#introduction--overview)
2. [Authentication & Security](#authentication--security)
3. [Fields & Data Modeling](#fields--data-modeling)
4. [Collections & Globals](#collections--globals)
5. [APIs & Integration](#apis--integration)
6. [Rich Text Editor](#rich-text-editor)
7. [Admin Panel Customization](#admin-panel-customization)
8. [Hooks & Advanced Patterns](#hooks--advanced-patterns)
9. [Plugins & Extensions](#plugins--extensions)
10. [Deployment & Infrastructure](#deployment--infrastructure)
11. [Email Configuration](#email-configuration)
12. [Best Practices & Examples](#best-practices--examples)

---

## Introduction & Overview

PayloadCMS is a modern, code-first headless CMS and application framework built with TypeScript, Node.js, React, and Next.js. It provides backend superpowers while maintaining complete control over your data and infrastructure.

### Key Features
- **Three APIs**: REST, GraphQL, and Local API sharing the same query language
- **Code-first configuration**: Define everything through TypeScript
- **Database agnostic**: MongoDB, PostgreSQL, or SQLite support
- **Built on Next.js**: Native integration with React Server Components
- **Extensible**: Comprehensive plugin system and customization options
- **Self-hostable**: Deploy anywhere with full data ownership

### When to Choose PayloadCMS
- Data ownership and privacy are critical
- Building Next.js applications that need a CMS
- Complex business logic requirements beyond typical CMS
- Need for serverless deployment options
- Want to avoid vendor lock-in with SaaS providers

---

## Authentication & Security

### Authentication Strategies

#### HTTP-Only Cookies (Default)
```javascript
auth: {
  cookies: {
    secure: true, // HTTPS only
    sameSite: 'lax',
    domain: '.example.com' // For subdomain sharing
  }
}
```

#### JWT Authentication
```javascript
// External JWT decoding
import { jwtVerify } from "jose";
import crypto from "crypto";

const decodePayloadJWT = async (token, secret) => {
  const newSecret = crypto
    .createHash("sha256")
    .update(secret)
    .digest("hex")
    .slice(0, 32);
  
  const secretKey = new TextEncoder().encode(newSecret);
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
};
```

#### API Keys
```javascript
auth: {
  useAPIKey: true
}
// Usage: Authorization: {collection-slug} API-Key {YOUR_API_KEY}
```

#### Custom Authentication
```javascript
auth: {
  disableLocalStrategy: true,
  strategies: [
    {
      name: 'custom-strategy',
      authenticate: async ({ payload, headers }) => {
        // Custom authentication logic
        return { user: authenticatedUser };
      }
    }
  ]
}
```

### User Management

#### Basic Auth Configuration
```javascript
const Users = {
  slug: 'users',
  auth: {
    tokenExpiration: 86400, // 24 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    verify: true,
    cookies: {
      secure: true,
      sameSite: 'strict'
    }
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'user'],
      required: true
    }
  ]
}
```

### Access Control

#### Collection-Level Access
```javascript
access: {
  create: ({ req }) => req.user?.role === 'admin',
  read: ({ req }) => {
    if (req.user?.role === 'admin') return true;
    return { createdBy: { equals: req.user?.id } };
  },
  update: ({ req, doc }) => {
    if (req.user?.role === 'admin') return true;
    return doc.createdBy === req.user?.id;
  },
  delete: ({ req }) => req.user?.role === 'admin'
}
```

#### Field-Level Access
```javascript
fields: [
  {
    name: 'sensitiveData',
    type: 'text',
    access: {
      read: ({ req }) => req.user?.role === 'admin',
      update: ({ req }) => req.user?.role === 'admin'
    }
  }
]
```

### Security Configuration

#### Production Security Checklist
```javascript
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET, // Strong, random secret
  serverURL: process.env.SERVER_URL,
  cors: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ].filter(Boolean),
  csrf: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ].filter(Boolean),
  rateLimit: {
    trustProxy: true,
    window: 15 * 60 * 1000,
    max: 1000
  }
});
```

---

## Fields & Data Modeling

### Field Types Overview

#### Data Fields
- **Basic**: Text, Textarea, Email, Number, Date, Checkbox
- **Selection**: Select, Radio
- **Advanced**: Point, Upload, Rich Text, Code, JSON
- **Relationship**: Single/multiple document references
- **Structure**: Group, Array, Blocks, Tabs (Named)

#### Presentational Fields
- **UI**: Custom React components
- **Row**: Horizontal field alignment
- **Collapsible**: Collapsible field groups
- **Tabs** (Unnamed): Visual organization without data nesting

#### Virtual Fields
- **Join**: Bi-directional relationships
- **Virtual**: Computed values via hooks

### Field Configuration

```javascript
{
  name: 'title',
  type: 'text',
  required: true,
  unique: true,
  index: true, // Database indexing
  localized: true,
  defaultValue: 'Default Title',
  admin: {
    condition: (data) => data.status === 'draft',
    description: 'Enter the page title',
    placeholder: 'Page Title',
    position: 'sidebar',
    width: '50%'
  },
  validate: (value, { siblingData, operation }) => {
    if (value.length < 3) {
      return 'Title must be at least 3 characters';
    }
    return true;
  },
  hooks: {
    beforeChange: [
      ({ value }) => value.trim()
    ]
  }
}
```

### Complex Field Examples

#### Blocks Field (Layout Builder)
```javascript
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    {
      slug: 'hero',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' }
      ]
    },
    {
      slug: 'content',
      fields: [
        { name: 'content', type: 'richText' }
      ]
    }
  ]
}
```

#### Array Field with Nested Structure
```javascript
{
  name: 'products',
  type: 'array',
  minRows: 1,
  maxRows: 10,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'price', type: 'number', min: 0 },
    {
      name: 'variants',
      type: 'array',
      fields: [
        { name: 'size', type: 'select', options: ['S', 'M', 'L'] },
        { name: 'stock', type: 'number', min: 0 }
      ]
    }
  ]
}
```

### Custom Field Components

```javascript
'use client'
import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const CustomTextField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField({ path })
  
  return (
    <input
      value={value || ''}
      onChange={(e) => setValue(e.target.value)}
      placeholder={field.placeholder}
      className="custom-input"
    />
  )
}
```

---

## Collections & Globals

### Collections

Collections are groups of documents sharing a common schema, used for recurring content like posts, users, or products.

#### Basic Collection Configuration
```javascript
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'createdAt'],
    listSearchableFields: ['title', 'content'],
    group: 'Content',
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100]
    }
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true
    },
    {
      name: 'content',
      type: 'richText'
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true
    }
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create') {
          data.createdBy = req.user?.id
        }
        return data
      }
    ]
  }
}
```

#### Relationships and Joins
```javascript
// Polymorphic relationship
{
  name: 'owner',
  type: 'relationship',
  relationTo: ['users', 'organizations'],
  required: true
}

// Join field for bi-directional relationships
{
  name: 'posts',
  type: 'join',
  collection: 'posts',
  on: 'category' // Field in posts that references this collection
}
```

### Globals

Globals are singleton documents for site-wide configuration that should only exist once.

#### Global Configuration
```javascript
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Configuration'
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin'
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true }
      ]
    }
  ]
}
```

### Upload-Enabled Collections
```javascript
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center'
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        crop: 'center'
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ]
}
```

---

## APIs & Integration

### REST API

Automatically generated endpoints for each collection:
```
GET    /api/{collection}          # Find many
GET    /api/{collection}/{id}     # Find by ID
POST   /api/{collection}          # Create
PATCH  /api/{collection}/{id}     # Update
DELETE /api/{collection}/{id}     # Delete
```

#### Query Parameters
- `depth` - Relationship population depth (0-10)
- `locale` - Content locale
- `fallback-locale` - Fallback locale
- `limit` - Result limit
- `page` - Pagination
- `sort` - Sort by field(s)
- `where` - Complex queries

#### Complex Queries
```
// REST API
GET /api/posts?where[status][equals]=published&where[author][equals]=123

// Local API equivalent
const posts = await payload.find({
  collection: 'posts',
  where: {
    status: { equals: 'published' },
    author: { equals: '123' }
  }
});
```

### GraphQL API

Mounted at `/api/graphql` with playground at `/api/graphql-playground`.

```graphql
# Query
query GetPosts {
  Posts(
    limit: 10
    where: { status: { equals: "published" } }
    sort: "-createdAt"
  ) {
    docs {
      id
      title
      author {
        name
        email
      }
    }
    totalDocs
  }
}

# Mutation
mutation CreatePost {
  createPost(
    data: {
      title: "New Post"
      content: "Content here"
      status: "draft"
    }
  ) {
    id
    title
  }
}
```

### Local API

Direct database access without HTTP overhead:

```javascript
// Server-side usage
const posts = await payload.find({
  collection: 'posts',
  where: {
    status: { equals: 'published' }
  },
  sort: '-createdAt',
  depth: 2,
  limit: 10
});

// Create with transaction support
const post = await payload.create({
  collection: 'posts',
  data: {
    title: 'New Post',
    content: 'Content'
  },
  req // Pass request for transaction context
});
```

### Query Operators

| Operator | Description |
|----------|-------------|
| `equals` | Exact match |
| `not_equals` | Not equal |
| `greater_than` | Numeric/date comparison |
| `less_than` | Numeric/date comparison |
| `like` | Case-insensitive contains |
| `contains` | String contains |
| `in` | Value in list |
| `near` | Geospatial proximity |
| `exists` | Field exists |

---

## Rich Text Editor

### Lexical Editor (Current Default)

```javascript
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: 'callout',
            fields: [
              { name: 'text', type: 'text' },
              { name: 'type', type: 'select', options: ['info', 'warning'] }
            ]
          }
        ]
      })
    ]
  })
});
```

### Rich Text Field Configuration
```javascript
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => defaultFeatures
  }),
  admin: {
    hideGutter: true,
    placeholder: 'Start typing...'
  }
}
```

### Content Conversion

#### JSON to HTML
```javascript
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

const html = await convertLexicalToHTML({
  converters: defaultHTMLConverters,
  data: editorData
});
```

#### React Components
```javascript
import { RichText } from '@payloadcms/richtext-lexical/react'

export const ContentRenderer = ({ content }) => (
  <RichText
    converters={{
      blocks: {
        callout: ({ node }) => (
          <div className={`callout callout-${node.fields.type}`}>
            {node.fields.text}
          </div>
        )
      }
    }}
    data={content}
  />
);
```

### Creating Custom Features
```javascript
import { createServerFeature } from '@payloadcms/richtext-lexical'

const customFeature = createServerFeature({
  feature: {
    ClientFeature: '@/features/custom/client',
    nodes: [CustomNode],
    slashMenu: {
      groups: [{
        displayName: 'Custom',
        key: 'custom',
        items: [{
          key: 'custom-block',
          displayName: 'Custom Block',
          onSelect: ({ editor }) => {
            // Insert custom node
          }
        }]
      }]
    }
  },
  key: 'customFeature'
});
```

---

## Admin Panel Customization

### Component Customization

All admin components can be customized through configuration:

```javascript
admin: {
  components: {
    // Root components
    Nav: './src/components/CustomNav',
    Logo: './src/components/CustomLogo',
    
    // Collection components
    views: {
      List: './src/views/CustomList',
      Edit: './src/views/CustomEdit'
    },
    
    // Custom views
    CustomReports: {
      Component: './src/views/Reports',
      path: '/reports',
      exact: true
    }
  }
}
```

### Field Components
```javascript
fields: [{
  name: 'color',
  type: 'text',
  admin: {
    components: {
      Field: './src/components/ColorPicker',
      Cell: './src/components/ColorCell',
      Label: './src/components/CustomLabel',
      Description: './src/components/CustomDescription'
    }
  }
}]
```

### Custom CSS and Theming
```javascript
admin: {
  css: path.resolve(__dirname, './src/styles/admin.scss')
}
```

```scss
// admin.scss
@import '@payloadcms/ui/scss';

:root {
  --theme-bg: #ffffff;
  --theme-text: #333333;
  --theme-elevation-500: #f5f5f5;
  --theme-success-500: #28a745;
}

.payload-admin {
  font-family: 'YourBrandFont', sans-serif;
}
```

### Custom Field Example
```javascript
'use client'
import React from 'react'
import { useField, Button } from '@payloadcms/ui'

export const CustomActionField = ({ path }) => {
  const { value, setValue } = useField({ path })
  
  const handleAction = async () => {
    const result = await fetch('/api/custom-action', {
      method: 'POST',
      body: JSON.stringify({ field: path })
    });
    const data = await result.json();
    setValue(data.value);
  }

  return (
    <Button onClick={handleAction} buttonStyle="primary">
      Execute Action
    </Button>
  )
}
```

---

## Hooks & Advanced Patterns

### Hook System

#### Collection Hooks
```javascript
hooks: {
  beforeChange: [
    async ({ data, operation, req }) => {
      if (operation === 'create') {
        data.slug = slugify(data.title)
      }
      return data
    }
  ],
  afterChange: [
    async ({ doc, operation }) => {
      // Sync to external service
      await syncToExternalCRM(doc)
    }
  ],
  beforeRead: [
    ({ doc }) => {
      // Modify document before read
      return doc
    }
  ]
}
```

#### Field Hooks
```javascript
{
  name: 'slug',
  type: 'text',
  hooks: {
    beforeChange: [
      ({ data, siblingData }) => {
        return slugify(siblingData.title || data)
      }
    ]
  }
}
```

### Versioning and Drafts

```javascript
export const Posts: CollectionConfig = {
  slug: 'posts',
  versions: {
    drafts: {
      autosave: {
        interval: 800 // milliseconds
      },
      schedulePublish: true
    },
    maxPerDoc: 50
  }
}
```

#### Working with Drafts
```javascript
// Fetch draft content
const draftPost = await payload.findByID({
  collection: 'posts',
  id: postId,
  draft: true
});

// Schedule publishing
await payload.update({
  collection: 'posts',
  id: postId,
  data: {
    _status: 'published',
    publishDate: futureDate
  }
});
```

### Multi-tenant Architecture

```javascript
// Multi-tenant collection
export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        tenant: { equals: user?.tenant }
      }
    }
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      admin: {
        position: 'sidebar'
      }
    }
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!data.tenant && req.user?.tenant) {
          data.tenant = req.user.tenant
        }
        return data
      }
    ]
  }
}
```

### Jobs and Background Processing

```javascript
// Define a task
const syncToThirdParty = {
  slug: 'sync-to-third-party',
  handler: async ({ job, req }) => {
    const { documentId } = job.data
    const doc = await req.payload.findByID({
      collection: 'posts',
      id: documentId
    })
    await externalAPI.sync(doc)
  }
}

// Queue a job
await payload.jobs.queue({
  task: 'sync-to-third-party',
  data: { documentId: '123' }
})
```

---

## Plugins & Extensions

### Plugin Architecture

```javascript
export const myPlugin = (pluginOptions) => (incomingConfig) => {
  return {
    ...incomingConfig,
    collections: [
      ...(incomingConfig.collections || []),
      {
        slug: 'plugin-collection',
        fields: [
          { name: 'title', type: 'text', required: true }
        ]
      }
    ],
    hooks: {
      ...incomingConfig.hooks,
      afterChange: [
        ...(incomingConfig.hooks?.afterChange || []),
        async ({ doc }) => {
          // Plugin logic
        }
      ]
    }
  }
}
```

### Form Builder Plugin

```javascript
import { formBuilder } from '@payloadcms/plugin-form-builder'

export default buildConfig({
  plugins: [
    formBuilder({
      fields: {
        text: true,
        email: true,
        select: true,
        checkbox: true,
        message: true,
        payment: {
          paymentProcessor: {
            handle: async ({ form, submissionData }) => {
              // Process payment
              return { success: true, transactionId: '123' }
            }
          }
        }
      },
      redirectRelationships: ['pages'],
      beforeEmail: async ({ emailsToSend }) => {
        // Customize emails before sending
        return emailsToSend
      }
    })
  ]
})
```

#### Form Rendering
```javascript
const FormBlock = ({ form }) => {
  const handleSubmit = async (data) => {
    await fetch('/api/form-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: form.id,
        submissionData: data
      })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {form.fields.map(field => (
        <FieldComponent key={field.id} field={field} />
      ))}
      <button type="submit">{form.submitButtonLabel}</button>
    </form>
  )
}
```

### Creating Custom Plugins

```javascript
// Plugin with custom field type
export const customFieldPlugin = () => (config) => ({
  ...config,
  admin: {
    ...config.admin,
    components: {
      ...config.admin?.components,
      fields: {
        ...config.admin?.components?.fields,
        CustomField: './src/fields/CustomField'
      }
    }
  },
  onInit: async (payload) => {
    // Initialization logic
  }
})
```

---

## Deployment & Infrastructure

### Deployment Options

#### Payload Cloud (Managed)
- MongoDB Atlas database
- S3 file storage with Cloudflare CDN
- Built-in email service (Resend)
- Blue/green deployments
- Automatic monitoring

```javascript
import { payloadCloudPlugin } from '@payloadcms/plugin-payload-cloud'

export default buildConfig({
  plugins: [
    payloadCloudPlugin()
  ]
})
```

#### Vercel Deployment
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/api': ['./node_modules/payload/**/*'],
    },
  },
}

// Use Neon for PostgreSQL
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: {
    connectionString: process.env.POSTGRES_URL,
  },
})
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["npm", "start"]
```

### Database Configuration

#### PostgreSQL
```javascript
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    migrationDir: './src/migrations',
  })
})
```

#### MongoDB
```javascript
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  })
})
```

### File Storage

#### S3 Storage
```javascript
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
})
```

---

## Email Configuration

### Nodemailer Setup
```javascript
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@example.com',
    defaultFromName: 'Example App',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
```

### Resend Setup (Serverless)
```javascript
import { resendAdapter } from '@payloadcms/email-resend'

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: 'noreply@example.com',
    defaultFromName: 'Example App',
    apiKey: process.env.RESEND_API_KEY,
  }),
})
```

### Custom Email Templates
```javascript
auth: {
  forgotPassword: {
    generateEmailHTML: ({ req, token, user }) => {
      const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
      return `
        <!doctype html>
        <html>
          <body>
            <h1>Reset Your Password</h1>
            <p>Hello ${user.email},</p>
            <p><a href="${resetURL}">Click here to reset your password</a></p>
          </body>
        </html>
      `
    },
    generateEmailSubject: ({ req, user }) => {
      return `Password Reset Request - ${user.email}`
    }
  }
}
```

### Sending Custom Emails
```javascript
// In hooks or custom endpoints
await payload.sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to our platform!',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
})
```

---

## Best Practices & Examples

### Data Modeling Patterns

#### E-commerce Product Structure
```javascript
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'E-commerce'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'sku', type: 'text', required: true, unique: true },
    {
      name: 'variants',
      type: 'array',
      fields: [
        { name: 'size', type: 'select', options: ['S', 'M', 'L', 'XL'] },
        { name: 'color', type: 'text' },
        { name: 'price', type: 'number', min: 0 },
        { name: 'inventory', type: 'number', min: 0 }
      ]
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Sync with inventory system
          await inventoryAPI.createProduct(data)
        }
        return data
      }
    ]
  }
}
```

### Performance Optimization

#### Efficient Queries
```javascript
// Use specific field selection
const posts = await payload.find({
  collection: 'posts',
  select: {
    title: true,
    slug: true,
    publishedDate: true
  },
  where: {
    status: { equals: 'published' }
  },
  limit: 10,
  depth: 1 // Limit relationship depth
})
```

#### Database Indexing
```javascript
fields: [
  {
    name: 'slug',
    type: 'text',
    index: true, // Add index for frequently queried fields
    unique: true
  },
  {
    name: 'status',
    type: 'select',
    options: ['draft', 'published'],
    index: true // Index for filtering
  }
]
```

### Security Best Practices

#### Environment Configuration
```javascript
// .env.production
PAYLOAD_SECRET=your-super-secret-32-char-minimum-string
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
FRONTEND_URL=https://yourdomain.com
S3_BUCKET=your-bucket-name
RESEND_API_KEY=re_123456789
```

#### Access Control Patterns
```javascript
// Role-based access helper
const isAdmin = ({ req }) => req.user?.role === 'admin'
const isOwner = ({ req, doc }) => doc.createdBy === req.user?.id
const isAdminOrOwner = ({ req, doc }) => isAdmin({ req }) || isOwner({ req, doc })

// Apply to collections
access: {
  read: isAdminOrOwner,
  update: isAdminOrOwner,
  delete: isAdmin
}
```

### Testing Strategies

```javascript
// Jest test example
describe('Posts Collection', () => {
  beforeAll(async () => {
    await payload.init({
      secret: 'test-secret',
      local: true
    })
  })

  test('Create post with valid data', async () => {
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: 'Test Post',
        content: 'Test content',
        status: 'draft'
      }
    })
    
    expect(post.title).toBe('Test Post')
    expect(post.slug).toBeDefined()
  })
})
```

### Common Integration Patterns

#### Stripe Integration
```javascript
// In collection hooks
afterChange: [
  async ({ doc, operation }) => {
    if (operation === 'create' && doc.price) {
      const product = await stripe.products.create({
        name: doc.name,
        description: doc.description
      })
      
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: doc.price * 100,
        currency: 'usd'
      })
      
      await payload.update({
        collection: 'products',
        id: doc.id,
        data: {
          stripeProductId: product.id,
          stripePriceId: price.id
        }
      })
    }
  }
]
```

#### Search Integration
```javascript
// Algolia sync in hooks
afterChange: [
  async ({ doc, operation }) => {
    const index = algoliaClient.initIndex('posts')
    
    if (operation === 'delete') {
      await index.deleteObject(doc.id)
    } else {
      await index.saveObject({
        objectID: doc.id,
        title: doc.title,
        content: doc.content,
        slug: doc.slug
      })
    }
  }
]
```

---

## Key Takeaways

1. **Code-First Philosophy**: Everything is configured through TypeScript, providing type safety and excellent developer experience

2. **Flexible Architecture**: Choose your database, deployment method, and customize every aspect of the system

3. **Powerful APIs**: Three API types (REST, GraphQL, Local) sharing the same query language provide maximum flexibility

4. **Extensibility**: Comprehensive hook system and plugin architecture enable complex functionality

5. **Modern Stack**: Built on Next.js with React Server Components support, providing cutting-edge performance

6. **Security First**: Built-in authentication, granular access control, and security best practices

7. **Developer Experience**: Hot module replacement, TypeScript support, and excellent documentation

PayloadCMS provides the tools to build everything from simple websites to complex enterprise applications while maintaining full control over your data and infrastructure.