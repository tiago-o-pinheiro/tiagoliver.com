import { type NextConfig } from 'next'

const CV_FONT_FILES = [
  './node_modules/@fontsource/geist-sans/files/geist-sans-latin-*-normal.woff',
  './node_modules/@fontsource/geist-mono/files/geist-mono-latin-*-normal.woff',
]

const nextConfig: NextConfig = {
  transpilePackages: [],
  serverExternalPackages: ['@react-pdf/renderer'],
  outputFileTracingIncludes: {
    '/api/cv/[locale]': CV_FONT_FILES,
  },
  experimental: {
    globalNotFound: true,
  },
  redirects: async () => [
    {
      source: '/',
      has: [{ type: 'header', key: 'accept-language', value: '^(es|ca)\\b.*' }],
      destination: '/es',
      permanent: false,
    },
    { source: '/', destination: '/en', permanent: false },
  ],
  rewrites: async () => ({
    beforeFiles: [{ source: '/:locale(en|es)/cv.pdf', destination: '/api/cv/:locale' }],
    afterFiles: [],
    fallback: [],
  }),
}

export default nextConfig
