const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

require('dotenv').config();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        pathinfo: isDevelopment,
        filename: isDevelopment ? 'static/js/bundle.js' : 'static/js/[name].[contenthash:8].js',
        chunkFilename: isDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        usedExports: true,
        sideEffects: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    watchOptions: {
        poll: 1000,
    },
    devtool: isProduction ? 'none' : 'source-map',
    devServer: {
        stats: 'minimal',
        overlay: {
            warnings: true,
            errors: true,
        },
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        port,
        headers: { 'Access-Control-Allow-Origin': '*' },
        https: false,
        proxy: {
            '/login': 'http://localhost:8888',
            '/api/**': 'http://localhost:8888',
        },
    },

    plugins: [
        isProduction &&
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                generateStatsFile: true,
                analyzerMode: 'static',
            }),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
                output: {
                    comments: false,
                },
            },
            extractComments: false,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
        }),
    ].filter(Boolean),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.json'],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
                        exclude: ['/node_modules/'],
                        use: ['ts-loader'],
                    },
                    {
                        test: /(\.css)$/,
                        include: /\.module\.css$/,
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[name]__[local]--[hash:base64:5]',
                                    },
                                },
                            },
                        ],
                    },

                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                            },
                        ],
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: ['babel-loader', 'eslint-loader'],
                    },

                    {
                        enforce: 'pre',
                        test: /\.js$/,
                        loader: 'source-map-loader',
                    },
                    {
                        loader: require.resolve('url-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx|svg|css)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                            limit: 8192, // inline files <= 8kb
                        },
                    },
                    {
                        // fire network request for files > 8kb
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx|svg|css)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
