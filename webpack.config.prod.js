const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const autoAddDllRes = () => {
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
  return new AddAssetHtmlPlugin([{ // 往html中注入dll js
      publicPath: './dll/', // 注入到html文件中 src 的路径
      outputPath: './dll/', // dll.js 文件输出的目录
      filepath: './src/dll/*.js', // dll.js 来源目录
      includeSourcemap: false,
      typeOfAsset: 'js' // options js、css; default js
  }]);
};

// config 默认编译 react 项目
const contentBase = __dirname + `/src`
const entryIndex = __dirname + `/src/index.ts`
const htmlTemplete = __dirname + `/src/index.html`

const output = {
  path: __dirname + '/dist',
  filename: 'bundle.[hash:6].js',
  chunkFilename: 'chunks/[name].[hash:6].js',
}

const resolve = {
  extensions: ['.less', '.css', '.js', '.jsx', '.ts', 'tsx'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase // 文件目录缩写
  }
}

const PATHS = {
  src: path.join(__dirname, 'src')
}

const webpackModule = {
  rules: [{
      test: /\.js[x]?$/,
      use: ['babel-loader?cacheDirectory=true']
    },
    {
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          appendTsxSuffixTo: [/\.vue$/],
        }
      }]
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
    },
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
}

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DllReferencePlugin({ // 注入 dll 文件到 html 模板中
    context: __dirname,
    manifest: require('./src/dll/vue-manifest.json'),
    extensions: [".js", ".jsx"]
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new ProgressBarPlugin(), // 打包进度
  new MiniCssExtractPlugin({ // css 抽取打包压缩 只用在生产
    filename: '[name].[hash:6].css',
    chunkFilename: '[id].[hash:6].css'
  }),
  // new PurgecssPlugin({
  //   paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
  // }),
  // 全局注册, 不需要 import
  new webpack.ProvidePlugin({
    axios: 'axios'
  }),
  new CleanWebpackPlugin(),
  autoAddDllRes() // 注入 dll 文件到 html 模板中
]


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
      },
      style: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      }
    }
  },
  // minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({
  //   uglifyOptions: {
  //     output: {
  //       comments: false // 删除注释
  //     }
  //   },
  //   cache: true, // 开启缓存
  //   parallel: true // 多线程压缩 默认值 os.cpus().length - 1
  // })] // 压缩 CSS
}

module.exports = {
  mode: 'production', // 打包模式 development || production
  entry: entryIndex, // 入口文件
  output, // 打包输出文件目录
  resolve,
  module: webpackModule,
  plugins,
  optimization
}