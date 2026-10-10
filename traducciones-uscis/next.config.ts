import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The Spanish and English sites are separate root layouts (their <html lang>
  // differs), so URLs that match no route need one 404 page that stands alone.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
