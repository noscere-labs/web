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

  )
}