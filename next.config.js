/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'newtec.divtec.ch',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
