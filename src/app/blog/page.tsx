import { BlogPageClient } from "@/components/blog/blog-page-client"
import { getBlogPosts, getBlogCategories, getBlogTags, getBlogStats } from "@/lib/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Thoughts from the Edge | Noscere",
  description: "Opinions, insights, and mind bulbs from the bleeding edge of blockchain technology. ",
  keywords: ["blockchain blog", "blockchain insights", "enterprise blockchain", "cryptocurrency", "blockchain strategy"],
}

export default async function BlogPage() {
  const [posts, categories, tags, stats] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
    getBlogTags(),
    getBlogStats()
  ])

  return (
    <BlogPageClient 
      initialPosts={posts}
      categories={categories}
      tags={tags}
      stats={stats}
    />
  )
}