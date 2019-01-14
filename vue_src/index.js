import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(VueRouter)

import App from './App';
const Body = () => import('./Body');
const MyMain = () => import('./MyMain');



const routes = [
  { path: '/', component: App },
  { path: '/main', component: MyMain },
  { path: '/body', component: Body }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})