/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/yangmar-demo',
  assetPrefix: '/yangmar-demo/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/yangmar-demo',
  },
}

module.exports = nextConfig
