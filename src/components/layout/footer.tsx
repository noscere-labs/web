import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Bitcoin Education", href: "/services#bitcoin-education" },
    { name: "Developer Training", href: "/services#developer-training" },
    { name: "Consultancy", href: "/services#consultancy" },
    { name: "Enterprise Development", href: "/services#enterprise-development" },
  ],
  resources: [
    { name: "Lab", href: "/lab" },
    { name: "Documentation", href: "/docs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "mailto:hello@noscere.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-elevated dark:border-dark-elevated">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Noscere
              </span>
            </Link>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 max-w-md">
              We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, 
              turning emerging possibilities into competitive advantages.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-light-text-muted dark:text-dark-text-muted hover:text-brand-blue transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-light-elevated dark:border-dark-elevated">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
              © {new Date().getFullYear()} Noscere. All rights reserved.
            </p>
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-2 md:mt-0">
              Noscere - Latin for &ldquo;to know&rdquo; and &ldquo;to understand&rdquo;
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}