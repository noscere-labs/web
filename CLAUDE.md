# CLAUDE.md - Noscere Website Development Instructions

## Project Overview

**Company**: Noscere  
**Mission**: We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, turning emerging possibilities into competitive advantages.

**Project Goal**: Build a professional, high-performance website for a blockchain consultancy company that showcases expertise, builds trust, and generates enterprise leads.

## Tech Stack

- **Framework**: Next.js 15.3
- **Language**: TypeScript
- **Frontend**: React
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Website Structure

### 1. Homepage (`/`)
- **Inspiration**: Similar style to https://www.cambridgeconsultants.com
- **Focus**: Fast loading, professional, enterprise-focused
- **Key Elements**:
  - Hero section with clear value proposition
  - Service overview cards
  - Client trust indicators
  - Call-to-action for consultations

### 2. About Page (`/about`)
- Company history and background
- Explanation of "Noscere" (Latin for "to know/understand")
- Team information
- Company values and approach

### 3. Services Page (`/services`)
Detail the following services:
- **Bitcoin Education** - Training programs for enterprises
- **Bitcoin Developer Training** - Technical skill development
- **Consultancy** - Strategic blockchain advisory
- **Enterprise Development** - Custom blockchain solutions
- **Tokenised Solutions** - Token-based business models

### 4. Lab Page (`/lab`)
- Interactive Bitcoin tools and widgets
- Technical demonstrations
- Proof-of-concept applications
- Educational resources

### 5. Blog (`/blog`)
- Fully featured custom blog system
- SEO optimized with proper meta tags
- Categories and tags
- Author profiles
- RSS feed
- Search functionality

## Design System

### Color Palette

#### Dark Mode (Primary)
- **Background**: `#0a0a0a`
- **Card Background**: `#111827`
- **Elevated Surface**: `#1f2937`
- **Primary Blue**: `#3b82f6`
- **Primary Blue Dark**: `#1e40af`
- **Accent Purple**: `#8b5cf6`
- **Tech Cyan**: `#06b6d4`
- **Primary Text**: `#f1f5f9`
- **Secondary Text**: `#94a3b8`
- **Muted Text**: `#64748b`

#### Light Mode
- **Background**: `#ffffff`
- **Card Background**: `#f8fafc`
- **Elevated Surface**: `#f1f5f9`
- **Primary Blue**: `#2563eb`
- **Primary Blue Dark**: `#1d4ed8`
- **Accent Purple**: `#7c3aed`
- **Tech Cyan**: `#0891b2`
- **Primary Text**: `#0f172a`
- **Secondary Text**: `#475569`
- **Muted Text**: `#64748b`

### Typography
- **Font**: Inter (via next/font/google)
- **Headings**: Clean, modern hierarchy
- **Body**: Readable, professional

### Brand Guidelines
- Professional and trustworthy
- Modern and innovative
- Enterprise-focused
- Blockchain/tech aesthetic

## Performance Requirements

Implement the following Next.js 15.3 optimizations:

### Core Optimizations
1. **Turbopack** - Enable for development and builds
2. **Partial Pre-rendering (PPR)** - For mixed static/dynamic content
3. **React Server Components** - Minimize client-side JavaScript
4. **Strategic Code Splitting** - Dynamic imports for heavy components
5. **Image Optimization** - Next.js Image component with proper sizing

### Advanced Optimizations
6. **TypeScript Performance** - Optimized tsconfig.json
7. **Multi-layer Caching** - API routes, database queries, and CDN
8. **Font Optimization** - next/font with zero layout shift
9. **Third-party Scripts** - Proper loading strategies
10. **Bundle Analysis** - Regular optimization monitoring

### Target Metrics
- **LCP**: < 2.5 seconds
- **FID**: < 100ms
- **CLS**: < 0.1
- **Build Time**: Minimal with Turbopack
- **Bundle Size**: Optimized through code splitting

## SEO Implementation

### Technical SEO
- **Title Tags**: 50-60 characters, keyword-rich
- **Meta Descriptions**: 150-160 characters, compelling
- **Heading Structure**: Proper H1-H6 hierarchy with keywords
- **Internal Linking**: Comprehensive linking strategy
- **Core Web Vitals**: Optimized performance metrics

### Content SEO
- **Keyword Research**: Blockchain, Bitcoin, enterprise consulting
- **Content Strategy**: High-quality, user-intent focused
- **Regular Updates**: Fresh content for better rankings
- **Structured Data**: JSON-LD for rich snippets

