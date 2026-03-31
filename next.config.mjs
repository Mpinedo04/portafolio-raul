/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sanity/visual-editing', 'next-sanity'],
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
