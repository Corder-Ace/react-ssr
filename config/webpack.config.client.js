const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const tsImportPluginFactory = require('ts-import-plugin');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const isDev = process.env.NODE_ENV === 'development'
const paths = require('./paths');
const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
// Note: defined here because it will be used more than once.
const cssFilename = 'dist/css/[name].[contenthash:8].css';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const extractTextPluginOptions = shouldUseRelativeAssetPaths ?
    { // Making sure that the publicPath goes back to to build folder.
        publicPath: Array(cssFilename.split('/').length).join('../')
    } :
    {};

const config = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: path.join(__dirname, '../client/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        publicPath: ''
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     loader: ['babel-loader'],
            //     exclude: [
            //         path.join(__dirname, '../node_modules')
            //     ]
            // },
            {
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'ts-loader', 
                    options: {
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'es',
                                style: 'css',
                            })]
                        })
                    }
                }],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(Object.assign({
                    fallback: {
                        loader: require.resolve('style-loader'),
                        options: {
                            hmr: false
                        }
                    },
                    use: [{
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: shouldUseSourceMap
                        }
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }]
                }, extractTextPluginOptions)),
            },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         //resolve-url-loader may be chained before sass-loader if necessary
            //         use: ['css-loader', 'less-loader']
            //     })
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/template.html'),
        }),
        new ExtractTextPlugin("[name].css"),
    ]
}
console.log(isDev)
if (!isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: 8888,
        inline: true,
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true,//热更新
        overlay: {
            errors: true,//错误信息提示
        },
        // publicPath:'',
        // historyApiFallback:{
        //     index:''
        // }
    }

    // config.plugins.push(new webpack.HotModuleReplacementPlugin())
    // config.entry = {
    //     app: [
    //         'react-hot-loader/patch',
    //         path.join(__dirname, '../client/index.js')
    //     ]
    // }
}
module.exports = config