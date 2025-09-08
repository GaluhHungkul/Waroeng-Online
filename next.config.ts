import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co', 'via.placeholder.com', "ui-avatars.com"],
  },
  experimental : {
    viewTransition : true
  }
};

export default nextConfig;
