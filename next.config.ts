import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Configure allowed quality values for optimization
    qualities: [75, 85, 90, 95],
  },
};

export default nextConfig;
