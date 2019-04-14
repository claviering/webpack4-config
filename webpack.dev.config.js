const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')

const autoAddDllRes = () => {
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
  return new AddAssetHtmlPlugin([{ // 往html中注入dll js
      // publicPath: './dist/dll/', // 注入到html文件中 src 的路径
      filepath: './src/dll/*.js', // dll.js 来源目录
      typeOfAsset: 'js' // options js、css; default js
  }]);
};

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
  // autoAddDllRes()
]

const webpackVueDevConfig = {
  module: webpackModule,
  plugins
}

module.exports = merge(webpackBaseConfig, webpackVueDevConfig)