import "@babel/polyfill" // 必需放最上面
import './index.less'
import Vue from 'vue'
import App from './App'
import routes from './router'
import element from './element'
import VueRouter from 'vue-router'

element(Vue)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})