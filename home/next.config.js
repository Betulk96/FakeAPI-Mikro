/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/' yerine hiç basePath tanımlamayın (home için)
  images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
  // experimental: { appDir: true } satırını kaldırın
}

module.exports = nextConfig