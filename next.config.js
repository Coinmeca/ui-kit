const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		return config;
	},
	compiler: {
		styledComponents: true
	},
	swcMinify: true,
	experimental: {
		appDir: true
	}
};

module.exports = nextConfig;
