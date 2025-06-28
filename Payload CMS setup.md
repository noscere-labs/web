# PayloadCMS Complete Setup Guide

A comprehensive guide for getting from zero to a functioning PayloadCMS installation, based on official documentation research.

## Table of Contents
1. [Prerequisites and System Requirements](#prerequisites-and-system-requirements)
2. [Installation Methods and Steps](#installation-methods-and-steps)
3. [Initial Configuration and Setup](#initial-configuration-and-setup)
4. [Database Setup and Configuration](#database-setup-and-configuration)
5. [Authentication and User Management Setup](#authentication-and-user-management-setup)
6. [Content Modeling and Collection Configuration](#content-modeling-and-collection-configuration)
7. [Frontend Integration Options](#frontend-integration-options)
8. [Deployment Considerations](#deployment-considerations)
9. [Essential Plugins and Extensions](#essential-plugins-and-extensions)
10. [Best Practices and Security Considerations](#best-practices-and-security-considerations)
11. [Development Workflow Recommendations](#development-workflow-recommendations)
12. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Prerequisites and System Requirements

### Minimum Software Requirements
- **Node.js**: Version 20.9.0 or higher
- **Next.js**: Version 15 or higher (required for Payload v3)
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Database**: MongoDB, PostgreSQL, SQLite, or compatible

### Hardware Requirements
- **Minimum**: 1 CPU core, 2GB RAM
- **Recommended**: 2 CPU cores, 4-8GB RAM
- **Storage**: Depends on project size and media storage needs

### Required Core Packages
```bash
# Core dependencies
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql

# Database adapter (choose one)
pnpm i @payloadcms/db-mongodb
# OR
pnpm i @payloadcms/db-postgres
# OR
pnpm i @payloadcms/db-sqlite
```

**Note for npm users**: May need to use legacy peer deps:
```bash
npm i --legacy-peer-deps payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql
```

---

## Installation Methods and Steps

### Method 1: Quick Setup with create-payload-app (Recommended)

```bash
npx create-payload-app@latest
```

Follow the interactive prompts to:
- Choose project name
- Select database adapter
- Configure initial settings

**Using templates:**
```bash
# Website template (recommended for CMS)
npx create-payload-app@latest -t website

# Blank template
npx create-payload-app@latest -t blank
```

### Method 2: Adding to Existing Next.js App

#### Step 1: Install packages
```bash
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql
pnpm i @payloadcms/db-mongodb # or your chosen adapter
```

#### Step 2: Copy Payload files
Copy the following structure to your `/app` folder from the [Blank Template](https://github.com/payloadcms/payload/tree/main/templates/blank/src/app/(payload)):

```
app/
├── (payload)/
│   ├── admin/
│   │   └── [[...segments]]/
│   │       └── page.tsx
│   ├── api/
│   │   └── [...slug]/
│   │       └── route.ts
│   └── graphql/
│       └── route.ts
```

#### Step 3: Configure Next.js
Update `next.config.js`:
```javascript
import { withPayload } from '@payloadcms/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

export default withPayload(nextConfig)
```

#### Step 4: Create Payload config
Create `payload.config.ts` in your project root:
```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    // Your collections here
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
```

#### Step 5: Update TypeScript config
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

#### Step 6: Environment variables
Create `.env.local`:
```env
PAYLOAD_SECRET=your-very-long-random-secret-key-here
DATABASE_URI=mongodb://localhost:27017/payload-app
```

---

## Initial Configuration and Setup

### Core Configuration Structure

The `payload.config.ts` file is the heart of your PayloadCMS setup:

```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- My App',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  
  // Collections (your data models)
  collections: [
    // Define collections here
  ],
  
  // Global documents
  globals: [
    // Define globals here
  ],
  
  // Database adapter
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  
  // Required secret for encryption
  secret: process.env.PAYLOAD_SECRET,
  
  // CORS settings
  cors: [
    'http://localhost:3000',
    'https://yourdomain.com'
  ],
  
  // CSRF protection
  csrf: [
    'http://localhost:3000',
    'https://yourdomain.com'
  ],
  
  // TypeScript types generation
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  
  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
```

### Essential Environment Variables

```bash
# Core configuration
PAYLOAD_SECRET=your-super-secure-random-string-minimum-32-chars
DATABASE_URI=mongodb://localhost:27017/payload-app
PAYLOAD_CONFIG_PATH=dist/payload.config.js

# URL configuration
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000

# Email configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Development/Production
NODE_ENV=development
```

### Server Configuration Options

```typescript
export default buildConfig({
  express: {
    json: {
      limit: '10mb', // Increase JSON body size limit
    },
    compression: {
      threshold: 1024,
      level: 6,
    },
    preMiddleware: [
      (req, res, next) => {
        console.log(`${req.method} ${req.path}`)
        next()
      }
    ],
  },
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // requests per window
  },
})
```

---

## Database Setup and Configuration

### MongoDB Configuration

#### Installation
```bash
pnpm i @payloadcms/db-mongodb
```

#### Basic Setup
```typescript
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
```

#### Advanced MongoDB Options
```typescript
db: mongooseAdapter({
  url: process.env.DATABASE_URI,
  connectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  // For Azure Cosmos DB
  transactionOptions: false,
})
```

#### Connection Strings
```bash
# Local MongoDB
DATABASE_URI=mongodb://localhost:27017/payload-app

# MongoDB Atlas
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# Azure Cosmos DB
DATABASE_URI=mongodb://account:password@account.mongo.cosmos.azure.com:10255/database?ssl=true&replicaSet=globaldb&retrywrites=false
```

### PostgreSQL Configuration

#### Installation
```bash
pnpm i @payloadcms/db-postgres
```

#### Basic Setup
```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
```

#### Advanced PostgreSQL Options
```typescript
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
    max: 20, // Maximum pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  migrationDir: './src/migrations',
  push: true, // Enable push mode for development
})
```

### Database Migration Commands

```bash
# Create a new migration
npx payload migrate:create

# Run pending migrations
npx payload migrate

# Check migration status
npx payload migrate:status

# Rollback migrations
npx payload migrate:down
```

---

## Authentication and User Management Setup

### Basic Authentication Configuration

```typescript
const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
}
```

### Advanced Authentication Features

```typescript
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // Email verification
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return `
          <h1>Verify your email</h1>
          <p>Hello ${user.firstName || user.email},</p>
          <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verify/${token}">
            Verify Email
          </a>
        `
      },
      generateEmailSubject: () => 'Verify your email',
    },
    
    // Password reset
    forgotPassword: {
      generateEmailHTML: ({ token, user }) => {
        return `
          <h1>Reset your password</h1>
          <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/reset-password/${token}">
            Reset Password
          </a>
        `
      },
      generateEmailSubject: () => 'Reset your password',
    },
    
    // Security settings
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
    
    // API Keys
    useAPIKey: true,
    
    // Cookie settings
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  fields: [
    // Field definitions
  ],
}
```

### Role-Based Access Control

```typescript
const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    // Only authenticated users can create
    create: ({ req: { user } }) => !!user,
    
    // Everyone can read published posts
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) {
        return true // Admins can see all
      }
      return {
        status: { equals: 'published' }
      }
    },
    
    // Only admins and post authors can update
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) {
        return true
      }
      return {
        author: { equals: user?.id }
      }
    },
    
    // Only admins can delete
    delete: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
  },
  fields: [
    // Field definitions
  ],
}
```

---

## Content Modeling and Collection Configuration

### Defining Collections

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', 'createdAt'],
    listSearchableFields: ['title', 'content'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
}
```

### Field Types

#### Text Fields
```typescript
{
  name: 'title',
  type: 'text',
  required: true,
  maxLength: 100,
  admin: {
    description: 'Page title for SEO',
  },
}
```

#### Rich Text
```typescript
{
  name: 'content',
  type: 'richText',
  admin: {
    elements: ['h2', 'h3', 'h4', 'link', 'ul', 'ol'],
    leaves: ['bold', 'italic', 'underline'],
  },
}
```

#### Relationships
```typescript
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  required: true,
}

// Many-to-many
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
}
```

#### Arrays
```typescript
{
  name: 'tags',
  type: 'array',
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
  ],
  minRows: 1,
  maxRows: 10,
}
```

#### Groups
```typescript
{
  name: 'meta',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
```

### Validation

```typescript
{
  name: 'slug',
  type: 'text',
  required: true,
  validate: (value, { operation, data }) => {
    if (!value) return 'Slug is required'
    if (!/^[a-z0-9-]+$/.test(value)) {
      return 'Slug can only contain lowercase letters, numbers, and hyphens'
    }
    return true
  },
}
```

### Hooks

```typescript
export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          data.author = req.user.id
        }
        return data
      }
    ],
    afterChange: [
      ({ doc, req, operation }) => {
        if (operation === 'create') {
          // Send notification, revalidate cache, etc.
        }
      }
    ],
  },
}
```

---

## Frontend Integration Options

### REST API Usage

#### Auto-Generated Endpoints
- `GET /api/{collection-slug}` - Find documents
- `GET /api/{collection-slug}/{id}` - Find by ID
- `POST /api/{collection-slug}` - Create document
- `PUT /api/{collection-slug}/{id}` - Update document
- `DELETE /api/{collection-slug}/{id}` - Delete document

#### Examples
```javascript
// Fetch all posts
const response = await fetch('http://localhost:3000/api/posts')
const data = await response.json()

// Fetch with query parameters
const response = await fetch(
  'http://localhost:3000/api/posts?where[status][equals]=published&limit=10&sort=-createdAt'
)

// Create a new post
const response = await fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token',
  },
  body: JSON.stringify({
    title: 'My New Post',
    content: 'Post content here',
    status: 'published',
  }),
})
```

### GraphQL API

#### Configuration
```typescript
export default buildConfig({
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: false,
  },
})
```

#### Query Examples
```graphql
query GetPosts {
  Posts(limit: 10, where: { status: { equals: published }}) {
    docs {
      id
      title
      content
      publishedDate
      author {
        name
        email
      }
    }
    totalDocs
    hasNextPage
  }
}

mutation CreatePost($data: mutationPostInput!) {
  createPost(data: $data) {
    id
    title
    status
    createdAt
  }
}
```

### Next.js Integration

#### Server Components (App Router)
```typescript
// app/posts/page.tsx
import payload from 'payload'

export default async function PostsPage() {
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' }
    },
    limit: 10,
  })

  return (
    <div>
      {posts.docs.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
```

#### Client Components
```typescript
'use client'
import { useState, useEffect } from 'react'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts?where[status][equals]=published')
      .then(res => res.json())
      .then(data => {
        setPosts(data.docs)
        setLoading(false)
      })
  }, [])

  return { posts, loading }
}
```

### Live Preview

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        if (collectionConfig?.slug === 'pages') {
          return `http://localhost:3000/preview${data?.slug || ''}`
        }
        return null
      },
      collections: ['pages', 'posts'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
})
```

---

## Deployment Considerations

### Production Environment Variables

```bash
# Core Configuration
PAYLOAD_SECRET=your-super-secure-random-string-minimum-32-chars
DATABASE_URI=your-production-database-url
NODE_ENV=production

