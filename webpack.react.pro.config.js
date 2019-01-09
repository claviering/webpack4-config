const webpackReactDevConfig = require('./webpack.react.dev.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge')

const optimization = {
  minimizer: [new UglifyJsPlugin({
    include: __dirname + '/src',
    exclude: /node_modules/,
  })]
}
const plugins = [
  new HtmlWebpackPlugin({  // 压缩 html
    template: __dirname + './index.html',
    title: 'title',
    devMode: true
  })
]

const webpackVueProdConfig = {
  mode: 'production',
  plugins,
  optimization
}

module.exports = merge(webpackReactDevConfig, webpackVueProdConfig)
