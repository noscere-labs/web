import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Code, Lightbulb, Building2, Coins, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Bitcoin Education",
    description: "Comprehensive training programs designed to educate enterprise teams on Bitcoin fundamentals, use cases, and strategic implementation.",
    icon: GraduationCap,
    href: "/services#bitcoin-education",
    features: ["Executive Workshops", "Technical Deep Dives", "Custom Curricula"]
  },
  {
    title: "Developer Training",
    description: "Hands-on technical training for development teams to build, deploy, and maintain Bitcoin-based applications and infrastructure.",
    icon: Code,
    href: "/services#developer-training",
    features: ["Lightning Network", "Bitcoin Script", "Security Best Practices"]
  },
  {
    title: "Strategic Consultancy",
    description: "Expert advisory services to help enterprises navigate blockchain adoption, from initial strategy to full implementation.",
    icon: Lightbulb,
    href: "/services#consultancy",
    features: ["Strategy Planning", "Risk Assessment", "Compliance Guidance"]
  },
  {
    title: "Enterprise Development",
    description: "Custom blockchain solutions tailored to enterprise needs, from proof-of-concepts to production-ready applications.",
    icon: Building2,
    href: "/services#enterprise-development",
    features: ["Custom Solutions", "Integration Support", "Scalable Architecture"]
  },
  {
    title: "Tokenised Solutions",
    description: "Design and implement token-based business models that create new revenue streams and enhance customer engagement.",
    icon: Coins,
    href: "/services#tokenised-solutions",
    features: ["Token Economics", "Smart Contracts", "Governance Models"]
  }
]

export function ServicesOverview() {
  return (
    <section className="py-24 bg-light-card dark:bg-dark-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            From education to implementation, we provide comprehensive blockchain solutions 
            that drive real business value for enterprise clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" asChild className="w-full group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-colors">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}