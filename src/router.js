import { HashRouter as Router, Route, Link } from "react-router-dom"
import { Component } from "react";
import Index from '@/components/Index'
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

function RouteRoutes(route) {
  if (!route || !route.length) {
    return
  }
  let Router = route.map(item => {
    if (item.routes && item.routes.length) {
      let SubRouter = RouteRoutes(item.routes)
      return <Route exact path={item.path} key={item.path}>
      <Route exact path={item.path} key={item.path} component={item.component}/>
      {SubRouter}
      </Route>
    } else {
      return <Route exact path={item.path} key={item.path} component={item.component}/>
    }
    
  })
  return Router
}

class AppRouter extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <Index/>
        {RouteRoutes(routesList)}
      </Router>
    );
  }
}
export default AppRouter;