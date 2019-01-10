const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devMode = process.env.NODE_ENV !== 'production'

// config
const entryIndex = __dirname + '/react_src/index.js'
const contentBase = __dirname + '/react_src'  // 项目源代码目录
const htmlTemplete = __dirname + '/react_src/index.html'
const manifestReact = __dirname + '/src/assets/dll' + '/react-manifest.json'  // dll 打包文件名

const output = {
  path:  __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
}

const resolve = {
  extensions: ['.js', '.jsx', '.vue', '.less'],
  modules: ['node_modules'],
  alias: {
    '@': contentBase
  }
}

const webpackModule = {
  noParse: /jquery|lodash/,
  rules: [
    {
      test: /\.js[x]?$/,
      include: [path.resolve(__dirname, 'react_src')],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        'cache-loader',
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name].[hash:6].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(woff|eot|ttf|svg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name].[hash:6].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }
  ]
}

const plugins = [
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./src/assets/dll/react-manifest.json'),
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new ProgressBarPlugin(),  // 打包进度
  new webpack.HotModuleReplacementPlugin(),  // 热加载
]

const devServer = {
  open: false,
  hot: true,
  host: 'localhost',
  port: 9020,
}

module.exports = {
  mode: 'development',
  entry: entryIndex,
  output,
  resolve,
  module: webpackModule,
  plugins,
  devServer
}
