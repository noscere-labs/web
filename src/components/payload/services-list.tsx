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
import Link from "next/link"

// Icon mapping for services
const iconMap = {
  'graduation-cap': GraduationCap,
  'code': Code,
  'lightbulb': Lightbulb,
  'building': Building2,
  'coins': Coins,
}

interface Service {
  id: string
  title: string
  subtitle: string
  slug: string
  description: string
  icon: keyof typeof iconMap
  features: Array<{ feature: string }>
  benefits: Array<{ benefit: string }>
  deliverables: Array<{ deliverable: string }>
  duration: string
  pricing: string
  featured: boolean
  order: number
}

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
  // Sort services by order
  const sortedServices = [...services].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-24">
      {sortedServices.map((service, index) => {
        const Icon = iconMap[service.icon] || Lightbulb

        return (
          <div
            key={service.id}
            id={service.slug}
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
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {item.feature}
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
                        {service.benefits.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <ArrowRight className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">
                              {item.benefit}
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
                    {service.deliverables.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="justify-start p-3 mr-3">
                        {item.deliverable}
                      </Badge>
                    ))}
                  </div>

                  <div className={'lg:col-start-1'}>
                    <div className="space-y-8">
                      <Button asChild className="w-full sm:w-auto">
                        <Link href={`/contact?service=${service.slug}`}>
                          Get Started with {service.title}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      })}
    </div>
  )
}