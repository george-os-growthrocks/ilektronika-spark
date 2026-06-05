import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vapeandmore.gr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;

