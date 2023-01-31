/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['rb.gy', 'cdn.sanity.io'],
	},
};

module.exports = nextConfig;
