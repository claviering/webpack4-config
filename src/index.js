import "@babel/polyfill" // 必需放最上面
import './index.less'
import './assets/icomoon/style.css' // 引入字体图标
import Vue from 'vue'
import App from './App'
import stores from './store'
import routes from './router'
import element from './element'
import VueRouter from 'vue-router'

element(Vue)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
})

const store = stores(Vue)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})