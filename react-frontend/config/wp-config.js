const path = require('path');

// contains configuration required for webpack to run
module.exports = {
    title: 'React Frontend',
    paths: {
        // various sources and build paths
        src: path.join(__dirname, '../src'), // source path
        build: path.join(__dirname, '../build'), // dist or build output path
        assets: path.join(__dirname, '../assets') // assets path
    },
};
