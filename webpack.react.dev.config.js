const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')

const externals = () => ({
  'axios': 'axios',
  'antd': 'antd',
  'react-redux': 'react-redux',
  'redux': 'redux',
  'moment': 'moment',
  'lodash': 'lodash',
})

const webpackReactDevConfig = {
  externals
}

module.exports = merge(webpackBaseConfig, webpackReactDevConfig)
