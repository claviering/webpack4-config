#! /bin/sh
source ~/.bashrc
nvm use 10
npm i -D webpack@4 webpack-dev-server webpack-cli
npm i -D @babel/core @babel/preset-env babel-loader @babel/preset-react
echo "{" >> .babelrc
echo "  \"presets\": [" >> .babelrc
echo "    \"@babel/preset-env\"," >> .babelrc
echo "    \"@babel/preset-react\"" >> .babelrc
echo "  ]" >> .babelrc
echo "}" >> .babelrc
npm i -D react-hot-loader
npm i -D vue-loader
npm i -D url-loader
npm i -D html-loader
npm i -D @babel/plugin-transform-runtime @babel/runtime
npm s -D html-webpack-plugin
npm i -D less less-loader stylus style-loader postcss-loader css-loader
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
npm i -D cache-loader
npm i -D webpack-merge
npm i -D uglifyjs-webpack-plugin
npm i -D @babel/polyfill
npm i -D loglevel
npm i -S vue vue-router vuex element-ui
npm i -S axios
npm i -S react react-dom redux react-redux antd