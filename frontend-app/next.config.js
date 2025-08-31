/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable tracing to avoid permission issues on Windows
  experimental: {
    instrumentationHook: false
  },
  // Improve build performance
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
}

module.exports = nextConfig