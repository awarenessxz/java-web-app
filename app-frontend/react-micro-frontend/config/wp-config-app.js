const path = require('path');

// contains configuration required for webpack to run
module.exports = {
    title: 'React Micro Frontend 1',
    paths: {
        // various sources and build paths
        src: path.join(__dirname, '../src'), // source path
        build: path.join(__dirname, '../build'), // dist or build output path
        assets: path.join(__dirname, '../assets') // assets path
    },
    devServer: {
        // rapid development related / setting for webpack dev server (link between webpack and embedded tomcat in springboot)
        port: 8081,
        contextPath: '/microfrontend',
        proxy: {
            url: '/rest/*', // path to redirect request to all external api e.g. restful api call
            target: 'http://localhost:9090/', // path of the targeted external server that house the external api
            secure: false,
            prependPath: false,
        },
        publicPath: 'http://0.0.0.0:8081/microfrontend'
    }
};