const os = require('os');
const webpackVueDevConfig = require('./webpack.vue.dev.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge')

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      include: __dirname + '/vue_src',
      exclude: /node_modules/,
      cache: true,
      parallel: os.cpus().length,
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}
const plugins = [
  // 压缩 html
  new HtmlWebpackPlugin({
    template: __dirname + '/vue_src/index.html',
    title: 'title',
    hash: true,
  })
]

const webpackVueProdConfig = {
  mode: 'production',
  plugins,
  optimization
}

module.exports = merge(webpackVueDevConfig, webpackVueProdConfig)
