// next.config.js
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Support for absolute imports
        config.resolve.modules.push(path.resolve("./src"));

        return config;
    },
    webpack5: true, // Ensure Webpack 5 is used
    swcMinify: true,
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
