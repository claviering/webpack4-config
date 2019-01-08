const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const output = () => ({
  path:  __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
})
const resolve = () => ({
  extensions: ['.js', '.jsx', '.vue', '.less'],
  alias: {
    antdcss: 'antd/dist/antd.min.css',
  },
})
const module = () => ({
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
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
      use: {
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }
    }
  ]
})
const plugins = () => [
  new HtmlWebpackPlugin({
    template: __dirname + './index.html',
    title: 'CRM',
    devMode: true
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[hash:6].css",
    chunkFilename: "[id].[hash:6].css"
  })
]

module.exports = {
  mode: 'production',
  entry: __dirname + './src/index.js',
  output,
  resolve,
  module,
  plugins,
};
