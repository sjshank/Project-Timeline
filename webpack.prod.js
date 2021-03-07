const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
            // new TerserPlugin({
            //     parallel: true,
            //     cache: true,
            //     sourceMap: false,
            // }),
        ]
    },

    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            cache: true,
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});