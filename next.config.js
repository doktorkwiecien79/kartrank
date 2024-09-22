/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig

module.exports = {
  async redirects() {
    return [
      {
        source: '/omnie',
        destination: '/ranking',
        permanent: true,
      },
    ]
  },
}
