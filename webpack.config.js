const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
var plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        inject: 'body',
    })
];

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    );
}

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                query: { compact: false }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {       contentBase: path.join(__dirname, "/"),       compress: true,       port: 9000     },
    plugins:plugins
};