const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "sheba-backend-gewl6hhr2-nayem9b.vercel.app",
      "upload.wikimedia.org",
      "media.wired.co.uk",
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
