import React from "react"
import { RouteComponentProps, Link, withRouter } from "react-router-dom"
import { Component } from "react";

export interface Props extends RouteComponentProps<any> { history: any; }

class Index extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  go = () => {
    this.props.history.push('/car')
  }
  render() {
    return (
      <div className="index">
      <h1 onClick={() => this.go()}>Go Car Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Index</Link>
            </li>
            <li>
              <Link to="/car">Redux Try</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default withRouter(Index);