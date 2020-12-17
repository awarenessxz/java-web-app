const { merge } = require("webpack-merge");
const app = require('./wp-config');
const util = require('./wp-config-util');

const buildProductionConfig = baseConfig => {
    return merge([
        util.clean(app.paths.build),
        baseConfig,
        {
            mode: "production",
            output: {
                path: app.paths.build,
                //chunkFilename: '[name].[chunkhash].js',
                //filename: '[name][chunkhash].js'
            },
        },
        util.minifyCSS(),
        util.generateSourceMap({ type: 'source-map' }),
        util.loadCSS(true)
    ]);
};

module.exports = buildProductionConfig;
