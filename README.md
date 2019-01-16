# webpack 4

配置 demo

入口文件  
`__dirname + './src/index.js'`

输出文件夹  
`__dirname + '/dist'`

模板文件  
 `__dirname + './index.html',`


node v10

## 初始化

`chmod +x init.sh && ./init.sh`

## 第一次启动

`npm run dll`

需要手动添加 dll.js 到 index.html

```html
<script src="../src/assets/dll/react-153070.dll.js" charset="utf-8"></script>
<script src="../src/assets/dll/utils-153070.dll.js" charset="utf-8"></script>
```
## 配置

删除 .babelrc 使用 babel.config.js

项目根目录 babel.config.js
```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import']
};
```
项目根目录 postcss.config.js
```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

## 开发

### vuejs  repo
`npm run devVeu`

dll 插件
```js
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./src/assets/dll/vue-manifest.json'),
}),
```
index.html 引入 vue*.dll.js

`vue-style-loader` 不需要, 默认在 `vue-loader` 中使用

#### vue-loader v15

需要搭配插件使用

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackModule = {
  rules: [
    {
      test: /\.vue$/,
      use: ['cache-loader','vue-loader']
    }
  ]
}
const plugins = [
  new VueLoaderPlugin()
]
```

#### vux 移动组件库

webpack 4 不支持 vux 

### reactjs  repo
`npm run devReact`

dll 插件

```js
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./src/assets/dll/react-manifest.json'),
}),
```

index.html 引入 react*.dll.js

## 部署
vuejs  
`npm run buildVue`

reactjs  
`npm run buildReact`

## 分析

`npm run analyze`


## 全局注册
```js
// 全局注册, 不需要 import
new webpack.ProvidePlugin({
  _ : 'lodash',
  axios: 'axios'
})
```

## 参考

> [使用webpack4提升180%编译速度](https://juejin.im/entry/5c302140f265da611b587f99#%E5%BF%AB%E4%B8%8A%E8%BD%A6%EF%BC%8C%E5%8D%87%E7%BA%A7%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87)