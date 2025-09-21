/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
  experimental: { appDir: true },
  basePath: '/cart'
}
module.exports = nextConfig
