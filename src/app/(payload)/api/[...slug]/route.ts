/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { NextRequest } from 'next/server'

import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = (request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_GET(config)

export const POST = (request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_POST(config)

export const DELETE = (request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_DELETE(config)

export const PATCH = (request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) =>
  REST_PATCH(config)