/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
  },
};

module.exports = nextConfig;
