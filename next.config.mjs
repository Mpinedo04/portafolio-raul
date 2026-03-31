/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sanity/visual-editing', 'next-sanity'],
  experimental: {
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
