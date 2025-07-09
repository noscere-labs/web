import { ContactForm } from "@/components/forms/contact-form"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Users,
  Zap
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Noscere - Schedule Your Blockchain Consultation",
  description: "Get in touch with Noscere for expert blockchain consulting. Schedule a free consultation to discuss your enterprise blockchain needs and implementation strategy.",
  keywords: ["contact noscere", "blockchain consultation", "enterprise blockchain", "blockchain consulting"],
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@noscere.com",
    link: "mailto:hello@noscere.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    link: null
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    link: null
  }
]

const consultationFeatures = [
  {
    icon: Calendar,
    title: "Free Initial Consultation",
    description: "30-minute discovery call to understand your needs and goals"
  },
  {
    icon: Shield,
    title: "Confidential & Secure",
    description: "All discussions are covered under strict confidentiality agreements"
  },
  {
    icon: Zap,
    title: "Quick Turnaround",
    description: "Receive detailed proposal and next steps within 48 hours"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Direct access to our senior blockchain consultants"
  }
]

const faqs = [
  {
    question: "How long does the initial consultation take?",
    answer: "Our initial consultation typically takes 30-45 minutes. This gives us enough time to understand your project requirements and provide meaningful initial guidance."
  },
  {
    question: "Is the consultation really free?",
    answer: "Yes, absolutely! We believe in building relationships first. The initial consultation helps us understand if we're a good fit for your project before any financial commitment."
  },
  {
    question: "What should I prepare for the consultation?",
    answer: "Come prepared to discuss your business goals, current technology stack, timeline, and any specific blockchain use cases you're considering. Don't worry if you're not sure about technical details - we'll help guide the conversation."
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer: "While we specialize in enterprise blockchain solutions, we also work with well-funded startups and scale-ups that have serious blockchain implementation needs."
  },
  {
    question: "What happens after the consultation?",
    answer: "Within 48 hours, you'll receive a detailed follow-up with our recommendations, potential approaches, estimated timelines, and a proposal for next steps if there's a good fit."
  }
]

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Let&apos;s Discuss Your{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                Blockchain Strategy
              </span>
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
              Ready to explore how blockchain technology can transform your business?
              Schedule a free consultation with our experts to discuss your specific needs and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      const content = (
                        <div className="flex items-center p-3 rounded-lg hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mr-3">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
                              {info.label}
                            </div>
                            <div className="font-medium text-light-text-primary dark:text-dark-text-primary">
                              {info.value}
                            </div>
                          </div>
                        </div>
                      )

                      return info.link ? (
                        <a key={index} href={info.link} className="block">
                          {content}
                        </a>
                      ) : (
                        <div key={index}>
                          {content}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Features */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                    What to Expect
                  </h3>
                  <div className="space-y-4">
                    {consultationFeatures.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-start">
                          <div className="h-8 w-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mr-3 mt-1">
                            <Icon className="h-4 w-4 text-brand-blue" />
                          </div>
                          <div>
                            <div className="font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                              {feature.title}
                            </div>
                            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                Common questions about our consultation process
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Prefer to Talk Directly?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Sometimes it&apos;s easier to have a quick conversation. Feel free to reach out directly
              via email or phone, and we&apos;ll schedule a time that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@noscere.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-blue font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us Directly
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-brand-blue transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}