# webpack 4

node v10

Webpack 4 + Vuejs 2.x 配置 demo

- 入口文件 `/src/index.js'`
- 输出文件夹 `/dist`
- 模板文件 `/src/index.html'`


## 第一次启动

`npm run dll`

## 开发

`npm run dev`

## 部署

`npm run build`

## 分析

`npm run analyze`

## 配置

项目根目录 babel.config.js
```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
}
```
项目根目录 postcss.config.js
```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

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


#### vux 移动组件库

webpack 4 不支持 vux 2.x 版本


## 全局注册
```js
// 全局注册, 不需要 import
new webpack.ProvidePlugin({
  _ : 'lodash',
  axios: 'axios'
})
```

## Webpack 打包流程图

![打包流程图](./webpack.png)

[图片来源](https://juejin.im/post/5c6b78cdf265da2da15db125)

## 参考

> [使用webpack4提升180%编译速度](https://juejin.im/entry/5c302140f265da611b587f99#%E5%BF%AB%E4%B8%8A%E8%BD%A6%EF%BC%8C%E5%8D%87%E7%BA%A7%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87)