const preprocess = require("./preprocess");

module.exports = (on, config) => {
    on("file:preprocessor", preprocess);
};
