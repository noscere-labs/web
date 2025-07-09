import { Layout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Lightbulb
} from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blockchain Services - Enterprise Blockchain Consulting | Noscere",
  description: "Professional blockchain services including Blockchain education, developer training, strategic consultancy, enterprise development, and tokenised solutions for businesses.",
  keywords: ["blockchain services", "blockchain consulting", "developer training", "enterprise blockchain", "tokenisation"],
}

const services = [
  {
    id: "consultancy",
    title: "Blockchain Consultancy",
    subtitle: "Wondering how blockchain can benefit your business?",
    description: "Our consultancy services help organisations navigate blockchain adoption, from initial strategy to full rollout.",
    icon: Lightbulb,
    features: [
      "Orientation Workshops",
      "Discovery Workshops",
      "Readiness Assessment",
      "Implementation Roadmap",
    ],
    benefits: [
      "Understand blockchain fundamentals",
      "Learn what blockchain can do for you",
      "Develop a clear strategy",
      "Understand your organisation's readiness",
      "Plan for successful implementation",
    ],
    deliverables: [
      "Workshops & Materials",
      "Strategic Plan",
      "Technology recommendations",
      "Implementation roadmap",
    ]
  },
  {
    id: "enterprise-development",
    title: "Blockchain Solutions Development",
    subtitle: "Enterprise Blockchain Solutions",
    description: "End-to-end development of custom blockchain solutions tailored to enterprise needs, from proof-of-concepts to production build applications with full integration support.",
    icon: Building2,
    features: [
      "Custom Development",
      "Scalable Architectural Design",
      "Ongoing Maintenance"
    ],
    benefits: [
      "Tailored to specific business needs",
      "Enterprise-grade security and scalability",
      "Seamless integration with existing systems",
      "Long-term support and maintenance"
    ],
    deliverables: [
      "Production-ready application",
      "Documentation & training",
      "Integration guides",
      "Maintenance plan"
    ],
  }
]


export default function ServicesPage() {
  return (
    <Layout>
      {/* Services Tabs */}
      <section id="services" className="py-12 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">

          <Tabs defaultValue="consultancy" className="w-full max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-light-card dark:bg-dark-card">
                <TabsList className="grid w-full grid-cols-3 h-auto bg-transparent border-0 gap-0 p-0">
                  {services.map((service) => (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="text-sm px-6 py-4 font-medium rounded-none bg-transparent text-light-text-secondary dark:text-dark-text-secondary data-[state=active]:bg-light-card dark:data-[state=active]:bg-dark-card data-[state=active]:text-light-text-primary dark:data-[state=active]:text-dark-text-primary data-[state=active]:shadow-none border-b-0 relative data-[state=active]:border-b-0"
                    >
                      {service.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {services.map((service) => {
                const Icon = service.icon

                return (
                  <TabsContent key={service.id} value={service.id} className="m-0">
                    <div className="h-full">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-4">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                            <CardDescription className="text-brand-blue font-medium">
                              {service.subtitle}
                            </CardDescription>
                          </div>
                        </div>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                          {service.description}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.features.map((feature) => (
                              <div key={feature} className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                            Benefits
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.benefits.map((benefit) => (
                              <div key={benefit} className="flex items-start">
                                <ArrowRight className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                            Deliverables
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.deliverables.map((deliverable) => (
                              <Badge key={deliverable} variant="secondary" className="px-3 py-1">
                                {deliverable}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-light-elevated dark:border-dark-elevated">
                          <Button asChild className="w-full sm:w-auto">
                            <Link href={`/contact?service=${service.id}`}>
                              Get Started with {service.title}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </TabsContent>
                )
              })}
            </Card>
          </Tabs>
        </div>
      </section>



    </Layout>
  )
}