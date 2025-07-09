"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"
import { BlogCategory } from "@/lib/blog"
import { Tag } from "@prisma/client"

interface BlogSearchProps {
  categories: BlogCategory[]
  tags: Tag[]
  selectedCategory: string | undefined
  selectedTags: string[]
  searchQuery: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string | undefined) => void
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
}

export function BlogSearch({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  searchQuery,
  onSearchChange,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}: BlogSearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const hasActiveFilters = selectedCategory || selectedTags.length > 0

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-muted dark:text-dark-text-muted" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs">
                  {(selectedCategory ? 1 : 0) + selectedTags.length}
                </Badge>
              )}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!selectedCategory ? "primary" : "outline"}
                    size="sm"
                    onClick={() => onCategoryChange(undefined)}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.slug ? "primary" : "outline"}
                      size="sm"
                      onClick={() => onCategoryChange(
                        selectedCategory === category.slug ? undefined : category.slug
                      )}
                    >
                      {category.name}
                      {category._count && (
                        <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                          {category._count.posts}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant={selectedTags.includes(tag.slug) ? "primary" : "outline"}
                      size="sm"
                      onClick={() => onTagToggle(tag.slug)}
                    >
                      #{tag.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.slug === selectedCategory)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryChange(undefined)}
              />
            </Badge>
          )}
          {selectedTags.map((tagSlug) => {
            const tag = tags.find(t => t.slug === tagSlug)
            return tag ? (
              <Badge key={tagSlug} variant="secondary" className="flex items-center gap-1">
                #{tag.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => onTagToggle(tagSlug)}
                />
              </Badge>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}