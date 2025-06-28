import { Layout } from "@/components/layout/layout"
import { Hero } from "@/components/sections/hero"
import { StructuredData } from "@/components/seo/structured-data"

export default function Home() {
  const webPageData = {
    title: "Noscere - Demystifying Blockchain for Enterprise",
    description: "We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, turning emerging possibilities into competitive advantage.",
    url: "https://noscere.com",
    breadcrumb: [{ name: "Home", path: "/" }]
  }

  return (
    <Layout>
      <StructuredData type="WebPage" data={webPageData} />
      <Hero />
      {/* <ServicesOverview /> */}
      {/* <TrustIndicators /> */}
      {/* <CTA /> */}
    </Layout>
  )
}
