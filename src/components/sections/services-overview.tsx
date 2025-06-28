import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Code, Coins, GraduationCap, Lightbulb } from "lucide-react"
import Link from "next/link"

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
          <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            Our Services
          </h2>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Comprehensive blockchain solutions for enterprise success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="group">
                <div className="h-full p-6 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-elevated dark:border-dark-elevated hover:border-brand-blue dark:hover:border-brand-blue transition-all duration-300">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <ArrowRight className="h-4 w-4 text-brand-blue mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild variant="outline" className="w-full group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue">
                    <Link href={service.href}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}