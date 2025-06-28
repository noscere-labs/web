import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

interface Args {
  readonly params: {
    segments: string[]
  }
  readonly searchParams: { [key: string]: string | string[] }
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  return generatePageMetadata({ config, params: Promise.resolve(params), searchParams: Promise.resolve(searchParams) })
}

export default async function Page({ params, searchParams }: Args) {
  return RootPage({ config, importMap, params: Promise.resolve(params), searchParams: Promise.resolve(searchParams) })
}