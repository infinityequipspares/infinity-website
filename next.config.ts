import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Aapke purane redirects
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
      },
      
      // Naye SEO Redirects (404 errors fix karne ke liye)
      {
        source: '/&',
        destination: '/',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-page/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pricing-plans/:path*',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
