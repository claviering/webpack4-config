const Body = () => import('@/components/Body')
const Main = () => import('@/components/Main')

export default [
  { path: '/', component: Main },
  { path: '/body', component: Body }
]