### Blog SEO
- Category and tag systems
- Author schemas
- Article structured data
- Social sharing optimization
- Related posts functionality

## Database Schema (Prisma)

### Blog System
```prisma
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  categories  Category[]
  tags        Tag[]
  
  @@map("posts")
}

model Category {
  id          String @id @default(cuid())
  name        String @unique
  slug        String @unique
  description String?
  posts       Post[]
  
  @@map("categories")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]
  
  @@map("tags")
}

model User {
  id       String @id @default(cuid())
  email    String @unique
  name     String?
  bio      String?
  avatar   String?
  posts    Post[]
  
  @@map("users")
}
```

## Component Architecture

### Layout Components
- `Header` - Navigation with dark/light mode toggle
- `Footer` - Company info, links, contact
- `Layout` - Main wrapper with consistent styling

### Page Components
- `Hero` - Homepage hero section
- `ServiceCard` - Individual service displays
- `BlogCard` - Blog post previews
- `ContactForm` - Lead generation forms

### UI Components
- `Button` - Consistent styling across variants
- `Card` - Reusable content containers
- `Badge` - Tags, categories, status indicators
- `Modal` - Overlay content
- `Loading` - Skeleton and spinner states

## Content Strategy

### Homepage Content
- **Hero**: "Demystifying Blockchain for Enterprise Success"
- **Services**: Brief overview of 5 core services
- **Trust**: Client logos, testimonials, case studies
- **CTA**: "Schedule a Consultation"

### Service Pages
Each service should include:
- Clear problem statement
- Solution overview
- Benefits and outcomes
- Case studies or examples
- Pricing or engagement models
- Call-to-action

### Blog Content
- Technical tutorials
- Industry insights
- Market analysis
- Company updates
- Thought leadership

## Development Workflow

### File Structure
```
src/
├── app/
│   ├── (routes)/
│   │   ├── about/
│   │   ├── services/
│   │   ├── lab/
│   │   └── blog/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   └── forms/
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations.ts
├── types/
└── styles/
```

### Git Workflow
1. Feature branches for each page/component
2. Descriptive commit messages
3. Regular pushes with incremental progress
4. Testing before merges

### Testing Strategy
- Component testing with Jest/Testing Library
- E2E testing with Playwright
- Performance testing with Lighthouse
- Accessibility testing with axe

## Deployment Configuration

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."

# General
NEXTAUTH_URL="https://noscere.com"
NEXTAUTH_SECRET="..."

# Optional: Analytics
NEXT_PUBLIC_GA_ID="..."
```

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Success Metrics

### Performance Goals
- **Page Load Speed**: < 2 seconds
- **Mobile Performance**: 90+ Lighthouse score
- **SEO Score**: 95+ Lighthouse score
- **Accessibility**: 100 Lighthouse score

### Business Goals
- **Lead Generation**: Contact form conversions
- **Engagement**: Blog readership and time on site
- **Trust Building**: Professional presentation
- **Search Visibility**: Ranking for target keywords

## Key Considerations

1. **Enterprise Focus**: All content and design should appeal to enterprise decision-makers
2. **Trust Building**: Professional design, clear credentials, case studies
3. **Performance**: Fast loading is critical for enterprise users
4. **SEO**: Long-term organic growth strategy
5. **Scalability**: Architecture should support future growth
6. **Mobile-First**: Responsive design for all devices
7. **Accessibility**: WCAG 2.1 AA compliance
8. **Security**: Enterprise-grade security practices

## Getting Started

1. **Setup**: Initialize Next.js 15.3 project with TypeScript
2. **Database**: Setup PostgreSQL and Prisma
3. **Styling**: Configure Tailwind CSS with custom theme
4. **Components**: Build core UI components first
5. **Pages**: Implement pages in order: Home → About → Services → Lab → Blog
6. **Content**: Add real content and optimize for SEO
7. **Performance**: Implement all optimization strategies
8. **Testing**: Comprehensive testing before deployment
9. **Deployment**: Deploy to Vercel with proper configuration
10. **Monitoring**: Setup analytics and performance monitoring

## Additional Resources

- **Design Inspiration**: https://www.cambridgeconsultants.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

**Remember**: This is a high-stakes enterprise website. Every decision should reinforce trust, professionalism, and technical expertise. The goal is to convert enterprise prospects into qualified leads through compelling content and flawless user experience.