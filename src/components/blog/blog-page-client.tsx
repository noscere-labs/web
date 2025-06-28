"use client"

import { BlogPostCard } from "@/components/blog/blog-post-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { LoadingSkeleton } from "@/components/ui/loading"
import { BookOpen, Calendar, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

// Mock data for demonstration - in a real app, this would come from your database
const mockPosts = [
  {
    id: "1",
    title: "Understanding Bitcoin's Lightning Network for Enterprise Applications",
    slug: "bitcoin-lightning-network-enterprise",
    excerpt: "Explore how Bitcoin's Lightning Network can revolutionize enterprise payments with instant, low-cost transactions and improved scalability.",
    content: "The Lightning Network represents a significant leap forward in Bitcoin's capability to handle enterprise-scale transactions. By creating a secondary layer on top of the Bitcoin blockchain, it enables instant, low-cost payments that are perfect for business applications...",
    published: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
    author: {
      id: "1",
      name: "Alex Chen",
      email: "alex@noscere.com"
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
  },
  {
    id: "2",
    title: "Blockchain Implementation Strategy: A Step-by-Step Guide for CTOs",
    slug: "blockchain-implementation-strategy-ctos",
    excerpt: "A comprehensive guide for technology leaders on how to successfully implement blockchain solutions in enterprise environments.",
    content: "Implementing blockchain technology in an enterprise environment requires careful planning, stakeholder alignment, and technical expertise. This guide provides CTOs with a roadmap...",
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
      { id: "5", name: "cto", slug: "cto" },
      { id: "6", name: "planning", slug: "planning" }
    ]
  },
  {
    id: "3",
    title: "Smart Contract Security: Best Practices for Enterprise Development",
    slug: "smart-contract-security-best-practices",
    excerpt: "Learn essential security practices for developing and deploying smart contracts in enterprise blockchain applications.",
    content: "Smart contract security is paramount in enterprise blockchain development. A single vulnerability can result in significant financial losses and damage to reputation...",
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
      { id: "8", name: "security", slug: "security" },
      { id: "9", name: "best-practices", slug: "best-practices" }
    ]
  },
  {
    id: "4",
    title: "Tokenization in Traditional Finance: Opportunities and Challenges",
    slug: "tokenization-traditional-finance",
    excerpt: "Examining how tokenization is transforming traditional financial instruments and the challenges enterprises face in adoption.",
    content: "Tokenization represents one of the most promising applications of blockchain technology in traditional finance. By converting physical and digital assets into blockchain tokens...",
    published: true,
    publishedAt: new Date("2023-12-28"),
    createdAt: new Date("2023-12-28"),
    author: {
      id: "4",
      name: "Emma Wilson",
      email: "emma@noscere.com"
    },
    categories: [
      { id: "6", name: "Finance", slug: "finance" },
      { id: "7", name: "Tokenization", slug: "tokenization" }
    ],
    tags: [
      { id: "10", name: "tokenization", slug: "tokenization" },
      { id: "11", name: "finance", slug: "finance" },
      { id: "12", name: "assets", slug: "assets" }
    ]
  }
]

const mockCategories = [
  { id: "1", name: "Bitcoin", slug: "bitcoin", _count: { posts: 1 } },
  { id: "2", name: "Enterprise", slug: "enterprise", _count: { posts: 2 } },
  { id: "3", name: "Strategy", slug: "strategy", _count: { posts: 1 } },
  { id: "4", name: "Development", slug: "development", _count: { posts: 1 } },
  { id: "5", name: "Security", slug: "security", _count: { posts: 1 } },
  { id: "6", name: "Finance", slug: "finance", _count: { posts: 1 } },
  { id: "7", name: "Tokenization", slug: "tokenization", _count: { posts: 1 } }
]

const mockTags = [
  { id: "1", name: "lightning-network", slug: "lightning-network" },
  { id: "2", name: "payments", slug: "payments" },
  { id: "3", name: "scalability", slug: "scalability" },
  { id: "4", name: "implementation", slug: "implementation" },
  { id: "5", name: "cto", slug: "cto" },
  { id: "6", name: "planning", slug: "planning" },
  { id: "7", name: "smart-contracts", slug: "smart-contracts" },
  { id: "8", name: "security", slug: "security" },
  { id: "9", name: "best-practices", slug: "best-practices" },
  { id: "10", name: "tokenization", slug: "tokenization" },
  { id: "11", name: "finance", slug: "finance" },
  { id: "12", name: "assets", slug: "assets" }
]

export function BlogPageClient() {
  const [posts, setPosts] = useState(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState(mockPosts)
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

  const stats = [
    { label: "Total Posts", value: posts.length, icon: BookOpen },
    { label: "Categories", value: mockCategories.length, icon: TrendingUp },
    { label: "Authors", value: 4, icon: Users },
    { label: "This Month", value: 2, icon: Calendar }
  ]

  return (
    <Layout>


      {/* Blog Content */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSearch
                categories={mockCategories}
                tags={mockTags}
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