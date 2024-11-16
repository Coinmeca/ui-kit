// next.config.js
const path = require("path");

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    typescript: {
        ignoreBuildErrors: false, // Set to true to ignore TypeScript errors in builds
    },
    compiler: {
        styledComponents: true,
    },
    experimental: {
        webpackBuildWorker: true,
    },
};

module.exports = nextConfig;
