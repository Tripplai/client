/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@chakra-ui/react', '@chakra-ui/next-js'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
}

module.exports = nextConfig 