# URL Configuration
PAYLOAD_PUBLIC_SERVER_URL=https://api.yourdomain.com
PAYLOAD_PUBLIC_SITE_URL=https://yourdomain.com

# Security
COOKIE_DOMAIN=.yourdomain.com
```

### Docker Deployment

```dockerfile
# Multi-stage production Dockerfile
FROM node:18-alpine as base

FROM base as builder
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY package*.json ./
RUN yarn install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Performance Optimization

```typescript
export default buildConfig({
  rateLimit: {
    trustProxy: true,
    window: 15 * 60 * 1000, // 15 minutes
    max: 100, // Requests per window per IP
  },
  graphQL: {
    maxComplexity: 1000, // Prevent complex queries
  },
  maxDepth: 10, // Limit relationship depth
})
```

### CDN and Media Storage

```typescript
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: s3Adapter({
            config: {
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],
})
```

---

## Essential Plugins and Extensions

### Official Plugins

#### SEO Plugin
```bash
pnpm i @payloadcms/plugin-seo
```

```typescript
import { seoPlugin } from '@payloadcms/plugin-seo'

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
    }),
  ],
})
```

#### Form Builder
```bash
pnpm i @payloadcms/plugin-form-builder
```

```typescript
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

export default buildConfig({
  plugins: [
    formBuilderPlugin({
      collections: {
        'forms': {
          slug: 'contact-forms',
        },
      },
    }),
  ],
})
```

