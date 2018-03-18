const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const tsImportPluginFactory = require('ts-import-plugin');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const isDev = process.env.NDOE_ENV === 'development'
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
module.exports = {
    target: 'node',
    devtool: 'cheap-module-source-map',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server-entry.js',
        publicPath: '',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
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
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
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
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ]
}