// eslint-disable-next-line import/no-extraneous-dependencies
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

const options = {
    // eslint-disable-next-line global-require
    webpackOptions: require("../webpack.config"),
    watchOptions: {},
};

module.exports = webpackPreprocessor(options);
