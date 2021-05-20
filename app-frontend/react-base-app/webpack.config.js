// external plugins
const chalk = require('chalk');

// internal configuration
const commonConfig = require('./config/webpack/webpack.base');
const devConfig = require('./config/webpack/webpack.dev');
const prodConfig = require('./config/webpack/webpack.prod');
const statsConfig = require('./config/webpack/webpack.stats');

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