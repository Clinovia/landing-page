// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Recommended for all Next.js apps
  reactStrictMode: true,
  swcMinify: true,

  // Only allow images from trusted domains (update as needed)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'huggingface.co', // For Hugging Face Space thumbnails or assets
      },
      {
        protocol: 'https',
        hostname: 'cdn.huggingface.co', // If using HF CDN
      },
      // Add other trusted image hosts (e.g., your logo on S3, GitHub, etc.)
      // {
      //   protocol: 'https',
      //   hostname: 'your-bucket.s3.amazonaws.com',
      // },
    ],
  },

  // No redirects needed — you'll link to Hugging Face Spaces via <a> or Next.js <Link> with full URLs
};

module.exports = nextConfig;
