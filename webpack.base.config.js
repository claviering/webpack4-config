const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const createHappyPlugin = (id, loaders) => new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === '1'
});

const autoAddDllRes = () => {
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
  return new AddAssetHtmlPlugin([{ // 往html中注入dll js
      publicPath: config.common.publicPath + "dll/",  // 注入到html中的路径
      outputPath: "dll", // 最终输出的目录
      filepath: resolve("src/assets/dll/*.js"),
      includeSourcemap: false,
      typeOfAsset: "js" // options js、css; default js
  }]);
};
const output = () => ({
  path:  __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
})
const resolve = () => ({
  extensions: ['.js', '.jsx', '.vue', '.less'],
  modules: [__dirname + '/node_modules'],
  mainFields: ['index'],
  alias: {
    antdcss: 'antd/dist/antd.min.css',
    vue$: "vue/dist/vue.common",
    '@': __dirname + '/src'
  },
})
const module = () => ({
  noParse: /jquery|lodash/,
  rules: [
    {
      test: /\.(js|jsx)$/,
      include: __dirname + '/src',
      exclude: /node_modules/,
      use: {
        loader: ['cache-loader', 'babel-loader?cacheDirectory=true'],
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    },
    {
      test: /\.less$/,
      include: __dirname + '/src',
      use: ['cache-loader', 'css-hot-loader', 'style-loader', 'css-loader', 'less-loader', 'postcss-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: ['cache-loader', 'url-loader'],
        options: {
          limit: 8192,
          name: 'img/[name].[hash:6].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|eot|ttf|svg|gif)$/,
      use: [{
        loader: ['cache-loader', 'url-loader'],
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
  new webpack.AutomaticPrefetchPlugin(),
  new ProgressBarPlugin(),  // 打包进度
  new webpack.HotModuleReplacementPlugin(),  // 热加载
  new WebpackBuildNotifierPlugin({  // 输出打包信息
    title: "My Project Webpack Build",
    logo: path.resolve("./img/favicon.png"),
    suppressSuccess: true
  }),
  new MiniCssExtractPlugin({  // css 打包压缩 只用在生产
    filename: "[name].[hash:6].css",
    chunkFilename: "[id].[hash:6].css"
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
  createHappyPlugin('happy-babel', [{  // 多线程打包 js
    loader: 'babel-loader',
    options: {
      babelrc: true,
      cacheDirectory: true // 启用缓存
    }
  }]),
  createHappyPlugin('style', [{  // 多线程打包 css
    loader: [ 'style-loader', 'css-loader', 'less-loader' ],
    options: {
      babelrc: true,
      cacheDirectory: true // 启用缓存
    }
  }]),
  new webpack.DllReferencePlugin({  // dll 打包
    manifest: require('./vue.dll.manifest.json')
  }),
  autoAddDllRes()
]
// 打包进度条
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

const externals = () => ({
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'vuex',
  'elemenct-ui': 'ELEMENT',
  'axios': 'axios',
  'fastclick': 'FastClick',
  'antd': 'antd',
  'react-redux': 'react-redux',
  'redux': 'redux',
  'moment': 'moment',
  'lodash': 'lodash',
})

const optimization = () => ({
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
})

module.exports = {
  mode: 'development',
  entry: __dirname + './src/index.js',
  output,
  resolve,
  module,
  externals,
  plugins,
  devServer,
  optimization
};
