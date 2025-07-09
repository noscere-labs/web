import { Metadata } from "next"

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  author?: string
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = "Noscere",
    image = "/og-image.jpg",
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    section,
    tags = []
  } = seoData

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: author }],
    creator: "Noscere",
    publisher: "Noscere",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      siteName: "Noscere - Blockchain Consultancy",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@noscere",
      site: "@noscere",
    },
    alternates: {
      canonical: url,
    },
  }

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      section,
      authors: [author],
      tags,
    }
  }

  return metadata
}

export function generateStructuredData(type: "Organization" | "Article" | "WebPage" | "BreadcrumbList", data: any) {
  const baseUrl = "https://noscere.com"
  
  switch (type) {
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Noscere",
        description: "Enterprise blockchain consultancy specializing in Bitcoin education, development training, and strategic implementation.",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-123-4567",
          contactType: "customer service",
          email: "hello@noscere.com"
        },
        sameAs: [
          "https://twitter.com/noscere",
          "https://linkedin.com/company/noscere",
          "https://github.com/noscere-labs"
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US"
        },
        founder: {
          "@type": "Person",
          name: "Alex Chen"
        },
        foundingDate: "2019",
        industry: "Blockchain Technology Consulting",
        services: [
          "Bitcoin Education",
          "Developer Training", 
          "Strategic Consultancy",
          "Enterprise Development",
          "Tokenised Solutions"
        ]
      }

    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author,
          jobTitle: data.authorTitle || "Blockchain Expert",
          worksFor: {
            "@type": "Organization",
            name: "Noscere"
          }
        },
        publisher: {
          "@type": "Organization",
          name: "Noscere",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`
          }
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url
        },
        keywords: data.keywords,
        articleSection: data.section,
        about: data.topics || ["Blockchain", "Bitcoin", "Enterprise Technology"]
      }

    case "WebPage":
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: data.title,
        description: data.description,
        url: data.url,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          name: "Noscere",
          url: baseUrl
        },
        about: {
          "@type": "Organization",
          name: "Noscere"
        },
        breadcrumb: data.breadcrumb
      }

    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.path}`
        }))
      }

    default:
      return null
  }
}

export function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ name: "Home", path: "/" }]
  
  let currentPath = ""
  paths.forEach((path, index) => {
    currentPath += `/${path}`
    const name = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name,
      path: currentPath
    })
  })
  
  return breadcrumbs
}