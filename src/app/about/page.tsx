import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Shield, Target, Users } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Noscere - Blockchain Consultancy Experts",
  description: "Learn about Noscere's mission to demystify blockchain technology for enterprises. Meet our team of experts and discover our approach to blockchain consultation.",
  keywords: ["about noscere", "blockchain consultancy", "blockchain experts", "enterprise blockchain", "team"],
}

const values = [
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "We prioritize enterprise-grade privacy and security in every solution, ensuring your implementations are protected."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We sit at the forefront of blockchain technology, leveraging cutting-edge solutions to solve real business challenges."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work as an extension of your team, providing ongoing support and guidance throughout your blockchain journey."
  },
  {
    icon: Target,
    title: "Value-Driven",
    description: "We focus on delivering tangible business value, ensuring your blockchain investments yield measurable returns."
  }
]

const team = [
  {
    name: "Craig Porter",
    role: "Founder & CEO",
    bio: "Blockchain solutions architect 6 years in distributed systems design.",
    expertise: ["Blockchain Protocol", "Enterprise Architecture", "Tokenisation"],
    avatar: "CP"
  }
]

const stats = [
  { label: "Years in Blockchain", value: "8+" },
  { label: "Enterprise Clients", value: "50+" },
  { label: "Developers Trained", value: "500+" },
  { label: "Projects Delivered", value: "100+" },
  { label: "Countries Served", value: "15+" },
  { label: "Success Rate", value: "98%" }
]

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Noscere{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                To know
              </span>
            </h1>
            <div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                &ldquo;Noscere&rdquo; is Latin for &ldquo;to know&rdquo; and &ldquo;to understand.&rdquo;
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">

                This perfectly encapsulates our mission: to help enterprises truly understand blockchain technology,
                not just implement it. We believe that knowledge and understanding are foundational to successful
                blockchain adoption.
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Our approach goes beyond technical implementation. We focus on education, strategic planning,
                and long-term partnership to ensure our clients don&apos;t just deploy blockchain solutions,
                but weild them for competitive advantage.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Our Values
            </h2>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-8">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {/* <section className="py-24 bg-light-card dark:bg-dark-card"> */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="grid lg:grid-cols-1 gap-12 items-center">

              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
                Founded in 2019, Noscere has been at the forefront of enterprise blockchain adoption,
                helping organizations navigate the public ledger with confidence and clarity.
              </p>
              {/* <div className="relative">
                <div className="bg-gradient-to-br from-brand-blue to-brand-purple p-8 rounded-2xl text-white">
                  <Globe className="h-12 w-12 mb-4 opacity-80" />
                  <h4 className="text-xl font-semibold mb-3">Global Impact</h4>
                  <p className="text-blue-100 leading-relaxed">
                    From Silicon Valley startups to Fortune 500 corporations, we&apos;ve helped organizations
                    across 15 countries unlock the strategic value of blockchain technology.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>




    </Layout>
  )
}