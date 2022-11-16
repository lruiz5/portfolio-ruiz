/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
  },
};

module.exports = nextConfig;
