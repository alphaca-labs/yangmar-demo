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
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = nextConfig
