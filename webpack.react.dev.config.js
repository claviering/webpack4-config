const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const merge = require('webpack-merge')

const manifestReact = __dirname + '/src/assets/dll' + '/react-manifest.json'  // dll 打包文件名
const htmlTemplete = __dirname + '/react_src/index.html'


const plugins = [
  new webpack.DllReferencePlugin({  // dll 打包
    manifest: require(manifestReact)
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  // dll 注入到 html 文件
  new AddAssetHtmlPlugin(
    { filepath: path.resolve(__dirname, './src/assets/dll/react*.dll.js') },
    { filepath: path.resolve(__dirname, './src/assets/dll/utils*.dll.js') },
  ),
]

const webpackReactDevConfig = {
  plugins
}

module.exports = smp.wrap(merge(webpackBaseConfig, webpackReactDevConfig))
