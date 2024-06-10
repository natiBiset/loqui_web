/** @type {import('next').NextConfig} */
const nextConfig = {
async headers() {
    return [
      {
	source: "/api/(.*)",
        headers: [
	{ key: "Access-Control-Allow-Credentials",
	  value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
	  
        ],
      },
    ];
  },
};

export default nextConfig;
