/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:3000', // Backend URL
    },
  };
  
  export default nextConfig; // ES Module syntax
  