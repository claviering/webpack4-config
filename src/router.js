const Body = () => import('./Body')
const Main = () => import('./Main')

export default [
  { path: '/', component: Main },
  { path: '/body', component: Body }
]