const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config');

const webpackReactDevConfig = {
}

module.exports = merge(webpackBaseConfig, webpackReactDevConfig)
