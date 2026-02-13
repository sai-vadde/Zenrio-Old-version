import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  compiler: {
    // Optional: only if you use styled-components or other compiler features
    styledComponents: true,
  },
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
