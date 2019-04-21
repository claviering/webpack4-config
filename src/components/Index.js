import { Link, withRouter } from "react-router-dom"
import { Component } from "react";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  go = () => {
    this.props.history.push('/car')
  }
  render() {
    return (
      <div className="index">
      <h1 onClick={() => this.go()}>Index Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Index</Link>
            </li>
            <li>
              <Link to="/car">Car</Link>
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