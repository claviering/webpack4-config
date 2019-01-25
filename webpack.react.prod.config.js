const os = require('os');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackReactDevConfig = require('./webpack.react.dev.config');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const autoAddDllRes = () => {
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
  return new AddAssetHtmlPlugin([{ // 往html中注入dll js
      publicPath: './dll/', // 注入到html文件中 src 的路径
      outputPath: './dll/', // dll.js 文件输出的目录
      filepath: './src/assets/dll/*.js', // dll.js 来源目录
      includeSourcemap: false,
      typeOfAsset: 'js' // options js、css; default js
  }]);
};

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      include: __dirname + '/react_src',
      exclude: /node_modules/,
      cache: true,
      parallel: os.cpus().length,
      sourceMap: false,  // 关闭 sourceMap
      uglifyOptions: {
        compress: {
          warnings: true,
          drop_console: true // 删除 console
        },
        output: {
          comments: false  // 删除注释
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  }
}
const plugins = [
  new CleanWebpackPlugin(['*'], {
    root: __dirname + '/dist',
  }),
  // 压缩 html
  new HtmlWebpackPlugin({
    template: __dirname + '/react_src/index.html',
    title: 'title',
    hash: true,
  }),
  autoAddDllRes()
]

const webpackVueProdConfig = {
  mode: 'production',
  plugins,
  optimization
}

module.exports = merge(webpackReactDevConfig, webpackVueProdConfig)