#### Other Official Plugins
- `@payloadcms/plugin-cloud-storage` - Cloud storage adapters
- `@payloadcms/plugin-redirects` - URL redirect management
- `@payloadcms/plugin-nested-docs` - Hierarchical documents
- `@payloadcms/plugin-search` - Search functionality

### Custom Plugin Development

```typescript
import type { Plugin } from 'payload/config'

export const myPlugin = (options = {}): Plugin => (config) => {
  return {
    ...config,
    collections: [
      ...(config.collections || []),
      // Add custom collections
    ],
    hooks: {
      ...(config.hooks || {}),
      // Add custom hooks
    },
  }
}
```

---

## Best Practices and Security Considerations

### Security Configuration

```typescript
export default buildConfig({
  // Strong secret key
  secret: process.env.PAYLOAD_SECRET, // 32+ characters
  
  // Secure CORS
  cors: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com']
    : ['http://localhost:3000'],
    
  // CSRF protection
  csrf: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : ['http://localhost:3000'],
    
  // Rate limiting
  rateLimit: {
    trustProxy: true,
    window: 15 * 60 * 1000,
    max: 100,
  },
})
```

### Authentication Security

```typescript
collections: [
  {
    slug: 'users',
    auth: {
      maxLoginAttempts: 5,
      lockTime: 600000, // 10 minutes
      useAPIKey: true,
      cookies: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
      },
    },
  },
]
```

