const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config.module.rules.push({
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        });
        config.resolve.fallback = {
            path: require.resolve("path-browserify"),
        };
        return config;
    },
<<<<<<< HEAD
    distDir: "dist",
=======
>>>>>>> 6a8cc061816c49a2296f13f71d7b41211c18eeeb
    compiler: {
        styledComponents: true,
    },
    swcMinify: true,
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
