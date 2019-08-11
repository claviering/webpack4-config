# webpack4 配置 demo

node v10

Webpack 4 + Vuejs 2.x 配置 demo

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

# webpack 4 + react.js 16.x + typescript

### vuejs  repo
`npm run devVeu`

# webpack 4 + angular 1.3.17 + Bootstrap

使用 angular-1.3.17 分支

<<<<<<< HEAD
`git checkout angular-1.3.17`
=======

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