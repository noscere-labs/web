import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Layout } from "@/components/layout/layout"
import { StructuredData } from "@/components/seo/structured-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBlogPost, getRelatedPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Bookmark, Calendar, Clock, Share2 } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"


interface BlogPostPageProps {
  params: {
    slug: string
  }
}


export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Noscere Blog"
    }
  }

  return {
    title: `${post.title} | Noscere Blog`,
    description: post.excerpt || '',
    keywords: post.tags.map(tag => tag.name),
    authors: [{ name: post.author.name || "Noscere Team" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || "Noscere Team"],
      tags: post.tags.map(tag => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || '',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id)
  const readingTime = Math.ceil(post.content.length / 1000)

  const articleData = {
    title: post.title,
    description: post.excerpt || '',
    author: post.author.name,
    authorTitle: post.author.bio,
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.publishedAt?.toISOString(),
    url: `https://noscere.com/blog/${post.slug}`,
    image: "https://noscere.com/og-image.jpg",
    keywords: post.tags.map(tag => tag.name),
    section: post.categories[0]?.name,
    topics: ["Blockchain", "Blockchain", "Enterprise Technology"]
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

              {post.excerpt && (
                <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between border-t border-b border-light-elevated dark:border-dark-elevated py-4">
                <div className="flex items-center space-x-6 text-sm text-light-text-muted dark:text-dark-text-muted">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {post.author.avatar || post.author.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-light-text-primary dark:text-dark-text-primary">
                        {post.author.name || 'Anonymous'}
                      </div>
                      {post.author.bio && (
                        <div className="text-xs">
                          {post.author.bio}
                        </div>
                      )}
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
                    {post.author.avatar || post.author.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {post.author.name || 'Anonymous'}
                  </h3>
                  {post.author.bio && (
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                      {post.author.bio}
                    </p>
                  )}
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