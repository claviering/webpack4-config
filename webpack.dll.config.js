const os = require('os');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const vuxLoader = require('vux-loader')

const dllPath = __dirname + '/src/assets/dll'

const resolve = {
  extensions: ['.js', '.jsx', '.vue', '.less', 'json'],
  modules: ['node_modules']
}

const webpackModule = {
  rules: [
    {
      test: /\.vue$/,
      use: ['cache-loader','vue-loader']
    },
    {
      test: /\.js[x]?$/,
      use: ['cache-loader', 'babel-loader?cacheDirectory=true']
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name].[hash:6].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(woff|eot|ttf|svg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name].[hash:6].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }
  ]
}

const plugins = [
  new VueLoaderPlugin(),
  new ProgressBarPlugin(),  // 打包进度
  new CleanWebpackPlugin(['*.js', '*json'], {
    root: dllPath,
  }),
  new webpack.DllPlugin({
    name: '[name]_[hash:6]_dll',
    path: __dirname + '/src/assets/dll' + '/[name]-manifest.json'
  }),
  // 多线程打包
  new ParallelUglifyPlugin({
    cacheDir: '.cache/',
    uglifyJS: {
      output: {
          comments: false,
          beautify: false
      },
      compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
      }
    }
  }),
  // 多线程打包 js
  new HappyPack({
    id: 'js',
    loaders: [{ loader: 'babel-loader', options: { babelrc: true, cacheDirectory: true }}],
    threadPool: happyThreadPool,
    verbose: true
  }),
  // 多线程打包 css
  new HappyPack({
    id: 'css',
    loaders: [ 'style-loader', 'css-loader', 'less-loader' ],
    threadPool: happyThreadPool,
    verbose: true
  })
]

const entry = {
  vue: ['vue', 'vue-router', 'vuex', 'element-ui', 'vue-qrcode-component'],
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
  module: webpackModule,
  plugins,
};