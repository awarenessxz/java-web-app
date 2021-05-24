// external plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); // generates an HTML file, injects the script inside the HTML file and writes this file to dist/index.html
const { merge } = require("webpack-merge");
const chalk = require('chalk');
const devConfig = require('./config/webpack/webpack.dev');
const prodConfig = require('./config/webpack/webpack.prod');
const statsConfig = require('./config/webpack/webpack.stats');
const app = require('./config/webpack/wp-config-values');
const util = require('./config/webpack/wp-config-util');

// internal configuration
const commonConfig = merge([
    {
        entry: app.paths.src,
        resolve: {
            alias: {
                path: 'path-browserify' // https://medium.com/@sanchit3b/how-to-polyfill-node-core-modules-in-webpack-5-905c1f5504a0
            },
            extensions: ['.tsx', '.ts', ".json", ".js", '.scss', '.css']
        },
        output: {
            path: app.paths.build,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: app.title,
                favicon: `${app.paths.src}/assets/images/favicon.ico`,
                template: `${app.paths.src}/index.html`,
                hash: true,
            })
        ],
    },
    util.loadTinyMCE(),
    util.loadJavascript({
        include: [app.paths.src],
        exclude: /node_modules/,
    }),
    util.loadImages(),
    util.lint({
        options: {
            emitWarning: true,
            failOnError: true,
        }
    }),
    util.extractBundle()
]);

// final export
module.exports = ({ env }) => {
    process.env.BABEL_ENV = env;
    console.info("Running Environment:", chalk.bold.red(env));
    const scriptType = process.env.npm_lifecycle_event;
    switch (scriptType) {
        case 'build':
            return prodConfig(commonConfig);
        case "start":
            return devConfig(commonConfig);
        case "stats":
            return statsConfig(commonConfig);
        default:
            throw new Error("Invalid npm script!");
    }
};