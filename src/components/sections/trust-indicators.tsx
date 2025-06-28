import { Clock, Shield, Star, Users } from "lucide-react"

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
            Join the growing number of enterprises that have transformed their business with blockchain technology.
          </p>
        </div>



      </div>
    </section>
  )
}