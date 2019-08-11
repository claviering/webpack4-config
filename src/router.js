const Body = () => import('@/components/Body')
const Main = () => import('@/components/Main')
const A = () => import('@/components/A')
const B = () => import('@/components/B')

export default [{
    path: '/',
    component: Main
  },
  {
    path: '/body',
    component: Body,
    children: [
      {
        path: 'a',
        component: A,
      },
      {
        path: 'b',
        component: B,
      }
    ]
  }
]