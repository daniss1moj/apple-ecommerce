/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['rb.gy', 'cdn.sanity.io', 'lh3.googleusercontent.com'],
	},
};

module.exports = nextConfig;
