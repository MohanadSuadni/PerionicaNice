/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // važno za next-intl i JSON import
  experimental: {
    typedRoutes: false
  },

  // da JSON import radi stabilno
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json"
    });

    return config;
  }
};

export default nextConfig;