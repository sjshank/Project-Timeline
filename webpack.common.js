
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                },
                // Uncomment to see JS lint warnings and error
                // {
                //     loader: 'eslint-loader'
                // }
            ]
        },
        {
            test: /\.css$/i,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        url: true,
                        import: true,
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: {
                            localIdentName: "[name]_[local]___[hash:base64:5]",
                        }
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            strictMath: true,
                            sourceMap: true,
                        },
                    },
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            use: [
                'url-loader',
            ],
            //loader: 'url-loader',
        },
            {
                test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf|xlsx|csv|xls)$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.xls.?$/,
                loader: 'excel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ inject: true, template: path.resolve(__dirname, 'src', 'main.html') })
    ]
};