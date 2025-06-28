import { Layout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Code,
  Coins,
  GraduationCap,
  Lightbulb
} from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blockchain Services - Enterprise Bitcoin Consulting | Noscere",
  description: "Professional blockchain services including Bitcoin education, developer training, strategic consultancy, enterprise development, and tokenised solutions for businesses.",
  keywords: ["blockchain services", "bitcoin consulting", "developer training", "enterprise blockchain", "tokenisation"],
}

const services = [
  {
    id: "bitcoin-education",
    title: "Bitcoin Education",
    subtitle: "Executive & Team Training Programs",
    description: "Comprehensive educational programs designed to bring your entire organization up to speed on Bitcoin fundamentals, use cases, and strategic implementation opportunities.",
    icon: GraduationCap,
    features: [
      "Executive Leadership Workshops",
      "Technical Deep-Dive Sessions",
      "Custom Curriculum Development",
      "Hands-on Learning Labs",
      "Certification Programs",
      "Ongoing Support & Resources"
    ],
    benefits: [
      "Reduce implementation risks through education",
      "Build internal blockchain expertise",
      "Accelerate decision-making processes",
      "Create organizational alignment"
    ],
    deliverables: [
      "Custom training materials",
      "Workshop sessions (2-5 days)",
      "Certification assessments",
      "Resource library access"
    ],
    duration: "2-8 weeks",
    pricing: "Custom pricing based on scope"
  },
  {
    id: "developer-training",
    title: "Bitcoin Developer Training",
    subtitle: "Technical Skill Development",
    description: "Intensive hands-on training for development teams to build, deploy, and maintain Bitcoin-based applications, smart contracts, and Lightning Network solutions.",
    icon: Code,
    features: [
      "Lightning Network Development",
      "Bitcoin Script Programming",
      "Security Best Practices",
      "Testing & Debugging",
      "Integration Patterns",
      "Performance Optimization"
    ],
    benefits: [
      "Build production-ready applications",
      "Implement security best practices",
      "Reduce development time and costs",
      "Create maintainable codebases"
    ],
    deliverables: [
      "Comprehensive code examples",
      "Development environment setup",
      "Best practice guidelines",
      "Testing frameworks"
    ],
    duration: "4-12 weeks",
    pricing: "Starting at $15,000"
  },
  {
    id: "consultancy",
    title: "Strategic Consultancy",
    subtitle: "Expert Advisory Services",
    description: "Expert advisory services to help enterprises navigate blockchain adoption, from initial strategy development to full implementation planning and risk assessment.",
    icon: Lightbulb,
    features: [
      "Blockchain Strategy Development",
      "Technology Assessment",
      "Risk Analysis & Mitigation",
      "Compliance Guidance",
      "ROI Modeling",
      "Implementation Roadmaps"
    ],
    benefits: [
      "Minimize adoption risks",
      "Optimize technology choices",
      "Ensure regulatory compliance",
      "Maximize return on investment"
    ],
    deliverables: [
      "Strategic assessment report",
      "Technology recommendations",
      "Implementation roadmap",
      "Risk mitigation plan"
    ],
    duration: "4-16 weeks",
    pricing: "Starting at $25,000"
  },
  {
    id: "enterprise-development",
    title: "Enterprise Development",
    subtitle: "Custom Blockchain Solutions",
    description: "End-to-end development of custom blockchain solutions tailored to enterprise needs, from proof-of-concepts to production-ready applications with full integration support.",
    icon: Building2,
    features: [
      "Custom Application Development",
      "System Integration",
      "Scalable Architecture Design",
      "Security Implementation",
      "Performance Optimization",
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
    duration: "12-52 weeks",
    pricing: "Starting at $100,000"
  },
  {
    id: "tokenised-solutions",
    title: "Tokenised Solutions",
    subtitle: "Token-Based Business Models",
    description: "Design and implement innovative token-based business models that create new revenue streams, enhance customer engagement, and unlock new possibilities for your business.",
    icon: Coins,
    features: [
      "Token Economics Design",
      "Smart Contract Development",
      "Governance Model Creation",
      "Compliance Strategy",
      "Launch & Distribution",
      "Community Building"
    ],
    benefits: [
      "Create new revenue streams",
      "Enhance customer loyalty",
      "Build community engagement",
      "Future-proof business model"
    ],
    deliverables: [
      "Token economic model",
      "Smart contract suite",
      "Governance framework",
      "Launch strategy"
    ],
    duration: "16-40 weeks",
    pricing: "Starting at $75,000"
  }
]

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We start with a comprehensive assessment of your needs, goals, and current technology landscape."
  },
  {
    step: "02",
    title: "Strategy",
    description: "Develop a customized approach that aligns blockchain technology with your business objectives."
  },
  {
    step: "03",
    title: "Implementation",
    description: "Execute the plan with regular check-ins, progress updates, and continuous optimization."
  },
  {
    step: "04",
    title: "Support",
    description: "Provide ongoing support, training, and guidance to ensure long-term success."
  }
]

export default function ServicesPage() {
  return (
    <Layout>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="flex justify-center"
                >
                  <div className="max-w-4xl">
                    <Card className="h-full">
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
                          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            Benefits
                          </h3>

                          <ul className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                              {service.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start">
                                  <ArrowRight className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    {benefit}
                                  </span>
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            Deliverables
                          </h3>
                          {service.deliverables.map((deliverable) => (
                            <Badge key={deliverable} variant="secondary" className="justify-start p-3 mr-3">
                              {deliverable}
                            </Badge>
                          ))}
                        </div>
                        <div className={'lg:col-start-1'}>
                          <div className="space-y-8">


                            <Button asChild className="w-full sm:w-auto">
                              <Link href={`/contact?service=${service.id}`}>
                                Get Started with {service.title}

                              </Link>
                            </Button>
                          </div>
                        </div>
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-light-elevated dark:border-dark-elevated">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-brand-blue mr-2" />
                            <div>
                              <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Duration</div>
                              <div className="text-sm font-medium">{service.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-brand-blue mr-2" />
                            <div>
                              <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Investment</div>
                              <div className="text-sm font-medium">{service.pricing}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-brand-blue mr-2" />
                            <div>
                              <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Delivery</div>
                              <div className="text-sm font-medium">Custom</div>
                            </div>
                          </div>
                        </div> */}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-light-card dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Our Process
            </h2>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              A proven methodology that ensures successful blockchain implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-brand-blue to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Choose the service that best fits your needs, or contact us for a custom solution.
              Every engagement begins with a free consultation to understand your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-brand-blue hover:bg-gray-100"
              >
                <Link href="/contact">
                  Schedule Free Consultation

                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-brand-blue"
              >
                <Link href="/about">Learn About Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  )
}