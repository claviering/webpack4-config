const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')

const webpackModule = {
  rules: [
    {
      test: /\.vue$/,
      use: ['cache-loader','vue-loader']
    }
  ]
}

const plugins = [
  new VueLoaderPlugin(),
]

const webpackVueDevConfig = {
  module: webpackModule,
  plugins
}

module.exports = merge(webpackBaseConfig, webpackVueDevConfig)
