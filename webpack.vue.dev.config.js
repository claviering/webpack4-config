const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');
const smp = new SpeedMeasurePlugin();



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
      use: [
        { loader: 'vue-style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' },
        { loader: 'postcss-loader' },
      ]
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
  new DashboardPlugin(),
  new ProgressBarPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode: server,
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    openAnalyzer: true
  }),
  new HtmlWebpackPlugin({
    template: __dirname + './index.html',
    title: 'CRM',
    devMode: true
  }),
  new WebpackBuildNotifierPlugin({
    title: "My Project Webpack Build",
    logo: path.resolve("./img/favicon.png"),
    suppressSuccess: true
  })
]

const webpackConfig = smp.wrap({
  plugins
});

const devServer = () => ({
  hot: true,
  disableHostCheck: true,
  host: 'localhost',
  port: 8010,
  historyApiFallback: false,
  contentBase: __dirname + './src',
  proxy: {
    '/api': {
      target: 'http://localhost:3009',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
})
module.exports = {
  mode: 'development',
  entry: __dirname + './src/index.js',
  output,
  resolve,
  module,
  plugins,
  devServer
};
