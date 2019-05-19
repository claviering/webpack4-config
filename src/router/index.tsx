import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import Index from '@/components/Index'
import routesList from './router';

export interface Props { }

interface RouterItem {
  path: string,
  component: any
}
interface RouterList extends Array<RouterItem> {
  routes?: Array<object>
}

function RouteRoutes(route: RouterList) {
  if (!route || !route.length) {
    return
  }
  let Router = route.map((item: any) => {
    if (item.routes && item.routes.length) {
      let SubRouter = RouteRoutes(item.routes)
      return <Route path={item.path} key={item.path}>
      <Route path={item.path} key={item.path} component={item.component}/>
      {SubRouter}
      </Route>
    } else {
      return <Route path={item.path} key={item.path} component={item.component}/>
    }
    
  })
  return Router
}

class AppRouter extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Index/>
          {RouteRoutes(routesList)}
        </React.Suspense>
      </Router>
    );
  }
}
export default AppRouter;