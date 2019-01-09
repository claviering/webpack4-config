const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')

const webpackModule = {
  rules: [
    {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }
  ]
}

const plugins = [
  new VueLoaderPlugin()
]

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'vuex',
  'elemenct-ui': 'ELEMENT',
  'axios': 'axios',
  'antd': 'antd',
  'react-redux': 'react-redux',
  'redux': 'redux',
  'moment': 'moment',
  'lodash': 'lodash',
}

const webpackVueDevConfig = {
  module: webpackModule,
  plugins,
  externals
}

module.exports = merge(webpackBaseConfig, webpackVueDevConfig)
