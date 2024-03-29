const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts CSS into separate file (creates a css file epr js file which contains css)
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // optimize and minimize css assets
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: {
            auto: true,
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
    loadTinyMCE: () => ({
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './node_modules/tinymce/plugins', to: './plugins' },
                    { from: './node_modules/tinymce/themes', to: './themes' },
                    { from: './node_modules/tinymce/skins', to: './skins' }
                ]
            })
        ]
    }),
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
                    include,
                    exclude,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }
            ]
        }
    }),
    loadImages: () => ({
        module: {
            rules: [
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
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
                            use: [MiniCssExtractPlugin.loader, CSSLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
                        },
                        {
                            // css modules
                            test: /\.module\.(sa|sc|c)ss$/,
                            use: [MiniCssExtractPlugin.loader, CSSModuleLoader, PostCSSLoader, 'sass-loader'] // loader sequence is right to left
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
    minifyCSS: () => ({
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin({
                    parallel: true,
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        }
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
                    defaultVendors: {
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
