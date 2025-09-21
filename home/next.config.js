/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
  experimental: { appDir: true },
  rewrites: async () => [
    { source: '/cart/:path*', destination: 'http://localhost:3001/cart/:path*' }
  ]
}
module.exports = nextConfig
