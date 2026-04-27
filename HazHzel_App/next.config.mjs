/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "cdn.shopify.com"],
  },
  output: "standalone",
};

export default nextConfig;
