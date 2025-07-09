import Script from 'next/script'
import { generateStructuredData } from '@/lib/seo'

interface StructuredDataProps {
  type: "Organization" | "Article" | "WebPage" | "BreadcrumbList"
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData(type, data)
  
  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}