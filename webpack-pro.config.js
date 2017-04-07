const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    entry: './src/app.js',
    // Render source-map file for final build
    // devtool: 'source-map',
    // output config
    output: {
        path: path.resolve(__dirname, 'www'), // Path of output file
        filename: 'bundle.js', // Name of output file
    },
    plugins: [
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new TransferWebpackPlugin([
            {from: 'www',to: '/'},
        ]),

        new webpack.DefinePlugin({
            __DEBUG__: false,
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]' } // BEM-Style
                    },
                    { loader: "less-loader", options: { relativeUrls: false } },
                ],
                exclude: "/\.(png|jpg|svg)?$/"
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                // includes: [path.join(__dirname, '')],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },
                exclude:  /(node_modules|plugins|platforms|hooks|node_server)/
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg)?$/,
                loader: "file-loader"
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
        ],
    },
};

module.exports = config;
