import * as React from "react"
const About = React.lazy(() => import('@/components/About'))
const Users = React.lazy(() => import('@/components/Users'))
const Home = React.lazy(() => import('@/components/Home'))
const Car = React.lazy(() => import('@/components/Car'))

const routesList = [
  {
    path: "/car",
    component: Car
  },
  {
    path: "/home",
    component: Home,
    routes: [
      {
        path: "/home/about",
        component: About
      },
      {
        path: "/home/user",
        component: Users
      }
    ]
  }
];

export default routesList
