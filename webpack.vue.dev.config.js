const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackBaseConfig = require('./webpack.base.config');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const merge = require('webpack-merge')

const manifestVue = __dirname + '/src/assets/dll' + '/vue-manifest.json'  // dll 打包文件名
const htmlTemplete = __dirname + '/vue_src/index.html'

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
  new VueLoaderPlugin(),
  new webpack.DllReferencePlugin({  // dll 打包
    manifest: require(manifestVue)
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  // dll 注入到 html 文件
  new AddAssetHtmlPlugin(
    { filepath: path.resolve(__dirname, './src/assets/dll/vue*.dll.js') },
    { filepath: path.resolve(__dirname, './src/assets/dll/utils*.dll.js') },
  ),
]

const webpackVueDevConfig = {
  module: webpackModule,
  plugins,
  externals
}

module.exports = merge(webpackBaseConfig, webpackVueDevConfig)
