import { Component } from "react";

class Car extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div className="car"><h1>Car</h1> </div>
    );
  }
}
export default Car;