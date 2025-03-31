const URL = process.env.NEXT_PUBLIC_MARKETING_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["my-nest-bucket-test.s3.amazonaws.com"],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-nest-bucket-test.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "my-nest-bucket-test.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/marketing",
        destination: `${URL}/marketing`,
      },
      {
        source: "/marketing/:path*",
        destination: `${URL}/marketing/:path*`,
      },
    ];
  },
};

export default nextConfig;
