import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  author: {
    id: string
    name: string | null
    email: string
  }
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
}

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const readingTime = Math.ceil(post.content.length / 1000) // Rough estimate: 1000 chars per minute

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 h-full ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-xs text-light-text-muted dark:text-dark-text-muted">
            <Clock className="h-3 w-3 mr-1" />
            {readingTime} min read
          </div>
        </div>
        
        <CardTitle className={`group-hover:text-brand-blue transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-light-text-muted dark:text-dark-text-muted mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs opacity-70">
                #{tag.name}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs opacity-70">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-brand-blue hover:text-brand-blue-dark transition-colors text-sm font-medium"
          >
            Read More
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}