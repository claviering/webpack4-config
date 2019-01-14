const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config');

const autoAddDllRes = () => {
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
  return new AddAssetHtmlPlugin([{ // 往html中注入dll js
      // publicPath: './dist/dll/', // 注入到html文件中 src 的路径
      filepath: './src/assets/dll/*.js', // dll.js 来源目录
      typeOfAsset: 'js' // options js、css; default js
  }]);
};

const plugins = [
  autoAddDllRes()
]
const webpackReactDevConfig = {
  plugins
}

module.exports = merge(webpackBaseConfig, webpackReactDevConfig)
