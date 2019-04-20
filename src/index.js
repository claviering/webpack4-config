import "@babel/polyfill"
import Vue from 'vue'
// import VueRouter from 'vue-router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI)
// Vue.use(VueRouter)

import App from './App';
// import Body from './Body';
// import Main from './Main';
// const Body = () => import('./Body');
// const Main = () => import('./Main');



// const routes = [
//   { path: '/main', component: Main },
//   { path: '/body', component: Body }
// ]

// const router = new VueRouter({
//   mode: 'hash',
//   routes
// })

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})