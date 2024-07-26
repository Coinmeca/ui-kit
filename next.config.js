// next.config.js
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Support for absolute imports
        config.resolve.modules.push(path.resolve("./src"));

        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
            };
        }
        
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
