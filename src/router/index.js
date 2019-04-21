import { HashRouter as Router, Route } from "react-router-dom"
import { Component, Suspense } from "react";
import Index from '@/components/Index'
import routesList from './router';


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
        <Suspense fallback={<div>Loading...</div>}>
          <Index/>
          {RouteRoutes(routesList)}
        </Suspense>
      </Router>
    );
  }
}
export default AppRouter;