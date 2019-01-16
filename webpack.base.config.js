const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devMode = process.env.NODE_ENV !== 'production'

// config
const repo = 'vue'
const contentBase = __dirname + '/vue_src'
const entryIndex = __dirname + '/vue_src/index.js'
const htmlTemplete = __dirname + '/vue_src/index.html'

const output = {
  path:  __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
}

const resolve = {
  extensions: ['.js', '.jsx', '.vue', '.less'],
  modules: ['node_modules'],
  alias: {
    '@': contentBase
  }
}

const webpackModule = {
  rules: [
    {
      test: /\.js[x]?$/,
      include: [contentBase],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        'cache-loader',
        {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
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
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`./src/assets/dll/${repo}-manifest.json`),
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`./src/assets/dll/utils-manifest.json`),
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new ProgressBarPlugin(),  // 打包进度
  new webpack.HotModuleReplacementPlugin(),  // 热加载
  new MiniCssExtractPlugin({  // css 抽取打包压缩 只用在生产
    filename: '[name].[hash:6].css',
  }),
  // 压缩css, 同时去除重复的样式，减少CSS打包后的体积
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
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
  }),
  // 全局注册, 不需要 import
  new webpack.ProvidePlugin({
    _ : 'lodash',
    axios: 'axios'
  })
]

const devServer = {
  compress: true,
  watchContentBase: true,
  progress: true,
  open: false,
  hot: true,
  disableHostCheck: true,
  host: 'localhost',
  port: 9020,
  historyApiFallback: false,
  proxy: {
    '/api': {
      target: 'http://localhost:6000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
}

const optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}

module.exports = {
  mode: 'development',
  entry: entryIndex,
  output,
  resolve,
  module: webpackModule,
  plugins,
  devServer,
  optimization
}
