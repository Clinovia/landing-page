/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  // remove swcMinify if present; it's deprecated in Next.js 15
};

module.exports = nextConfig;
