let path = require("path");
let webpack = require("webpack");
let rootPath = path.resolve(__dirname, '..');
let src = path.join(rootPath, 'src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Uglify = require("uglifyjs-webpack-plugin");
// 引入css 单独打包插件
let ExtractTextPlugin = require("extract-text-webpack-plugin");
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.resolve(__dirname, './src/sources/svg'),  // 私人的 svg 存放目录
];
module.exports = {
    entry:{
        bundle:path.resolve(__dirname, 'src'),
        vendor: ['react','react-keeper']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[Hash].js",
        publicPath: "/",
        chunkFilename: "js/[name].[chunkhash:8].bundle.js"
    },
    devServer: {
        port: 3333,
        contentBase: "./dist",
        historyApiFallback: true,
        publicPath: "/",
        hot: true
    },
    module: {

        rules: [
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: {
                            importLoaders: 1, minimize: true //css压缩
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('postcss-import')(),        //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                                    require("autoprefixer")({ browsers: ['last 5 versions'] })
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true // 将less装换的css压缩
                            }
                        }, 'less-loader', 'autoprefixer-loader'
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
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
        //在文件开头插入banner
        new webpack.BannerPlugin("The file is creted by zunyi-jike.--" + new Date()),
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            compress: {
                join_vars: true,
                warnings: false,
            },
            toplevel: false,
            ie8: false,
        }),
        // //代码压缩
        // 保持文件在某个限制
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 5000 // Minimum number of characters
        }),
        //清除build文件
        new CleanWebpackPlugin(path.resolve(__dirname, "dist")),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        //设置html文件模板
        new HtmlWebpackPlugin({
            title:'爱集',
            template: './src/sources/index.template.html',
            // favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            // filename: './index.html', //生成的html存放路径，相对于path
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            // chunks: ['common', 'index'],
            //hash: true ,//为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        // //模块加载
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "[name].bundel.js",
            minChunks: 4
        }),
        new ExtractTextPlugin('./style/[name].[hash].min.css'),
    ],
    resolve: {
        extensions: [
            '.web.js',
            '.js',
            '.json'
        ]
    }
}