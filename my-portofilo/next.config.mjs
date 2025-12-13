/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ MÉTHODE MODERNE : remotePatterns (recommandé depuis Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.exemple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'autre-domaine.com',
        pathname: '/**',
      },
    ],

  },
};

export default nextConfig;