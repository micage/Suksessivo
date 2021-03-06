const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    context: path.join(__dirname, 'src'),
    devServer: {
        contentBase: 'www', // Relative directory for base of server
        host: 'localhost', // Change to '0.0.0.0' for external facing server
        hot: true, // Live-reload
        hotOnly: true,
        inline: true,
        port: 2010, // Port Number
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'www'), // Path of output file
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js']
    },

    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            title: 'Suksessivo'
        }),

        // Allows error warnings but does not stop compiling.
        // new webpack.NoEmitOnErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new webpack.DefinePlugin({
            __DEBUG__: true,
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),

        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader')
            // },
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
                    {
                        loader: "less-loader",
                        options: { relativeUrls: false }
                    },
                ],
                //exclude: "/\.(png|jpg|svg)?$/"
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                },
                exclude: /(node_modules|plugins|platforms|hooks|node_server)/
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
            // {
            //     test: /\.jpg/,
            //     loader: "file-loader!url-loader?limit=10000&minetype=image/jpg"
            // },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                // loader: "file-loader"
            }
        ]
    }
};
