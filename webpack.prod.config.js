const os = require('os');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

const devMode = process.env.NODE_ENV === 'development'

// config 默认编译 react 项目
const contentBase = __dirname + `/src`
const entryIndex = __dirname + `/src/index.js`
const htmlTemplete = __dirname + `/src/index.html`

const output = {
  path: __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
}

const resolve = {
  extensions: ['.js', '.jsx', '.vue', '.less'], // 忽略文件后缀
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
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
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
    },
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
}

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`./src/dll/vue-manifest.json`),
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new ProgressBarPlugin(), // 打包进度
  new MiniCssExtractPlugin({ // css 抽取打包压缩 只用在生产
    filename: '[name].[hash:6].css',
    chunkFilename: '[id].[hash:6].css'
  }),
  // 多线程打包 js
  new HappyPack({
    id: 'js',
    loaders: ['babel-loader'],
    threadPool: happyThreadPool,
    verbose: true
  }),
  // 多线程打包 css
  new HappyPack({
    id: 'css',
    loaders: ['style-loader', 'css-loader'],
    threadPool: happyThreadPool,
    verbose: true
  }),
  // 多线程打包 less
  new HappyPack({
    id: 'css',
    loaders: ['style-loader', 'css-loader', 'less-loader'],
    threadPool: happyThreadPool,
    verbose: true
  }),
  // 全局注册, 不需要 import
  new webpack.ProvidePlugin({
    _: 'lodash',
    axios: 'axios'
  })
]

const devServer = {
  compress: true,
  watchContentBase: true,
  progress: true,
  open: true,
  hot: true,
  disableHostCheck: true,
  host: 'localhost',
  port: 9030,
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
  mode: 'development', // 打包模式 development || production
  entry: entryIndex, // 入口文件
  output, // 打包输出文件目录
  resolve,
  module: webpackModule,
  plugins,
  devServer,
  optimization
}