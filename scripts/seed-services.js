// Data seeding script for services
const servicesData = [
  {
    title: "Bitcoin Education",
    subtitle: "Executive & Team Training Programs",
    slug: "bitcoin-education",
    description: "Comprehensive educational programs designed to bring your entire organization up to speed on Bitcoin fundamentals, use cases, and strategic implementation opportunities.",
    icon: "graduation-cap",
    features: [
      { feature: "Executive Leadership Workshops" },
      { feature: "Technical Deep-Dive Sessions" },
      { feature: "Custom Curriculum Development" },
      { feature: "Hands-on Learning Labs" },
      { feature: "Certification Programs" },
      { feature: "Ongoing Support & Resources" }
    ],
    benefits: [
      { benefit: "Reduce implementation risks through education" },
      { benefit: "Build internal blockchain expertise" },
      { benefit: "Accelerate decision-making processes" },
      { benefit: "Create organizational alignment" }
    ],
    deliverables: [
      { deliverable: "Custom training materials" },
      { deliverable: "Workshop sessions (2-5 days)" },
      { deliverable: "Certification assessments" },
      { deliverable: "Resource library access" }
    ],
    duration: "2-8 weeks",
    pricing: "Custom pricing based on scope",
    featured: true,
    order: 1
  },
  {
    title: "Bitcoin Developer Training",
    subtitle: "Technical Skill Development",
    slug: "developer-training",
    description: "Intensive hands-on training for development teams to build, deploy, and maintain Bitcoin-based applications, smart contracts, and Lightning Network solutions.",
    icon: "code",
    features: [
      { feature: "Lightning Network Development" },
      { feature: "Bitcoin Script Programming" },
      { feature: "Security Best Practices" },
      { feature: "Testing & Debugging" },
      { feature: "Integration Patterns" },
      { feature: "Performance Optimization" }
    ],
    benefits: [
      { benefit: "Build production-ready applications" },
      { benefit: "Implement security best practices" },
      { benefit: "Reduce development time and costs" },
      { benefit: "Create maintainable codebases" }
    ],
    deliverables: [
      { deliverable: "Comprehensive code examples" },
      { deliverable: "Development environment setup" },
      { deliverable: "Best practice guidelines" },
      { deliverable: "Testing frameworks" }
    ],
    duration: "4-12 weeks",
    pricing: "Starting at $15,000",
    featured: true,
    order: 2
  },
  {
    title: "Strategic Consultancy",
    subtitle: "Expert Advisory Services",
    slug: "consultancy",
    description: "Expert advisory services to help enterprises navigate blockchain adoption, from initial strategy development to full implementation planning and risk assessment.",
    icon: "lightbulb",
    features: [
      { feature: "Blockchain Strategy Development" },
      { feature: "Technology Assessment" },
      { feature: "Risk Analysis & Mitigation" },
      { feature: "Compliance Guidance" },
      { feature: "ROI Modeling" },
      { feature: "Implementation Roadmaps" }
    ],
    benefits: [
      { benefit: "Minimize adoption risks" },
      { benefit: "Optimize technology choices" },
      { benefit: "Ensure regulatory compliance" },
      { benefit: "Maximize return on investment" }
    ],
    deliverables: [
      { deliverable: "Strategic assessment report" },
      { deliverable: "Technology recommendations" },
      { deliverable: "Implementation roadmap" },
      { deliverable: "Risk mitigation plan" }
    ],
    duration: "4-16 weeks",
    pricing: "Starting at $25,000",
    featured: true,
    order: 3
  },
  {
    title: "Enterprise Development",
    subtitle: "Custom Blockchain Solutions",
    slug: "enterprise-development",
    description: "End-to-end development of custom blockchain solutions tailored to enterprise needs, from proof-of-concepts to production-ready applications with full integration support.",
    icon: "building",
    features: [
      { feature: "Custom Application Development" },
      { feature: "System Integration" },
      { feature: "Scalable Architecture Design" },
      { feature: "Security Implementation" },
      { feature: "Performance Optimization" },
      { feature: "Ongoing Maintenance" }
    ],
    benefits: [
      { benefit: "Tailored to specific business needs" },
      { benefit: "Enterprise-grade security and scalability" },
      { benefit: "Seamless integration with existing systems" },
      { benefit: "Long-term support and maintenance" }
    ],
    deliverables: [
      { deliverable: "Production-ready application" },
      { deliverable: "Documentation & training" },
      { deliverable: "Integration guides" },
      { deliverable: "Maintenance plan" }
    ],
    duration: "12-52 weeks",
    pricing: "Starting at $100,000",
    featured: false,
    order: 4
  },
  {
    title: "Tokenised Solutions",
    subtitle: "Token-Based Business Models",
    slug: "tokenised-solutions",
    description: "Design and implement innovative token-based business models that create new revenue streams, enhance customer engagement, and unlock new possibilities for your business.",
    icon: "coins",
    features: [
      { feature: "Token Economics Design" },
      { feature: "Smart Contract Development" },
      { feature: "Governance Model Creation" },
      { feature: "Compliance Strategy" },
      { feature: "Launch & Distribution" },
      { feature: "Community Building" }
    ],
    benefits: [
      { benefit: "Create new revenue streams" },
      { benefit: "Enhance customer loyalty" },
      { benefit: "Build community engagement" },
      { benefit: "Future-proof business model" }
    ],
    deliverables: [
      { deliverable: "Token economic model" },
      { deliverable: "Smart contract suite" },
      { deliverable: "Governance framework" },
      { deliverable: "Launch strategy" }
    ],
    duration: "16-40 weeks",
    pricing: "Starting at $75,000",
    featured: false,
    order: 5
  }
]

console.log('Services data ready for seeding:')
console.log(JSON.stringify(servicesData, null, 2))
console.log(`\nTotal services: ${servicesData.length}`)
console.log(`Featured services: ${servicesData.filter(s => s.featured).length}`)