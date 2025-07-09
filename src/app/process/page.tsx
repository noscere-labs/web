import { Layout } from "@/components/layout/layout"
import { StructuredData } from "@/components/seo/structured-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Process - Blockchain Implementation Methodology | Noscere",
  description: "A proven 4-step methodology that ensures successful blockchain implementation: Discover, Design, Develop, and Deliver.",
  keywords: ["blockchain process", "implementation methodology", "blockchain consulting process", "enterprise blockchain", "blockchain strategy"],
}

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We start with a comprehensive assessment of your needs, goals, and your current technology landscape."
  },
  {
    step: "02",
    title: "Design",
    description: "Design a custom approach that aligns blockchain technology with your organisational objectives."
  },
  {
    step: "03",
    title: "Develop",
    description: "Execute on the design with agile development practices, ensuring flexibility and responsiveness to change."
  },
  {
    step: "04",
    title: "Deliver",
    description: "Post development support, training, and guidance to ensure long-term success."
  }
]

export default function ProcessPage() {
  const webPageData = {
    title: "Our Process - Blockchain Implementation Methodology",
    description: "A proven 4-step methodology that ensures successful blockchain implementation: Discover, Design, Develop, and Deliver.",
    url: "https://noscere.com/process",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Process", path: "/process" }
    ]
  }

  return (
    <Layout>
      <StructuredData type="WebPage" data={webPageData} />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Our Process
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              A proven methodology that ensures successful blockchain implementation
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-light-card dark:bg-dark-bg">
        <div className="container mx-auto px-4">
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

      {/* Detailed Process Description */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                How We Work
              </h2>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                Our structured approach ensures every blockchain implementation is successful, scalable, and aligned with your business objectives.
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-4">
                      <span className="text-white font-bold">01</span>
                    </div>
                    <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      Discover
                    </h3>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                    We begin every engagement with a comprehensive discovery phase. This involves understanding your business objectives, current technology landscape, and specific challenges that blockchain technology could address.
                  </p>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Stakeholder interviews and workshops</li>
                    <li>• Technical infrastructure assessment</li>
                    <li>• Business process analysis</li>
                    <li>• Risk and compliance evaluation</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-xl p-8 border border-brand-blue/20">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Current state assessment report</li>
                    <li>• Requirements documentation</li>
                    <li>• Technical feasibility analysis</li>
                    <li>• Project scope definition</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-xl p-8 border border-brand-blue/20">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Solution architecture design</li>
                    <li>• Technology stack recommendations</li>
                    <li>• Implementation timeline</li>
                    <li>• Cost-benefit analysis</li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-4">
                      <span className="text-white font-bold">02</span>
                    </div>
                    <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      Design
                    </h3>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                    Based on our discovery findings, we design a custom blockchain solution that aligns perfectly with your organizational objectives and technical requirements.
                  </p>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Solution architecture planning</li>
                    <li>• User experience design</li>
                    <li>• Security framework development</li>
                    <li>• Integration strategy definition</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-4">
                      <span className="text-white font-bold">03</span>
                    </div>
                    <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      Develop
                    </h3>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                    Our development phase uses agile methodologies to ensure flexibility and responsiveness to changing requirements throughout the implementation process.
                  </p>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Agile development sprints</li>
                    <li>• Regular progress reviews</li>
                    <li>• Continuous testing and validation</li>
                    <li>• Stakeholder feedback integration</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-xl p-8 border border-brand-blue/20">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Production-ready application</li>
                    <li>• Comprehensive testing suite</li>
                    <li>• Technical documentation</li>
                    <li>• Source code and deployment scripts</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-xl p-8 border border-brand-blue/20">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Training materials and sessions</li>
                    <li>• Ongoing support documentation</li>
                    <li>• Maintenance and update plan</li>
                    <li>• Performance monitoring setup</li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-4">
                      <span className="text-white font-bold">04</span>
                    </div>
                    <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      Deliver
                    </h3>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                    Our commitment extends beyond deployment. We provide comprehensive support, training, and guidance to ensure your team can effectively manage and evolve the solution.
                  </p>
                  <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <li>• Team training and knowledge transfer</li>
                    <li>• Post-deployment support</li>
                    <li>• Performance monitoring and optimization</li>
                    <li>• Ongoing strategic guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}