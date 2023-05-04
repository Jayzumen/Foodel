/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["files.stripe.com"],
  },
};

module.exports = nextConfig;
