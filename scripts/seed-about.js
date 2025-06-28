// Data seeding script for About page content

const valuesData = [
  {
    title: "Security First",
    description: "We prioritize enterprise-grade security in every solution, ensuring your blockchain implementations are robust and protected.",
    icon: "shield"
  },
  {
    title: "Innovation",
    description: "We stay at the forefront of blockchain technology, bringing cutting-edge solutions to solve real business challenges.",
    icon: "lightbulb"
  },
  {
    title: "Partnership",
    description: "We work as an extension of your team, providing ongoing support and guidance throughout your blockchain journey.",
    icon: "users"
  },
  {
    title: "Results-Driven",
    description: "Every project is measured against concrete business outcomes, ensuring tangible value from blockchain adoption.",
    icon: "target"
  }
]

const teamData = [
  {
    name: "Craig Porter",
    role: "Founder & CEO",
    bio: "Blockchain solutions architect 6 years in distributed systems design.",
    expertise: [
      { skill: "Bitcoin Protocol" },
      { skill: "Enterprise Architecture" },
      { skill: "Tokenisation" }
    ],
    initials: "CP",
    featured: true,
    order: 1
  }
]

const statsData = [
  { label: "Years in Blockchain", value: "8+" },
  { label: "Enterprise Clients", value: "50+" },
  { label: "Developers Trained", value: "500+" },
  { label: "Projects Delivered", value: "100+" },
  { label: "Countries Served", value: "15+" },
  { label: "Success Rate", value: "98%" }
]

const aboutPageData = {
  title: "About Noscere",
  slug: "about",
  status: "published",
  layout: [
    {
      blockType: "hero",
      title: "Noscere To know",
      subtitle: "Founded in 2019, Noscere has been at the forefront of enterprise blockchain adoption",
      description: "Founded in 2019, Noscere has been at the forefront of enterprise blockchain adoption, helping organizations navigate the public ledger with confidence and clarity."
    },
    {
      blockType: "values",
      title: "Our Values",
      subtitle: "The principles that guide everything we do",
      values: valuesData
    },
    {
      blockType: "stats",
      title: "Our Impact",
      stats: statsData
    },
    {
      blockType: "team",
      title: "Our Team",
      subtitle: "Meet the experts behind Noscere"
    }
  ],
  meta: {
    title: "About Noscere - Blockchain Consultancy Experts",
    description: "Learn about Noscere's mission to demystify blockchain technology for enterprises. Meet our team of experts and discover our approach to blockchain consultation.",
    keywords: "about noscere, blockchain consultancy, bitcoin experts, enterprise blockchain, team"
  }
}

const settingsData = {
  general: {
    siteName: "Noscere",
    siteDescription: "We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, turning emerging possibilities into competitive advantage.",
    siteUrl: "https://noscere.com"
  },
  company: {
    foundedYear: 2019,
    mission: "To help enterprises truly understand blockchain technology, not just implement it.",
    stats: statsData
  },
  contact: {
    email: "hello@noscere.com"
  },
  navigation: {
    header: [
      { label: "Home", url: "/", openInNewTab: false },
      { label: "About", url: "/about", openInNewTab: false },
      { label: "Services", url: "/services", openInNewTab: false },
      { label: "Lab", url: "/lab", openInNewTab: false },
      { label: "Blog", url: "/blog", openInNewTab: false },
      { label: "Contact", url: "/contact", openInNewTab: false }
    ],
    footer: [
      {
        section: "Services",
        links: [
          { label: "Bitcoin Education", url: "/services#bitcoin-education" },
          { label: "Developer Training", url: "/services#developer-training" },
          { label: "Strategic Consultancy", url: "/services#consultancy" },
          { label: "Enterprise Development", url: "/services#enterprise-development" },
          { label: "Tokenised Solutions", url: "/services#tokenised-solutions" }
        ]
      },
      {
        section: "Company",
        links: [
          { label: "About", url: "/about" },
          { label: "Blog", url: "/blog" },
          { label: "Contact", url: "/contact" }
        ]
      }
    ]
  },
  seo: {
    keywords: "blockchain consultancy, bitcoin education, enterprise blockchain, developer training, tokenisation"
  }
}

console.log('About page data ready for seeding:')
console.log('Values:', valuesData.length)
console.log('Team members:', teamData.length)
console.log('Stats:', statsData.length)
console.log('Settings configured')

export { valuesData, teamData, statsData, aboutPageData, settingsData }