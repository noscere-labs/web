import { Metadata } from "next"
import { BlogPageClient } from "@/components/blog/blog-page-client"

export const metadata: Metadata = {
  title: "Blog - Blockchain Insights & Expertise | Noscere",
  description: "Stay informed with the latest blockchain trends, implementation strategies, and expert insights from our team of industry professionals.",
  keywords: ["blockchain blog", "bitcoin insights", "enterprise blockchain", "cryptocurrency", "blockchain strategy"],
}

export default function BlogPage() {
  return <BlogPageClient />
}