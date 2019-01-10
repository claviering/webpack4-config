const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// config
const entryIndex = __dirname + '/react_src/index.js'
const contentBase = __dirname + '/react_src'  // 项目源代码目录
const htmlTemplete = __dirname + '/react_src/index.html'
const manifestReact = __dirname + '/src/assets/dll' + '/react-manifest.json'  // dll 打包文件名

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
  noParse: /jquery|lodash/,
  rules: [
    {
      test: /\.js[x]?$/,
      include: [path.resolve(__dirname, 'react_src')],
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
      test: /\.less$/,
      use: ['cache-loader', 'css-hot-loader', 'style-loader', 'css-loader', 'less-loader', 'postcss-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        'cache-loader',
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
        'cache-loader',
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
    manifest: require('./src/assets/dll/react-manifest.json'),
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  // dll 注入到 html 文件
  new HtmlWebpackIncludeAssetsPlugin({
    files: htmlTemplete,
    assets: ['./src/assets/dll/react-153070.dll.js'],
    append: true,
    hash: true
  }),
  // new AddAssetHtmlPlugin({ filepath: require.resolve(__dirname, './src/assets/dll/react-153070.dll.js') }),
  new ProgressBarPlugin(),  // 打包进度
  new webpack.AutomaticPrefetchPlugin(),
  new webpack.HotModuleReplacementPlugin(),  // 热加载
  new MiniCssExtractPlugin({  // css 打包压缩 只用在生产
    filename: '[name].[hash:6].css',
    chunkFilename: '[id].[hash:6].css'
  }),
  new OptimizeCssAssetsPlugin({  // css 打包加速
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  }),
  new ParallelUglifyPlugin({  // 多线程打包
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

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'vuex',
  'elemenct-ui': 'ELEMENT',
  'axios': 'axios',
  'fastclick': 'FastClick',
  'react': 'react',
  'redux': 'redux',
  'react-dom': 'react-dom',
  'react-redux': 'react-redux',
  'antd': 'antd',
  'moment': 'moment',
  'lodash': 'lodash',
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
  externals,
  plugins,
  devServer,
  optimization
}
