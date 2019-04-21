import "@babel/polyfill" // 必需放最上面
import './index.less'
import Vue from 'vue'
import App from './App.vue'
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