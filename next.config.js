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
  experimental: {
    turbopack: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
      // This is the important part
      rules: {
        "*.svg": {
          as: "*.js",
          "import/meta": {
            url: "file",
          },
        },
      },
    },
  },
}

module.exports = nextConfig
