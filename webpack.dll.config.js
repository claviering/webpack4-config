const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// config
const contentBase = __dirname + `/src`
const dllPath = __dirname + '/src/dll'

// 需要打包成 dll 的包, 按需引入的不需要
const entry = {
  react: ['react', 'react-redux', 'react-router-dom', 'redux'],
}

// dll 输出
const output = {
  path: dllPath,
  filename: '[name]-[hash:6].js',
  library: '[name]_[hash:6]'
}

const resolve = {
  extensions: ['.less', '.css', '.js', '.jsx', '.ts'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase // 文件目录缩写
  }
}

const webpackModule = {
  rules: [{
      test: /\.js[x]?$/,
      use: ['babel-loader?cacheDirectory=true']
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
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:6].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|eot|ttf|svg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:6].[ext]'
        }
      }]
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
  new ProgressBarPlugin(), // 打包进度
  new CleanWebpackPlugin(), // remove outpath.path directory
  new webpack.DllPlugin({ // dll 打包
    context: __dirname,
    name: '[name]_[hash:6]',
    path: dllPath + '/[name]-manifest.json'
  })
]

module.exports = {
  mode: 'production', // 打包模式 development || production
  entry, // 打包入口文件
  output, // 打包输出文件目录
  resolve,
  module: webpackModule,
  plugins,
}