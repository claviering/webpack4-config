const Body = () => import('@/components/Body.vue')
const Main = () => import('@/components/Main.vue')

export default [
  { path: '/', component: Main },
  { path: '/body', component: Body }
]