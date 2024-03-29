const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // uses "uglify-js" to minify javascript files
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts CSS into separate file (creates a css file epr js file which contains css)
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // optimize and minimize css assets
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: {
            compileType: 'module',
            mode: 'local',
            auto: true,
            exportGlobals: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            localIdentContext: path.resolve(__dirname, 'src'),
            localIdentHashPrefix: 'my-custom-hash',
            namedExport: true,
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: false,
        },
        importLoaders: 2,
        sourceMap: false // turned off since this causes delays
    }
};

const CSSLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        sourceMap: false // turned off since this causes delays
    }
};

const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [autoprefixer()]
        },
        sourceMap: false, // turned off because of delay
    }
};

module.exports = {
    lint: ({include, exclude, options}) => ({
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.jsx$/,
                    loader: 'eslint-loader',
                    include,
                    exclude,
                    options
                }
            ]
        }
    }),
    loadJavascript: ({include, exclude}) => ({
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }
            ]
        }
    }),
    loadImages: ({include, exclude}) => ({
        module: {
            rules: [
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    include,
                    exclude,
                    type: 'asset/resource',
                }
            ]
        }
    }),
    loadCSS: (extractCSS = false) => {
        if (extractCSS) {
            return {
                plugins: [new MiniCssExtractPlugin()],
                module: {
                    rules: [
                        {
                            // shared global css files
                            test: /\.(sa|sc|c)ss$/,
                            exclude: /\.module\.(sa|sc|c)ss$/,
                            use: ['style-loader', MiniCssExtractPlugin.loader, CSSLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
                        },
                        {
                            // css modules
                            test: /\.module\.(sa|sc|c)ss$/,
                            use: ['style-loader', MiniCssExtractPlugin.loader, CSSModuleLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
                        }
                    ]
                }
            };
        } else {
            return {
                module: {
                    rules: [
                        {
                            // shared global css files
                            test: /\.(sa|sc|c)ss$/,
                            exclude: /\.module\.(sa|sc|c)ss$/,
                            use: ['style-loader', CSSLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
                        },
                        {
                            // css modules
                            test: /\.module\.(sa|sc|c)ss$/,
                            use: ['style-loader', CSSModuleLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
                        }
                    ]
                }
            };
        }
    },
    minifyJS: (noComment = true) => ({
        optimization: {
            minimizer: [
                new UglifyJSPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        warnings: false,
                        output: {
                            comments: !noComment
                        }
                    }
                })
            ]
        }
    }),
    minifyCSS: () => ({
        plugins: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true,
                    },
                    safe: true // run cssnano in safe mode to avoid potential unsafe transformation
                },
                canPrint: false
            })
        ]
    }),
    clean: path => {
        console.info("cleaning ", path);
        return {
            plugins: [new CleanWebpackPlugin()] // it will remove files specified in webpack's output path
        }
    },
    // code-splitting
    extractBundle: () => ({
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            },
            splitChunks: {
                // assigns all modules from node_modules into cache_group and extract out common chunks into vendor.js
                cacheGroups: {
                    vendors: {
                        test: '/[\\/]node_modules[\\/]/',
                        name: 'node_vendor',
                        chunks: 'all'
                    },
                    common: {
                        test: '/[\\/]src[\\/]components[\\/]/',
                        chunks: 'all',
                        minSize: 0
                    }
                }
            }
        }
    }),
    generateSourceMap: ({type}) => ({
        devtool: type
    })
};