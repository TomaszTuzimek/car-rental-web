// Import environment variables from `.env` file if needed
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development and highlight potential issues
  reactStrictMode: true,

  // SWC-based minification (faster than Terser)
  swcMinify: true,

  // Custom environment variables accessible via `process.env`
  env: {
    CUSTOM_API_ENDPOINT: process.env.CUSTOM_API_ENDPOINT,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, // Public env variables should be prefixed with NEXT_PUBLIC_
  },

  // Configure image optimization
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'], // Whitelist external image domains
    formats: ['image/webp'], // Enable WebP support
  },

  // Custom URL rewrites (useful for SEO or routing)
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/company/about',
      },
    ];
  },

  // Custom headers (security-related headers, CORS, etc.)
  async headers() {
    return [
      {
        source: '/(.*)', // Apply headers to all routes
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },

  // Explicitly configure Webpack to ensure Turbopack is not used
  webpack(config) {
    // Any custom Webpack configurations can go here
    return config;
  },
};

module.exports = nextConfig;