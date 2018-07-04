const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isDev = process.env.NODE_ENV === 'development';
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
module.exports = (env, argv) => {
	let config = {
		devtool: 'cheap-module-source-map',
		entry: {
			app: path.join(__dirname, '../client/index.tsx'),
			vendor: [ 'react', 'react-router-dom', 'mobx', 'axios', 'js-cookie' ]
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: 'static/js/[name].[hash].js',
			chunkFilename: 'static/js/[name].[chunkhash].js',
			publicPath: '/'
		},
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.json', '.scss' ],
			alias: {
				components: path.resolve(__dirname, '../client/src/components/')
			}
		},
		optimization: {
			runtimeChunk: {
				name: 'manifest'
			},
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all'
					}
				}
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: [ 'babel-loader' ],
					exclude: [ path.join(__dirname, '../node_modules') ]
				},
				{
					test: /\.(ts|tsx)$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								getCustomTransformers: () => ({
									before: [
										tsImportPluginFactory({
											libraryName: 'antd',
											libraryDirectory: 'es',
											style: 'css'
										})
									]
								})
							}
						}
					],
					exclude: [ path.join(__dirname, '../node_modules') ]
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract(
						Object.assign({
							fallback: {
								loader: require.resolve('style-loader'),
								options: {
									hmr: false
								}
							},
							use: [
								{
									loader: require.resolve('css-loader'),
									options: {
										importLoaders: 1,
										minimize: true,
										sourceMap: shouldUseSourceMap
									}
								},
								{
									loader: require.resolve('postcss-loader'),
									options: {
										// Necessary for external CSS imports to work
										// https://github.com/facebookincubator/create-react-app/issues/2677
										ident: 'postcss',
										plugins: () => [
											require('postcss-flexbugs-fixes'),
											autoprefixer({
												browsers: [
													'>1%',
													'last 4 versions',
													'Firefox ESR',
													'not ie < 9' // React doesn't support IE8 anyway
												],
												flexbox: 'no-2009'
											})
										]
									}
								}
							]
						})
					)
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: {
							loader: require.resolve('style-loader'),
							options: {
								hmr: false
							}
						},
						use: [
							{
								loader: 'typings-for-css-modules-loader',
								options: {
									modules: true,
									namedExport: true,
									camelCase: true,
									minimize: true,
									localIdentName: '[local]_[hash:base64:5]'
								}
							},

							{
								loader: 'sass-loader',
								options: {
									outputStyle: 'expanded',
									sourceMap: true
								}
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9' // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009'
										})
									]
								}
							}
						]
					})
				},
				{
					oneOf: [
						{
							loader: require.resolve('file-loader'),

							options: {
								name: 'static/media/[name].[hash:8].[ext]'
							},
							exclude: [ /\.js$/, /\.html$/, /\.json$/, /\.scss$/, /\.css/, /\.ts/, /\.tsx/ ]
						},
						{
							test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
							loader: require.resolve('url-loader'),
							options: {
								limit: 10000,
								name: 'static/media/[name].[hash:8].[ext]'
							}
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, '../public/index.html'),
				//对html进行压缩
				minify: {
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				}
			}),
			new ExtractTextPlugin({
				filename: (getPath) => {
					return getPath('static/css/[name].[chunkhash].css')
                },
                // filename:'',
				allChunks: true
			}),
			new ManifestPlugin({
				fileName: 'asset-manifest.json'
			})
		],
		performance: {
			hints: 'warning'
		}
	};

	if (argv.mode === 'development') {
		config.entry = {
			app: path.join(__dirname, '../client/index.tsx')
		};
		config.devServer = {
			host: '0.0.0.0',
			port: 8888,
			inline: true,
			contentBase: path.resolve(__dirname, '../dist'),
			hot: true, //热更新
			overlay: {
				errors: true //错误信息提示
			},
			stats: 'errors-only',
			compress: true,
			historyApiFallback: {
				index: ''
			},
			proxy: {
				'/users/*': {
					target: 'http://localhost:3000'
				}
			}
		};

		config.plugins.push(new webpack.HotModuleReplacementPlugin());
	} else {
		config.plugins.push(
			new CleanWebpackPlugin([ 'dist/*' ], {
				root: path.join(__dirname, '..')
			}),
			new CopyWebpackPlugin([ { from: 'public', to: '' } ])
		);
	}
	return config;
};
