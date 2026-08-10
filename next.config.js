/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    strict: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'types'],
  },
  images: {
    domains: ['localhost', 'vercel.app'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
}

module.exports = nextConfig
