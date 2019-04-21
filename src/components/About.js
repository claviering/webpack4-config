import { Component } from "react"
import img from './1.jpeg'

class About extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div className="about"> 
        <h1>About</h1>
        <img src={img} />
      </div>
    );
  }
}
export default About;