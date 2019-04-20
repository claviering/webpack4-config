import "@babel/polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './router'
import App from './App'

Vue.use(ElementUI)
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