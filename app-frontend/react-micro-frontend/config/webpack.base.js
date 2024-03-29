const HtmlWebpackPlugin = require('html-webpack-plugin'); // generates an HTML file, injects the script inside the HTML file and writes this file to dist/index.html
const { merge } = require("webpack-merge");
const app = require('./wp-config-app');
const util = require('./wp-config-util');

// common webpack configuration (used by both development and production config)
module.exports = merge([
    {
        entry: {
            app: ['react-hot-loader/patch', app.paths.src]
        },
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
                path: 'path-browserify' // https://medium.com/@sanchit3b/how-to-polyfill-node-core-modules-in-webpack-5-905c1f5504a0
            },
            extensions: ['.tsx', '.ts', ".js"]
        },
        output: {
            path: app.paths.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: app.title,
                favicon: `${app.paths.assets}/favicon.ico`,
                template: `${app.paths.src}/index.html`,
                hash: true,
            })
        ],
    },
    util.loadJavascript({
        include: [app.paths.src],
        exclude: /node_modules/,
    }),
    util.loadImages({
        include: [app.paths.assets]
    }),
    util.lint({
        options: {
            emitWarning: true,
            failOnError: true,
        }
    }),
    util.extractBundle()
]);