import type { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = bundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/favicon.ico',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'outlook.live.com',
        port: '',
        pathname: '/favicon.ico',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        port: '',
        pathname: '/favicon.ico',
        search: '',
      },
    ],
  },
});

export default nextConfig;
