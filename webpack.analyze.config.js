const DashboardPlugin = require('webpack-dashboard/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackReactProdConfig = require('./webpack.react.prod.config')
const merge = require('webpack-merge')

const plugins = [
  new DashboardPlugin(),  // 打包结果分析 控制台版
  new BundleAnalyzerPlugin({  // 打包结果分析 网页版
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    openAnalyzer: true
  })
]

const webpackAnalyzeConfig = {
  plugins
}

if (process.env.REPO === 'vue') {
  const webpackVueProdConfig = require('./webpack.vue.prod.config')
  module.exports = merge(webpackBaseConfig, webpackVueProdConfig, webpackAnalyzeConfig)
} else {
  module.exports = merge(webpackReactProdConfig, webpackAnalyzeConfig)
}

