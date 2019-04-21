# webpack 4

node v10

Webpack 4 + Vuejs 2.x + TypeScript 配置 demo

- 入口文件 `/src/index.js'`
- 输出文件夹 `/dist`
- 模板文件 `/src/index.html'`

## DLL 打包

如果 src 目录没有 dll，需要先执行 `npm run dll`，一般只用运行一次，除非依赖的库版本有变化

## 开发

`npm run dev`

## 部署

`npm run build`

## 分析

`npm run analyze`

## Tree Shaking

项目 package.json 配置 `"sideEffects": false` 告诉 webpack 可以安全的 Shaking 没有副作用的代码，删除没有使用到的 exports 代码

> 副作用定义: 在 import 时候执行的代码具有副作用

使用数组排除副作用代码

```js
"sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
```

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

## TODO

CSS Tree Shaking 只能在外部引入的 *.less *.css 有效

- [ ] CSS Tree Shaking in *.vue