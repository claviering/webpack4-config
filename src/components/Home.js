import { Component } from "react";
import { Link } from "react-router-dom"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div className="home">
      <h1>Home</h1>
      <nav>
          <ul>
            <li>
              <Link to="/home/about">About</Link>
            </li>
            <li>
              <Link to="/home/user">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Home;