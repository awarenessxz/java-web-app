const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { merge } = require("webpack-merge");
const util = require('./wp-config-util');

const buildDevelopmentConfig = baseConfig => {
    return merge([
        baseConfig,
        {
            mode: "development",
            resolve: {
                symlinks: false // for yarn link to work
            },
            output: {
                devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
            },
            devServer: {
                historyApiFallback: true,
                stats: 'errors-only',
                hot: true, // turn on hot module replacement (HMR)
                hotOnly: false,
                open: true,
                port: 8080,
                proxy: {
                    '/announcements/*': {     // route all rest api call to api-gateway
                        target: 'http://localhost:7001', // path of the targeted external server that house the external api
                        secure: false,
                        prependPath: false,
                    },
                    '/rest/*': {     // route all rest api call to api-gateway
                        target: 'http://localhost:9090', // path of the targeted external server that house the external api
                        // pathRewrite: {'^/rest' : ''},
                        secure: false,
                        prependPath: false,
                    }
                },
                publicPath: '/',
                overlay: {
                    errors: true,
                    warnings: true
                }
            },
            plugins: [
                new ReactRefreshWebpackPlugin(),
                new ForkTsCheckerWebpackPlugin()
            ]
        },
        util.generateSourceMap({ type: 'cheap-module-source-map' }),
        util.loadCSS(false)
    ]);
};

module.exports = buildDevelopmentConfig;
