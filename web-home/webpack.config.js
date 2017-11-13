const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
let path = require("path")
let rootPath = path.resolve(__dirname, './');
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.resolve(__dirname, './src/sources/svg'),  // 私人的 svg 存放目录
];
module.exports = {

    entry: rootPath + '/src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    devServer: {
        port: 8888,
        contentBase: "./dist",
        historyApiFallback: true,
        publicPath: "/",
        hot: true
    },
    
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /.(png|gif|jpe?g)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'autoprefixer-loader']
            },
            {
                test: /\.css$/,
                loader: 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader'],
            },
            {
                test: /\.svg$/i,
                loader: 'svg-sprite-loader?' + JSON.stringify({
                    name: '[name]',
                    prefixize: true,
                }),
                include: svgDirs
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: "file-loader",
                query: {
                    name: 'font/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '爱集',
            template: './src/sources/index.template.html',
            inject: 'body', //js插入的位置，true/'head'/'body'/false
        }),
        new webpack.DefinePlugin({
            APP_NAME: '`爱集`'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: ['.web.js', '.js']
    }
}