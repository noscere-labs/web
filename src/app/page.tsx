import { Layout } from "@/components/layout/layout"
import { Hero } from "@/components/sections/hero"
import { ServicesOverview } from "@/components/sections/services-overview"
import { TrustIndicators } from "@/components/sections/trust-indicators"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ServicesOverview />
      <TrustIndicators />
      <CTA />
    </Layout>
  )
}
