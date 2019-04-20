const Body = () => import('./Body')
const Main = () => import('./Main')

export default [
  { path: '/main', component: Main },
  { path: '/body', component: Body }
]