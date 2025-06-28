import { Layout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BSV Blockchain Lab - Interactive Tools & Demos | Noscere",
  description: "Exploring BSV Blockchain technology.",
  keywords: ["blockchain tools", "bitcoin", "BSV blockchain"],
}



const learningResources = [
  {
    title: "Bitcoin Whitepaper",
    description: "The original Bitcoin whitepaper by Satoshi Nakamoto",
    url: "https://bitcoin.org/bitcoin.pdf",
    type: "PDF"
  },
]

export default function LabPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Bitcoin Lab
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Interactive{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                Bitcoin Tools
              </span>
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
              Explore Bitcoin technology through hands-on tools and demonstrations.
              Perfect for learning about cryptography, hashing, and encoding used in the Bitcoin protocol.
            </p>


          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            </div>

          </div>
        </div>
      </section>



    </Layout>
  )
}