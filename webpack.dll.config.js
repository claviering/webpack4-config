const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const dllPath = __dirname + '/src/assets/dll';

const resolve = {
  extensions: ['.js', '.jsx', '.vue', '.less', 'json'],
  modules: ['node_modules']
}

const plugins = [
  new ProgressBarPlugin(),  // 打包进度
  new CleanWebpackPlugin(['*.js'], {
    root: dllPath,
  }),
  new webpack.DllPlugin({
    name: '[name]_[hash:6]_dll',
    path: __dirname + '/src/assets/dll' + '/[name]-manifest.json'
  }),
]

const entry = {
  vue: ['vue', 'vue-router', 'vuex', 'element-ui'],
  react: ['react', 'react-dom', 'antd'],
  utils: ['axios', 'moment', 'lodash'],
}

const output = {
  filename: '[name]-[hash:6].dll.js',
  path: dllPath,
  library: '[name]_[hash:6]_dll'
}

module.exports = {
  mode: 'production',
  entry,
  resolve,
  output,
  plugins,
};