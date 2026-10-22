import { type MetadataRoute } from 'next'

import { env } from '@/server/config/env'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/', disallow: '/api/health' },
  sitemap: `${env.SITE_URL}/sitemap.xml`,
})

export default robots
