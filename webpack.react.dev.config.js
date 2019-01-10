const webpackBaseConfig = require('./webpack.base.config');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const merge = require('webpack-merge')

const webpackReactDevConfig = {
}

module.exports = smp.wrap(merge(webpackBaseConfig, webpackReactDevConfig))
