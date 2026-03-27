/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/yangmar-demo',
  assetPrefix: '/yangmar-demo/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['three'],
  env: {
    NEXT_PUBLIC_BASE_PATH: '/yangmar-demo',
  },
}

module.exports = nextConfig
