import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Clock, Users } from "lucide-react"

const testimonials = [
  {
    quote: "Noscere transformed our understanding of blockchain technology and helped us implement a solution that increased efficiency by 40%.",
    author: "Sarah Chen",
    title: "CTO, TechCorp",
    rating: 5
  },
  {
    quote: "The team's expertise in Bitcoin development is unmatched. They delivered our project on time and exceeded expectations.",
    author: "Michael Rodriguez",
    title: "Head of Innovation, FinanceFirst",
    rating: 5
  },
  {
    quote: "Professional, knowledgeable, and results-driven. Noscere is our go-to partner for all blockchain initiatives.",
    author: "Emma Thompson",
    title: "VP Engineering, DataDyne",
    rating: 5
  }
]

const metrics = [
  {
    icon: Shield,
    label: "Security First",
    description: "Enterprise-grade security practices"
  },
  {
    icon: Clock,
    label: "On-Time Delivery",
    description: "98% of projects delivered on schedule"
  },
  {
    icon: Users,
    label: "Expert Team",
    description: "Certified blockchain professionals"
  },
  {
    icon: Star,
    label: "5-Star Rating",
    description: "Average client satisfaction score"
  }
]

export function TrustIndicators() {
  return (
    <section className="py-24 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Join the growing number of enterprises that have transformed their business with our blockchain expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-light-text-secondary dark:text-dark-text-secondary mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Fortune 500
            </div>
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              ENTERPRISE
            </div>
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              BLOCKCHAIN
            </div>
            <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              CERTIFIED
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}