import { Metadata } from "next"
import { Layout } from "@/components/layout/layout"
import { BitcoinAddressGenerator } from "@/components/lab/bitcoin-address-generator"
import { HashCalculator } from "@/components/lab/hash-calculator"
import { Base58Converter } from "@/components/lab/base58-converter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Beaker, 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  ArrowRight,
  AlertTriangle,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bitcoin Lab - Interactive Tools & Demos | Noscere",
  description: "Explore Bitcoin technology with interactive tools including address generation, hash calculators, and Base58 encoding. Educational blockchain demonstrations.",
  keywords: ["bitcoin lab", "blockchain tools", "bitcoin address generator", "hash calculator", "base58", "educational tools"],
}

const tools = [
  {
    title: "Bitcoin Address Generator",
    description: "Generate Bitcoin addresses and key pairs to understand the cryptographic foundations of Bitcoin.",
    icon: Shield,
    category: "Cryptography",
    difficulty: "Beginner"
  },
  {
    title: "Hash Calculator", 
    description: "Calculate SHA-256 and double SHA-256 hashes used throughout the Bitcoin protocol.",
    icon: Zap,
    category: "Hashing",
    difficulty: "Beginner"
  },
  {
    title: "Base58 Converter",
    description: "Convert between hexadecimal and Base58 encoding used in Bitcoin addresses and keys.",
    icon: Code,
    category: "Encoding",
    difficulty: "Intermediate"
  }
]

const learningResources = [
  {
    title: "Bitcoin Whitepaper",
    description: "The original Bitcoin whitepaper by Satoshi Nakamoto",
    url: "https://bitcoin.org/bitcoin.pdf",
    type: "PDF"
  },
  {
    title: "Mastering Bitcoin",
    description: "Comprehensive guide to Bitcoin by Andreas Antonopoulos",
    url: "https://github.com/bitcoinbook/bitcoinbook",
    type: "Book"
  },
  {
    title: "Bitcoin Core Documentation",
    description: "Technical documentation for Bitcoin Core",
    url: "https://bitcoincore.org/en/doc/",
    type: "Docs"
  },
  {
    title: "Bitcoin Improvement Proposals",
    description: "Collection of proposals for Bitcoin protocol improvements",
    url: "https://github.com/bitcoin/bips",
    type: "Specs"
  }
]

export default function LabPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Beaker className="h-8 w-8 text-brand-blue mr-3" />
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
            
            <div className="flex items-center justify-center gap-8 text-sm text-light-text-muted dark:text-dark-text-muted">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                Educational Purpose Only
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2" />
                Client-Side Processing
              </div>
              <div className="flex items-center">
                <Code className="h-4 w-4 text-brand-blue mr-2" />
                Open Source
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-8 bg-yellow-50 dark:bg-yellow-900/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Educational Tools Disclaimer
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  These tools are designed for educational purposes only. Never use generated keys, addresses, 
                  or any output from these tools for real Bitcoin transactions. Always use proper, 
                  security-audited software for actual cryptocurrency operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-16 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Available Tools
              </h2>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                Interactive demonstrations of core Bitcoin technologies
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tool.category}
                          </Badge>
                          <Badge 
                            variant={tool.difficulty === 'Beginner' ? 'success' : 'secondary'} 
                            className="text-xs"
                          >
                            {tool.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <BitcoinAddressGenerator />
            <HashCalculator />
            <Base58Converter />
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-brand-blue mr-3" />
                <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  Learning Resources
                </h2>
              </div>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                Deepen your Bitcoin knowledge with these essential resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {learningResources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary group-hover:text-brand-blue transition-colors">
                        {resource.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-brand-blue hover:text-brand-blue-dark transition-colors"
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Lightbulb className="h-16 w-16 text-white mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for Real Implementation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              These tools provide a foundation for understanding Bitcoin technology. 
              When you&apos;re ready to implement blockchain solutions in your enterprise, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild 
                className="bg-white text-brand-blue hover:bg-gray-100"
              >
                <Link href="/contact">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-white text-white hover:bg-white hover:text-brand-blue"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}