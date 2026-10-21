import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/machine-sales',
        destination: '/equipment-sales',
        permanent: true,
      },
      {
        source: '/machine-sales/:path*',
        destination: '/equipment-sales/:path*',
        permanent: true,
      },
      {
        source: '/machine-rental',
        destination: '/equipment-rental',
        permanent: true,
      },
      {
        source: '/machine-rental/:path*',
        destination: '/equipment-rental/:path*',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
