import { prisma } from '@/lib/prisma'
import { Post, Category, Tag, User } from '@prisma/client'

export type BlogPost = Post & {
  author: User
  categories: Category[]
  tags: Tag[]
}

export type BlogCategory = Category & {
  _count: {
    posts: number
  }
}

export interface BlogFilters {
  searchQuery?: string
  categorySlug?: string
  tagSlugs?: string[]
  published?: boolean
}

export async function getBlogPosts(filters: BlogFilters = {}): Promise<BlogPost[]> {
  const { searchQuery, categorySlug, tagSlugs, published = true } = filters

  const where: any = {
    published
  }

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { excerpt: { contains: searchQuery, mode: 'insensitive' } },
      { content: { contains: searchQuery, mode: 'insensitive' } }
    ]
  }

  if (categorySlug) {
    where.categories = {
      some: {
        slug: categorySlug
      }
    }
  }

  if (tagSlugs && tagSlugs.length > 0) {
    where.tags = {
      some: {
        slug: {
          in: tagSlugs
        }
      }
    }
  }

  const posts = await prisma.post.findMany({
    where,
    include: {
      author: true,
      categories: true,
      tags: true
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true
    },
    include: {
      author: true,
      categories: true,
      tags: true
    }
  })

  return post
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: {
            where: {
              published: true
            }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return categories
}

export async function getBlogTags(): Promise<Tag[]> {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          published: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return tags
}

export async function getRelatedPosts(postId: string, limit = 3): Promise<BlogPost[]> {
  // Get the current post to find related posts
  const currentPost = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      categories: true,
      tags: true
    }
  })

  if (!currentPost) {
    return []
  }

  const categoryIds = currentPost.categories.map(cat => cat.id)
  const tagIds = currentPost.tags.map(tag => tag.id)

  // Find posts that share categories or tags, excluding the current post
  const relatedPosts = await prisma.post.findMany({
    where: {
      AND: [
        { id: { not: postId } },
        { published: true },
        {
          OR: [
            {
              categories: {
                some: {
                  id: { in: categoryIds }
                }
              }
            },
            {
              tags: {
                some: {
                  id: { in: tagIds }
                }
              }
            }
          ]
        }
      ]
    },
    include: {
      author: true,
      categories: true,
      tags: true
    },
    orderBy: {
      publishedAt: 'desc'
    },
    take: limit
  })

  return relatedPosts
}

export async function getBlogStats() {
  const [totalPosts, totalCategories, totalTags, totalAuthors] = await Promise.all([
    prisma.post.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.user.count()
  ])

  // Get posts from this month
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const postsThisMonth = await prisma.post.count({
    where: {
      published: true,
      publishedAt: {
        gte: startOfMonth
      }
    }
  })

  return {
    totalPosts,
    totalCategories,
    totalTags,
    totalAuthors,
    postsThisMonth
  }
}