const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dllPath = path.resolve(__dirname, '../src/assets/dll');

const plugins = () => [
  new CleanWebpackPlugin(['*.js'], {
    root: dllPath,
  }),
  new webpack.DllPlugin({
    name: '_dll_[name]',
    path: path.join(__dirname, './', '[name].dll.manifest.json')
  }),
]

const entry = () => ({
  vue: ['babel-polyfill', 'fastclick', 'vue', 'vue-router', 'vuex', 'axios', 'element-ui', 'antd']
})

const output = () => ({
  filename: '[name]-[hash].dll.js',
  path: dllPath,
  library: '_dll_[name]'
})

module.exports = {
  mode: 'production',
  entry,
  output,
  plugins
};