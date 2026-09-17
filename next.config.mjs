/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  // Força o bundling do pacote SWC no servidor
  serverExternalPackages: [],
  transpilePackages: ['@swc/helpers'],
}

export default nextConfig
