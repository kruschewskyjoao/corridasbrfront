import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sub4.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
