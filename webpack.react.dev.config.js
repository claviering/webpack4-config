const webpackBaseConfig = require('./webpack.base.config');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const merge = require('webpack-merge')

const externals = {
  'axios': 'axios',
  'antd': 'antd',
  'react-redux': 'react-redux',
  'redux': 'redux',
  'moment': 'moment',
  'lodash': 'lodash',
}

const webpackReactDevConfig = {
  externals
}

module.exports = smp.wrap(merge(webpackBaseConfig, webpackReactDevConfig))
