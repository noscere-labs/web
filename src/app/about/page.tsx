import { Metadata } from "next"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Shield, Lightbulb, Award, Globe } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Noscere - Blockchain Consultancy Experts",
  description: "Learn about Noscere's mission to demystify blockchain technology for enterprises. Meet our team of experts and discover our approach to blockchain consultation.",
  keywords: ["about noscere", "blockchain consultancy", "bitcoin experts", "enterprise blockchain", "team"],
}

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize enterprise-grade security in every solution, ensuring your blockchain implementations are robust and protected."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay at the forefront of blockchain technology, bringing cutting-edge solutions to solve real business challenges."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work as an extension of your team, providing ongoing support and guidance throughout your blockchain journey."
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every project is measured against concrete business outcomes, ensuring tangible value from blockchain adoption."
  }
]

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former blockchain architect at Fortune 500 companies with 8+ years in distributed systems and cryptocurrency.",
    expertise: ["Bitcoin Protocol", "Enterprise Architecture", "Strategy"],
    avatar: "AC"
  },
  {
    name: "Sarah Rodriguez",
    role: "Head of Engineering",
    bio: "Lead developer with extensive experience in Lightning Network implementations and smart contract auditing.",
    expertise: ["Lightning Network", "Security Audits", "Protocol Development"],
    avatar: "SR"
  },
  {
    name: "Michael Thompson",
    role: "Principal Consultant",
    bio: "Business strategist specializing in blockchain adoption for traditional enterprises and regulatory compliance.",
    expertise: ["Business Strategy", "Compliance", "Change Management"],
    avatar: "MT"
  },
  {
    name: "Emma Wilson",
    role: "Lead Trainer",
    bio: "Education specialist with a track record of training 500+ developers in blockchain technologies.",
    expertise: ["Developer Training", "Curriculum Design", "Technical Writing"],
    avatar: "EW"
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
            <Badge variant="secondary" className="mb-6">
              About Noscere
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Demystifying Blockchain,{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                One Enterprise at a Time
              </span>
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
              Founded in 2019, Noscere has been at the forefront of enterprise blockchain adoption, 
              helping organizations navigate the complex world of distributed technologies with confidence and clarity.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-brand-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                To bridge the gap between complex blockchain technology and practical business value
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  What Noscere Means
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                  &ldquo;Noscere&rdquo; is Latin for &ldquo;to know&rdquo; and &ldquo;to understand.&rdquo; 
                  This perfectly encapsulates our mission: to help enterprises truly understand blockchain technology, 
                  not just implement it. We believe that knowledge and understanding are the foundations of successful 
                  blockchain adoption.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  Our approach goes beyond technical implementation. We focus on education, strategic planning, 
                  and long-term partnership to ensure our clients don&apos;t just deploy blockchain solutions, 
                  but truly leverage them for competitive advantage.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-blue to-brand-purple p-8 rounded-2xl text-white">
                  <Globe className="h-12 w-12 mb-4 opacity-80" />
                  <h4 className="text-xl font-semibold mb-3">Global Impact</h4>
                  <p className="text-blue-100 leading-relaxed">
                    From Silicon Valley startups to Fortune 500 corporations, we&apos;ve helped organizations 
                    across 15 countries unlock the strategic value of blockchain technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
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

      {/* Team Section */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Blockchain experts with proven track records in enterprise environments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-xl">
                      {member.avatar}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-brand-blue font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 text-white mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join the growing number of enterprises that trust Noscere to guide their blockchain journey. 
              Let&apos;s discuss how we can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild 
                className="bg-white text-brand-blue hover:bg-gray-100"
              >
                <Link href="/contact">
                  Schedule Consultation
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