import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Layout } from "@/components/layout/layout"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/seo/structured-data"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react"
import { formatDate } from "@/lib/utils"

// Mock data - in a real app, this would come from your database
const mockPost = {
  id: "1",
  title: "Understanding Bitcoin's Lightning Network for Enterprise Applications",
  slug: "bitcoin-lightning-network-enterprise",
  excerpt: "Explore how Bitcoin's Lightning Network can revolutionize enterprise payments with instant, low-cost transactions and improved scalability.",
  content: `
# Understanding Bitcoin's Lightning Network for Enterprise Applications

The Lightning Network represents a significant leap forward in Bitcoin's capability to handle enterprise-scale transactions. By creating a secondary layer on top of the Bitcoin blockchain, it enables instant, low-cost payments that are perfect for business applications.

## What is the Lightning Network?

The Lightning Network is a "layer 2" payment protocol that operates on top of Bitcoin. It enables fast, cheap, and scalable transactions by creating payment channels between parties. These channels can process thousands of transactions per second, making it ideal for enterprise use cases.

### Key Benefits for Enterprises

1. **Instant Transactions**: Payments settle in milliseconds rather than minutes or hours
2. **Low Fees**: Transaction costs are typically fractions of a cent
3. **Scalability**: Can handle millions of transactions per second
4. **Privacy**: Transactions are more private than on-chain Bitcoin transactions

## Implementation Considerations

When implementing Lightning Network solutions for enterprise applications, several factors must be considered:

### Infrastructure Requirements

- **Node Management**: Running and maintaining Lightning nodes
- **Channel Liquidity**: Ensuring adequate funds in payment channels
- **Backup Systems**: Protecting against data loss and channel closures

### Security Best Practices

- **Key Management**: Secure storage of private keys
- **Channel Monitoring**: Regular monitoring of channel states
- **Watchtower Services**: Protection against malicious channel closures

## Use Cases in Enterprise

The Lightning Network opens up numerous possibilities for enterprise applications:

### Micropayments
Perfect for content monetization, API usage billing, and IoT device payments.

### Cross-Border Remittances
Enable instant, low-cost international payments without traditional banking infrastructure.

### Supply Chain Payments
Automate payments throughout the supply chain with programmable conditions.

## Getting Started

For enterprises looking to implement Lightning Network solutions, we recommend starting with a proof-of-concept deployment in a controlled environment. Our team at Noscere can help guide you through the implementation process, from initial strategy to full deployment.

## Conclusion

The Lightning Network represents a paradigm shift in how enterprises can leverage Bitcoin for payments. With proper implementation and security measures, it offers unprecedented speed, cost-effectiveness, and scalability for business transactions.

Ready to explore Lightning Network implementation for your enterprise? Contact our team for a consultation.
  `,
  published: true,
  publishedAt: new Date("2024-01-15"),
  createdAt: new Date("2024-01-15"),
  author: {
    id: "1",
    name: "Alex Chen",
    email: "alex@noscere.com",
    bio: "Lead Blockchain Architect with 8+ years of experience in distributed systems and cryptocurrency.",
    avatar: "AC"
  },
  categories: [
    { id: "1", name: "Bitcoin", slug: "bitcoin" },
    { id: "2", name: "Enterprise", slug: "enterprise" }
  ],
  tags: [
    { id: "1", name: "lightning-network", slug: "lightning-network" },
    { id: "2", name: "payments", slug: "payments" },
    { id: "3", name: "scalability", slug: "scalability" }
  ]
}

const relatedPosts = [
  {
    id: "2",
    title: "Blockchain Implementation Strategy: A Step-by-Step Guide for CTOs",
    slug: "blockchain-implementation-strategy-ctos",
    excerpt: "A comprehensive guide for technology leaders on how to successfully implement blockchain solutions in enterprise environments.",
    content: "Implementation guide content...",
    published: true,
    publishedAt: new Date("2024-01-10"),
    createdAt: new Date("2024-01-10"),
    author: {
      id: "2",
      name: "Sarah Rodriguez",
      email: "sarah@noscere.com"
    },
    categories: [
      { id: "2", name: "Enterprise", slug: "enterprise" },
      { id: "3", name: "Strategy", slug: "strategy" }
    ],
    tags: [
      { id: "4", name: "implementation", slug: "implementation" },
      { id: "5", name: "cto", slug: "cto" }
    ]
  },
  {
    id: "3",
    title: "Smart Contract Security: Best Practices for Enterprise Development",
    slug: "smart-contract-security-best-practices",
    excerpt: "Learn essential security practices for developing and deploying smart contracts in enterprise blockchain applications.",
    content: "Security guide content...",
    published: true,
    publishedAt: new Date("2024-01-05"),
    createdAt: new Date("2024-01-05"),
    author: {
      id: "3",
      name: "Michael Thompson",
      email: "michael@noscere.com"
    },
    categories: [
      { id: "4", name: "Development", slug: "development" },
      { id: "5", name: "Security", slug: "security" }
    ],
    tags: [
      { id: "7", name: "smart-contracts", slug: "smart-contracts" },
      { id: "8", name: "security", slug: "security" }
    ]
  }
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// In a real app, you would fetch the post from your database
async function getPost(slug: string) {
  // Simulate API call
  if (slug === mockPost.slug) {
    return mockPost
  }
  return null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found | Noscere Blog"
    }
  }

  return {
    title: `${post.title} | Noscere Blog`,
    description: post.excerpt,
    keywords: post.tags.map(tag => tag.name),
    authors: [{ name: post.author.name || "Noscere Team" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || "Noscere Team"],
      tags: post.tags.map(tag => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil(post.content.length / 1000)
  
  const articleData = {
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    authorTitle: post.author.bio,
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.publishedAt?.toISOString(),
    url: `https://noscere.com/blog/${post.slug}`,
    image: "https://noscere.com/og-image.jpg",
    keywords: post.tags.map(tag => tag.name),
    section: post.categories[0]?.name,
    topics: ["Blockchain", "Bitcoin", "Enterprise Technology"]
  }

  const breadcrumbData = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` }
  ]

  return (
    <Layout>
      <StructuredData type="Article" data={articleData} />
      <StructuredData type="BreadcrumbList" data={breadcrumbData} />
      {/* Article Header */}
      <article className="py-12 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-8">
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-b border-light-elevated dark:border-dark-elevated py-4">
                <div className="flex items-center space-x-6 text-sm text-light-text-muted dark:text-dark-text-muted">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {post.author.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-light-text-primary dark:text-dark-text-primary">
                        {post.author.name}
                      </div>
                      <div className="text-xs">
                        {post.author.bio}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {readingTime} min read
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-light-text-primary dark:prose-headings:text-dark-text-primary prose-p:text-light-text-secondary dark:prose-p:text-dark-text-secondary prose-strong:text-light-text-primary dark:prose-strong:text-dark-text-primary prose-a:text-brand-blue hover:prose-a:text-brand-blue-dark prose-code:text-brand-blue prose-pre:bg-light-elevated dark:prose-pre:bg-dark-elevated">
              <div className="whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-light-elevated dark:border-dark-elevated">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mr-2">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-light-elevated dark:border-dark-elevated">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {post.author.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {post.author.name}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    {post.author.bio}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/about#team">
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Related Articles
              </h2>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                Continue exploring blockchain insights and expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}