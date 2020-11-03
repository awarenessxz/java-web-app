const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // for analyzing bundle size
const { merge } = require("webpack-merge");

const buildStatsConfig = baseConfig => {
    return merge([
        baseConfig,
        {
            mode: "development",
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled',
                    generateStatsFile: true,
                    statsOptions: {
                        source: false
                    }
                })
            ],
        },
        util.generateSourceMap({ type : "eval-source-map" })
    ]);
};

module.exports = buildStatsConfig;