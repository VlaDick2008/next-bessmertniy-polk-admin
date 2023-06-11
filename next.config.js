/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/approve_story',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