### File Upload Security

```typescript
collections: [
  {
    slug: 'media',
    upload: {
      staticURL: '/media',
      staticDir: 'media',
      mimeTypes: ['image/*', 'application/pdf'],
    },
    access: {
      create: ({ req: { user } }) => !!user,
      read: ({ req: { user } }) => !!user,
      update: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
    },
  },
]
```

---

## Development Workflow Recommendations

### TypeScript Configuration

```typescript
export default buildConfig({
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: true, // Enable automatic type inference
  }
})
```

Generate types:
```bash
pnpm payload generate:types
```

### Development Environment

```typescript
export default buildConfig({
  // Development-only features
  collections: [
    {
      slug: 'users',
      auth: {
        autoLogin: process.env.NODE_ENV === 'development' ? {
          email: 'dev@payloadcms.com',
          password: 'test',
        } : false
      }
    }
  ],
  debug: process.env.NODE_ENV === 'development',
})
```

### Version Control Best Practices

```
project/
├── src/
│   ├── app/
│   │   ├── (payload)/    # Do not modify
│   │   └── (frontend)/   # Your app code
│   ├── migrations/       # Include in version control
│   └── collections/      # Your collections
├── payload.config.ts
├── next.config.js
└── .env.example         # Template for team
```

### Testing Strategy

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

---

## Troubleshooting Common Issues

### Installation Issues

#### NPM Peer Dependencies
```bash
# If encountering peer dependency issues
npm i --legacy-peer-deps
```

#### ESM Module Errors
Solution: Add `"type": "module"` to `package.json` or use `.mjs` extension

#### TypeScript Path Errors
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

### Database Connection Issues

#### MongoDB Connection Refused
```bash
# Try IPv4 instead of IPv6
mongodb://0.0.0.0:27017/payload
# Instead of
mongodb://localhost:27017/payload
```

#### PostgreSQL Migration Errors
- Don't mix push mode with migrations
- Run `pnpm payload migrate` before production start
- Ensure proper user permissions

### Build and Runtime Errors

#### Build Memory Issues
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

#### Config Path Issues
```bash
# Set environment variable
PAYLOAD_CONFIG_PATH=dist/payload.config.js
```

### Admin Panel Issues

#### Infinite Loading Screen
- Check browser network tab for failed requests
- Verify `serverURL` matches access URL
- Check CORS configuration
- Use IP address instead of localhost for network access

#### Authentication Failures
- Verify database connection
- Check CORS and CSRF settings
- Inspect browser cookies
- Enable debug mode for detailed errors

### Common Error Messages

**"Plugin version mismatch"**
```bash
# Ensure all Payload packages use same version
pnpm add @payloadcms/plugin-seo@3.11.0
```

**"CSRF token mismatch"**
- Ensure proper CSRF configuration
- Include credentials in API requests
- Verify cookie domain settings

### Debugging Best Practices

1. Enable debug mode: `debug: true`
2. Use browser dev tools network tab
3. Check server logs for detailed errors
4. Test with minimal configuration
5. Keep all Payload packages at same version
6. Verify all environment variables
7. Use curl/Postman to test API endpoints directly

---

## Summary

This guide provides a complete path from zero to a functioning PayloadCMS installation. Key takeaways:

- **PayloadCMS requires Node.js 20.9.0+ and Next.js 15+**
- **Configuration is code-first and type-safe**
- **Built-in authentication, access control, and API generation**
- **Flexible deployment options with Docker, serverless, or traditional hosting**
- **Extensive plugin ecosystem and customization options**
- **Strong TypeScript support throughout**

For the latest updates and additional resources, refer to the official PayloadCMS documentation at https://payloadcms.com/docs.