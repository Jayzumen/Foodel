/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["pg"],
  },
  images: {
    domains: ["files.stripe.com"],
  },
};

module.exports = nextConfig;
