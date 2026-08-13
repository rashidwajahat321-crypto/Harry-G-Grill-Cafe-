/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.deliveryhero.io" }
    ]
  }
};

module.exports = nextConfig;
