#! /bin/sh
rm .babelrc
echo "{" >> .babelrc
echo "  \"presets\": [" >> .babelrc
echo "    \"@babel/preset-env\"," >> .babelrc
echo "    \"@babel/preset-react\"" >> .babelrc
echo "  ]" >> .babelrc
echo "}" >> .babelrc
source ~/.bashrc
nvm use 10
npm i -D webpack@4
npm i -D webpack-dev-server
npm i -D webpack-cli
npm i -D @babel/core
npm i -D @babel/preset-env
npm i -D babel-loader
npm i -D @babel/preset-react
npm i -D vue-loader
npm i -D url-loader
npm i -D html-loader
npm i -D less
npm i -D less-loader
npm i -D style-loader
npm i -D postcss-loader
npm i -D css-loader
npm i -D cache-loader
npm i -D @babel/plugin-transform-runtime
npm i -D @babel/runtime
npm s -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D webpack-bundle-analyzer
npm i -D speed-measure-webpack-plugin
npm i -D progress-bar-webpack-plugin
npm i -D webpack-build-notifier
npm i -D webpack-dashboard
npm i -D optimize-css-assets-webpack-plugin
npm i -D webpack-parallel-uglify-plugin
npm i -D happypack
npm i -D clean-webpack-plugin
npm i -D add-asset-html-webpack-plugin
npm i -D webpack-merge
npm i -D uglifyjs-webpack-plugin
npm i -D @babel/polyfill
npm i -D loglevel
npm i -S vue 
npm i -S vue-router
npm i -S vuex
npm i -S element-ui
npm i -S axios
npm i -S react
npm i -S react-dom
npm i -S redux
npm i -S react-redux
npm i -S antd