"use client"

import { BlogPostCard } from "@/components/blog/blog-post-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { LoadingSkeleton } from "@/components/ui/loading"
import { BlogCategory, BlogPost } from "@/lib/blog"
import { Tag } from "@prisma/client"
import { BookOpen, Calendar, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface BlogPageClientProps {
  initialPosts: BlogPost[]
  categories: BlogCategory[]
  tags: Tag[]
  stats: {
    totalPosts: number
    totalCategories: number
    totalTags: number
    totalAuthors: number
    postsThisMonth: number
  }
}

export function BlogPageClient({ initialPosts, categories, tags, stats }: BlogPageClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Filter posts based on search query, category, and tags
  useEffect(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.categories.some(cat => cat.slug === selectedCategory)
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(tagSlug =>
          post.tags.some(tag => tag.slug === tagSlug)
        )
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedCategory, selectedTags])

  const handleTagToggle = (tagSlug: string) => {
    setSelectedTags(prev =>
      prev.includes(tagSlug)
        ? prev.filter(t => t !== tagSlug)
        : [...prev, tagSlug]
    )
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(undefined)
    setSelectedTags([])
  }

  const statsDisplay = [
    { label: "Total Posts", value: stats.totalPosts, icon: BookOpen },
    { label: "Categories", value: stats.totalCategories, icon: TrendingUp },
    { label: "Authors", value: stats.totalAuthors, icon: Users },
    { label: "This Month", value: stats.postsThisMonth, icon: Calendar }
  ]

  return (
    <Layout>


      {/* Blog Content */}
      <section className="py-12 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSearch
                categories={categories}
                tags={tags}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onCategoryChange={setSelectedCategory}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                  Latest Posts
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                  {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                    <span className="ml-2">
                      • <Button variant="ghost" size="sm" onClick={handleClearFilters} className="p-0 h-auto text-brand-blue">
                        Clear filters
                      </Button>
                    </span>
                  )}
                </p>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <LoadingSkeleton key={i} className="h-64" />
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      featured={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-light-text-muted dark:text-dark-text-muted mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    No posts found
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    Try adjusting your search criteria or clear the filters.
                  </p>
                  <Button onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}