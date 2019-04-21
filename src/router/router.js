import About from '@/components/About'
import Users from '@/components/Users'
import Home from '@/components/Home'
import Car from '@/components/Car'

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
